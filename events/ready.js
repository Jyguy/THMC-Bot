'use strict';

/**
 * @param {import('discord.js').Client} client
 */
exports.run = (client) => {
  return client.on('ready', () => {
    console.log(`Successfully signed in as ${client.user.tag}.`);
    client.user.setActivity(`${client.guilds.first().members.filter(m => !m.user.bot).size} Hunters | Also watching for ${client.config.prefix}help`);
  });
};
