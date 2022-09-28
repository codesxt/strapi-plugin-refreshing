'use strict';

/**
 *  router.
 */

module.exports = {
  type: 'content-api', // other type available: admin.
  routes: [
    {
      method: 'GET',
      path: '/users/me/sessions',
      handler: 'sessions.index',
      config: {
        policies: [],
        prefix: '',
      },
    },
    // {
    //   method: 'POST',
    //   path: '/auth/token',
    //   handler: 'auth.token',
    //   config: {
    //     policies: [],
    //     auth: false,
    //     prefix: '',
    //   },
    // },
    // {
    //   method: 'POST',
    //   path: '/auth/revoke',
    //   handler: 'auth.revoke',
    //   config: {
    //     policies: [],
    //     auth: false,
    //     prefix: '',
    //   },
    // },
  ],
};