'use strict';

/**
 * @param {import('../structures/client.js')} client
 * @param {import('discord.js').Message} message
 * @param {Array<String>} args
 */
exports.run = async (client, message, args) => {
  const msg = await message.channel.send(`Pong! :heartbeat: \`${Math.round(client.bot.ws.ping)}ms\``);
  return msg.edit(`${msg.content} :stopwatch: \`${Date.now() - msg.createdTimestamp}ms\``);
};

exports.help = {
  desc: 'Outputs the ping of the bot.',
  usage: 'ping'
};
