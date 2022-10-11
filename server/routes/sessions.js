'use strict';

/**
 *  router.
 */

module.exports = {
  type: 'content-api',
  routes: [
    {
      method: 'GET',
      path: '/users/me/sessions',
      handler: 'sessions.index',
      config: {
        policies: [],
        prefix: ''
      },
    },
  ],
};