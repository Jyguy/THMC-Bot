'use strict';

/**
 * @param {import('../structures/client.js')} client
 * @param {import('discord.js').GuildMember} member
 */
exports.run = (client, member) => {
  if (member.user instanceof client.Discord.ClientUser) return;
  if (Date.now() - member.user.createdTimestamp < 1000 * 60 * 60 * 24) return member.kick('Account younger than 1 day');

  /** @type {import('discord.js').TextChannel} */
  const channel = member.guild.channels.find(c => c.type === 'text' && c.id === '516525421018480649');
  if (!channel) return;
  if (!channel.permissionsFor(member.guild.me).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'])) return;

  const embed = new client.Discord.MessageEmbed()
    .setTitle('A new member has joined!')
    .setDescription(`${member}, Welcome to **${client.escMD(member.guild.name)}**!`)
    .setColor(0x00FF00)
    .setTimestamp();

  return channel.send(embed);
};
