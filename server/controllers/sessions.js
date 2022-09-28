'use strict';

module.exports = ({ strapi }) => ({
  // Returns sessions of authenticated user
  async index(ctx) {
    console.log('Requesting user sessions')
    const id = 1;
    const tokens = await strapi
      .plugin('refreshing')
      .service('refresh-token')
      .getFromUser(id)
    const entries = tokens
    
    ctx.body = entries;
  },
})