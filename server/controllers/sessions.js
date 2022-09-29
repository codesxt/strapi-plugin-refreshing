'use strict';

module.exports = ({ strapi }) => ({
  // Returns sessions of authenticated user
  async index(ctx) {
    const id = ctx.state.user.id;
    const tokens = await strapi
      .plugin('refreshing')
      .service('refresh-token')
      .getFromUser(id)
    const entries = tokens
    
    ctx.body = entries;
  },
})