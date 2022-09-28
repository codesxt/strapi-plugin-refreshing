'use strict';

module.exports = ({ strapi }) => ({
  async getAll(query){
    return await strapi
      .entityService
      .findMany("plugin::refreshing.refresh-token", {});
  },
  // Get Refresh Tokens from a user
  async getFromUser(id){
    // TODO: Sort by lastActivity
    return await strapi
      .entityService
      .findMany("plugin::refreshing.refresh-token", {
        filters: {
          user: id
        },
        sort: {
          lastActivity: 'desc'
        }
      });
  },
  async deleteRefreshToken(id) {
    return await strapi
      .entityService
      .delete("plugin::refreshing.refresh-token", id);
  },
  async createRefreshToken(data) {
    return await strapi
      .entityService
      .create("plugin::refreshing.refresh-token", data);
  },
  async updateRefreshToken(id, data) {
    return await strapi
      .entityService
      .update("plugin::refreshing.refresh-token", id, data);
  },
})