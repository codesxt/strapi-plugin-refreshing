'use strict';

const utils = require('@strapi/utils');
const _ = require('lodash');
const crypto = require('crypto');
const { ApplicationError, ValidationError } = utils.errors;

module.exports = ({ strapi }) => ({
  async request(ctx) {
    const provider = ctx.params.provider || 'local';
    const params = ctx.request.body;
    const { identifier, description } = params;
    const store = strapi.store({ type: 'plugin', name: 'users-permissions' });

    if (!identifier) {
      throw new ValidationError('Missing identifier');
    }

    // Check if the user exists.
    const user = await strapi
      .query('plugin::users-permissions.user')
      .findOne({
        where: {
          provider,
          $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
        },
      });

    if (!user) {
      throw new ValidationError('Invalid identifier or password');
    }

    if (!user.password) {
      throw new ValidationError('Invalid identifier or password');
    }

    const validPassword = await strapi
      .plugin('users-permissions')
      .service('user')
      .validatePassword(
        params.password,
        user.password
      );

    if (!validPassword) {
      throw new ValidationError('Invalid identifier or password');
    }

    const advancedSettings = await store.get({ key: 'advanced' });
    const requiresConfirmation = _.get(advancedSettings, 'email_confirmation');

    if (requiresConfirmation && user.confirmed !== true) {
      throw new ApplicationError('Your account email is not confirmed');
    }

    if (user.blocked === true) {
      throw new ApplicationError('Your account has been blocked by an administrator');
    }

    const refreshTokenData = {
      token: crypto.randomUUID(),
      description: (description) ? description : 'Refresh Token',
      userAgent: ctx.headers['user-agent'],
      ip: ctx.request.ip,
      expiresAt: null,
      lastActivity: new Date(),
      user: user.id
    }
    
    const refreshToken = await strapi
      .plugin('refreshing')
      .service('refresh-token')
      .createRefreshToken({
        data: refreshTokenData
      })

    return ctx.send({
      refresh_token: refreshToken.token,
    });
  },
  async refresh(ctx) {
    const { token } = ctx.request.body

    const refreshToken = await strapi
      .query('plugin::refreshing.refresh-token')
      .findOne({
        where: {
          token,
        },
        populate: { user: true },
      });
    
    if (!refreshToken) {
      throw new ApplicationError('Refresh Token not found');
    }

    if (refreshToken.expiresAt != null) {
      const now = new Date()
      const expiresAt = new Date(refreshToken.expiresAt)
      if (now.getTime() > expiresAt.getTime()) {
        throw new ApplicationError('Refresh Token is expired');
      }
    }

    const user = await strapi
      .entityService
      .findOne('plugin::users-permissions.user', refreshToken.user.id);

    if (!user) {
      throw new ValidationError('Invalid identifier or password');
    }

		const newJwt = await strapi
      .plugin('users-permissions')
      .service('jwt')
      .issue({
        id: user.id
      })

    await strapi
      .plugin('refreshing')
      .service('refresh-token')
      .updateRefreshToken(
        refreshToken.id,
        {
          data: {
            lastActivity: new Date()
          }
        }
      )

    ctx.body = { jwt: newJwt };
  },
  async revoke(ctx) {
    const params = ctx.request.body;
    const { token } = params;

    const refreshToken = await strapi
      .query('plugin::refreshing.refresh-token')
      .findOne({
        where: {
          token,
        }
      });

    if (refreshToken != null) {
      await strapi
        .plugin('refreshing')
        .service('refresh-token')
        .deleteRefreshToken(refreshToken.id)
    }    

    return ctx.send({}, 200);
  },
});