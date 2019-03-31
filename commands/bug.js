'use strict';

/**
 * @param {import('../structures/client.js')} client
 * @param {import('discord.js').Message} message
 * @param {Array<String>} args
 */
exports.run = (client, message, args) => {
  /** @type {import('discord.js').TextChannel} */
  const channel = message.guild.channels.find(c => c.name === '🐛bugs' && c.type === 'text');
  if (!channel) return message.reply(':x: I could not find the bugs channel. Please report this to Spiget.');
  if (!channel.permissionsFor(client.bot.user).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'])) return message.reply(':x: I do not have enough permissions in the bugs channel! Please make sure I have all the following permissions.\n\n`View Channel\nSend Messages\nEmbed Links`');

  if (!args[1]) return message.reply(':x: You have to provide the bug to report!');
  const bug = args.slice(1).join(' ');

  const embed = new client.Discord.MessageEmbed()
    .setDescription(bug)
    .setColor(0x00FF00)
    .setFooter(`Reported by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp();
  channel.send(embed);

  return message.channel.send('Successfully reported a bug.');
};

exports.help = {
  desc: 'Reports a bug.',
  usage: 'bug <Bug>'
};
