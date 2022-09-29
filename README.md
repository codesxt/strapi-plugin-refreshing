# Strapi Refreshing

<p align="left">
  <a href="https://www.npmjs.org/package/strapi-plugin-refreshing">
    <img src="https://img.shields.io/npm/v/strapi-plugin-refreshing.svg?style=plastic" alt="NPM Version" /></a>
  <a href="https://www.npmjs.org/package/strapi-plugin-refreshing">
    <img src="https://img.shields.io/npm/dt/strapi-plugin-refreshing.svg?style=plastic" alt="Monthly download on NPM" /></a>
  <a href="#-license">
    <img src="https://img.shields.io/github/license/codesxt/strapi-plugin-refreshing?style=plastic" alt="License" /></a>
  <a href="https://twitter.com/intent/follow?screen_name=codesxt" target="_blank" rel="noopener noreferrer">
    <img alt="Follow Bruno Faúndez" src="https://img.shields.io/twitter/follow/codesxt?color=%231DA1F2&label=follow%20me&style=plastic"></a>
  <a href="#">
    <img alt="Repo stars" src="https://img.shields.io/github/stars/codesxt/strapi-plugin-refreshing?color=white&label=Github&style=plastic"></a>
</p>

A basic implementation of a Refresh Tokens system.

## Introduction

JWT (JSON Web Tokens) have proven to be useful in the design of modern web apps. They allow a user or client to access a service by attaching this token to their requests. The service then evaluates if the token is valid and decide if access should be granted to a specific endpoint of the service.

One of the characteristics of JWT is that they have an expiration date. When the JWT expires, the user needs to request a new JWT to keep accessing the service. This works well in web applications since the user usually keeps their credentials stored in the browser and can easily log in again and get a new JWT in the process. But in mobile apps, this is not a common pattern. You don't usually log out and log in again after a time has passed in your app. To achieve this, another type of token is usually issued to help your app get a new JWT automatically after one has expired. These tokens are called Refresh Tokens.

## Refresh Tokens

TODO: Write about Refresh Tokens

## Usage

TODO: Add installation instructions

## Endpoints

This plugin adds the following endpoints to your Strapi application.

Since I didn't want to overwrite the Strapi login flow, the Refresh Token should be obtained after you log-in on register in the app by calling a specific endpoint for this with your credentials. Then you have to store the Refresh Token together with you user data and access token for future use.

| path | method | params | description |
|------|--------|--------|-------------|
| /api/auth/token/request | POST | Object containing fields "identifier" and "password" | Requests a Refresh Token with the same credentials used in the login process |
| /api/auth/token | POST | Object with field "token" containing the Refresh Token | Requests a new JWT using the Refresh Token |
| /api/auth/revoke | POST | Object with field "token" containing the Refresh Token | Destroys Refresh Token so it can't be used in the future. This endpoint should be called on logout or when user wants to close their "session" in another device |
| /users/me/sessions | GET | Empty | An authenticated request for the user to list their "sessions" which are basically their Refresh Tokens previously created |

## Endpoint Configurations

To enable the corresponding endpoints do the following:

* Go to User & Permissions plugin settings
* Select Roles
* Select Authenticated Role
* In Refreshing, enable sessions->index

## Schemas

The following schema has been created to store Refresh Tokens and related data as a Content Type.

| field | type | description |
|------|--------|--------|
| token | string | An UUID v4 generated as Refresh Token |
| description | string | Text description for the token |
| userAgent | string | User Agent string of the request that created the Refresh Token |
| ip | string | IP address of the request that created the Refresh Token |
| expiresAt | datetime | Datetime of the Refresh Token Expiration. Null if token doesn't expire. |
| lastActivity | datetime | Last datetime when token was used to request a JWT. |
| user | id | ID of the user who owns the Refresh Token |

## Roadmap

- [X] Create endpoint for the user to see its "sessions"
- [ ] Create a better admin screen for refresh tokens
- [ ] Create plugin settings screen

## Links

- [NPM package](https://www.npmjs.com/package/strapi-plugin-refreshing)
- [GitHub repository](https://github.com/codesxt/strapi-plugin-refreshing)