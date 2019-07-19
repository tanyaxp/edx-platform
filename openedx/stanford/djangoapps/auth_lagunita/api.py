# -*- coding: utf-8 -*-
"""
Integrate with the Marketo API
"""
from __future__ import unicode_literals
import json
import logging

import requests


log = logging.getLogger('auth_lagunita')


class MarketoApi(object):
    """
    Create a client to access the API
    """

    def __init__(
            self,
            base_url,
            access_token=None,
            client_id=None,
            client_secret=None,
    ):
        self.access_token = access_token or ''
        self.base_url = base_url
        self.client_id = client_id
        self.client_secret = client_secret

    def refresh_access_token(self):
        """
        Grab a new auth_token from the API

        They expire after some period of time.
        We could examine the response and determine the session life...
        Instead, we just request a new one whenever the API tells us ours
        has expired.
        """
        # pylint: disable=line-too-long
        url = "{base_url}/identity/oauth/token?grant_type=client_credentials&client_id={client_id}&client_secret={client_secret}".format(
            base_url=self.base_url,
            client_id=self.client_id,
            client_secret=self.client_secret,
        )
        # pylint: enable=line-too-long
        log.debug("url: %s", url)
        access_token = None
        try:
            response = requests.get(url)
        except requests.exceptions.RequestException as exception:
            error = "requests.exceptions: {0}".format(exception)
            log.error(error)
        else:
            log.debug(response)
            # pylint: disable=no-member
            if response.status_code == requests.codes.ok:
                try:
                    data = response.json() or {}
                except ValueError as error:
                    log.error("%s", error)
                    data = {}
                log.debug(data)
                access_token = data.get('access_token', access_token)
            # pylint: enable=no-member
        log.info("Refreshed access_token: %s", access_token)
        self.access_token = access_token
        return access_token

    def lookup_lead(self, email):
        """
        Lookup a lead ID, based on email address
        """
        log.info("Lead lookup attempted: %s", email)
        endpoint = "leads.json?filterType={filterType}&filterValues={filterValues}".format(
            filterType='email',
            filterValues=email,
        )
        result, error = self._request(endpoint, method='get')
        if error:
            log.error(error)
            lead_id = None
            log.info("Lead lookup failed: %s", email)
        else:
            lead_id = result['id']
            log.info("Lead lookup succeeded: %s, lead_id=%s", email, lead_id)
        return lead_id

    def subscribe(self, user, list_id):
        """
        Subscribe a user to a list
        """
        subscription_id = None
        log.info("Subscription attempted for user=%s", user.email)
        lead_id = self.upsert_lead(user)
        if lead_id:
            data = {
                'input': [
                    {
                        'id': lead_id,
                    },
                ],
            }
            endpoint = "lists/{list_id}/leads.json".format(
                list_id=list_id,
            )
            log.debug("lead_id=%s", lead_id)
            result, error = self._request(endpoint, data)
            log.debug(result)
            if error:
                log.error(error)
                subscription_id = None
            else:
                subscription_id = result['id']
        if subscription_id:
            log.info("Subscription succeeded for user=%s, subscription_id=%s", user.email, subscription_id)
        else:
            log.error("Subscription failed for user=%s", user.email)
        return subscription_id

    def _create_lead(self, user):
        """
        Create a new lead entry, update if already exists
        """
        log.info("Lead creation attempted: %s", user.email)
        data = {
            'action': 'createOrUpdate',
            'reason': 'Request opt-in via Lagunita signup',
            'source': 'https://lagunita.stanford.edu',
            'lookupField': 'email',
            'input': [
                {
                    'email': user.email,
                    'firstName': user.first_name,
                    'lastName': user.last_name,
                },
            ]
        }
        result, error = self._request('leads.json', data)
        return (result, error)

    def upsert_lead(self, user):
        """
        Create and/or get a user lead
        """
        result, error = self._create_lead(user)
        if error:
            log.error("Lead creation failed: %s, %s", user.email, error)
            lead_id = None
        else:
            lead_id = result['id']
            if result.get('status') == 'updated':
                log.info("Lead creation updated: %s, %s", user.email, lead_id)
            else:
                log.info("Lead creation succeeded: %s, %s", user.email, lead_id)
        return lead_id

    def _request(self, endpoint, data=None, method='post', is_recursive=False):
        """
        Help make HTTP requests
        """
        if not self.access_token:
            self.refresh_access_token()
        request_method = getattr(requests, method)
        data = data or {}
        url = "{base_url}/rest/v1/{endpoint}".format(
            base_url=self.base_url,
            endpoint=endpoint,
        )
        headers = {
            'Authorization': 'Bearer ' + self.access_token,
            'Content-Type': 'application/json',
        }
        log.debug("url: %s", url)
        log.debug("headers: %s", headers)
        log.debug("data: %s", data)
        result = None
        try:
            response = request_method(
                url=url,
                headers=headers,
                data=json.dumps(data),
            )
        except requests.exceptions.RequestException as exception:
            error = "requests.exceptions: {0}".format(exception)
        else:
            log.debug("response: %s", response)
            log.debug("response.content: %s", response.content)
            result, error = self._parse(response)
            if error == 'token' and not is_recursive:
                access_token = self.refresh_access_token()
                log.error("Refreshed access token: %s", access_token)
                result, error = self._request(endpoint, data, method, is_recursive=True)
        return (result, error)

    def _parse(self, response):
        """
        Handle common parsing for HTTP responses
        """
        result = None
        error = None
        # pylint: disable=no-member
        if not response:
            error = 'API operation failed; no response received'
        elif response.status_code != requests.codes.ok:
            errors = "{code}: {message}".format(
                code=response.status_code,
                message=response.content,
            )
            error = "API operation failed; {errors}".format(
                errors=errors,
            )
        else:
            token_error_codes = [
                601,  # Access token invalid
                602,  # Access token expired
            ]
            try:
                data = response.json()
            except ValueError as exception:
                log.error("%s", exception)
                data = {}
                error = str(exception)
            else:
                if not data.get('success'):
                    log.debug("data: %s", data)
                    errors = data.get('errors', [])
                    if any(
                            error.get('code') in token_error_codes
                            for error in errors
                    ):
                        error = 'token'
                    else:
                        errors = '; '.join([
                            "{code}: {message}".format(
                                code=error.get('code', '000'),
                                message=error.get('message', '?'),
                            )
                            for error in errors
                        ])
                        error = "API operation failed; {errors}".format(
                            errors=errors,
                        )
                else:
                    result = data['result']
                    if len(result):
                        result = result[0]
                        if result.get('status') == 'skipped':
                            result = None
                            error = 'skipped'
                    else:
                        result = None
                        error = 'No matches found'
        # enable: disable=no-member
        return (result, error)
