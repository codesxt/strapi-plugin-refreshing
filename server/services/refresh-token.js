'use strict';

module.exports = ({ strapi }) => ({
  async getAll(query){
    return await strapi
      .entityService
      .findMany("plugin::refreshing.refresh-token", {});
  },
  // // Get Refresh Tokens from a user
  // async getFromUser(query){
  //   return await strapi
  //     .entityService
  //     .findMany("plugin::refresh-token.refresh-token", {});
  // },
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