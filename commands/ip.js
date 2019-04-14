'use strict';

/**
 * @param {import('../structures/client.js')} client
 * @param {import('discord.js').Message} message
 * @param {String[]} args
 */
exports.run = async (client, message, args) => {
  return message.channel.send(`The IP for the server is: **${client.config.ip}**`);
};

exports.help = {
  desc: 'Shows you the IP of the server.',
  usage: 'ip'
};
