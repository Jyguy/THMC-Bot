'use strict';

/**
 * @param {import('../structures/client.js')} client
 */
exports.run = (client) => {
  return client.bot.on('ready', () => {
    console.log(`Successfully signed in as ${client.bot.user.tag}.`);
    client.bot.user.setActivity(`${client.bot.guilds.first().members.filter(m => !m.user.bot).size} Hunters | Also watching for ${client.config.prefix}help`);
  });
};
