'use strict';

module.exports = ({ strapi }) => ({
  // Retorna las sesiones del usuario autenticado
  async index(ctx) {
    // const entries = await strapi.entityService.findMany('plugin::refreshing.token');
    const entries = []
    
    ctx.body = entries;
  },
})