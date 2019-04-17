'use strict';

/**
 * @param {import('../structures/client.js')} Client
 */
exports.run = (Client) => {
  return Client.bot.on('error', err => console.error(err));
};
