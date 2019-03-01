'use strict';

/**
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').Message} message
 * @param {Array<String>} args
 */
exports.run = (client, message, args) => {
  return message.channel.send(`Pong! :heartbeat: \`${Math.round(client.ws.ping)}ms\``).then(m => m.edit(`${m.content} :stopwatch: \`${Math.round(Date.now() - m.createdTimestamp)}ms\``));
};

exports.help = {
  desc: 'Outputs the ping of the bot.',
  usage: 'ping'
};
