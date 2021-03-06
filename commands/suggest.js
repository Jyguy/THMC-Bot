﻿'use strict';

/**
 * @param {import('../structures/client.js')} client
 * @param {import('discord.js').Message} message
 * @param {Array<String>} args
 */
exports.run = async (client, message, args) => {
  /** @type {import('discord.js').TextChannel} */
  const channel = message.guild.channels.find(c => c.name === '📩suggestions' && c.type === 'text');
  if (!channel) return message.reply(':x: I did not find the suggestions channel. Please report this to Spiget.');
  if (!channel.permissionsFor(message.guild.me).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'])) return message.reply(':x: I do not have enough permissions in the suggestions channel! Please make sure I have all the following permissions.\n\n`View Channel\nSend Messages\nEmbed Links`');

  if (!args[1]) return message.reply(':x: You have to provide a suggestion!');
  const suggestion = args.slice(1).join(' ');

  const embed = new client.Discord.MessageEmbed()
    .setDescription(suggestion)
    .setColor(0x00FF00)
    .setFooter(`Suggested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp();

  const msg = await channel.send(embed);
  await msg.react('✅');
  await msg.react('❌');
  return message.channel.send('Successfully sent a suggestion.');
};

exports.help = {
  desc: 'Suggests something to <#516527634696372225>.',
  usage: 'suggest <Suggestion>'
};
