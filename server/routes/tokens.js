'use strict';

/**
 *  router.
 */

module.exports = {
  type: 'content-api',
  routes: [
    {
      method: 'POST',
      path: '/auth/token/request',
      handler: 'tokens.request',
      config: {
        policies: [],
        auth: false,
        prefix: ''
      },
    },
    {
      method: 'POST',
      path: '/auth/token',
      handler: 'tokens.refresh',
      config: {
        policies: [],
        auth: false,
        prefix: '',
      },
    },
    {
      method: 'POST',
      path: '/auth/revoke',
      handler: 'tokens.revoke',
      config: {
        policies: [],
        auth: false,
        prefix: '',
      },
    },
  ],
};