'use strict';

/**
 * @param {import('../structures/client.js')} client
 */
exports.run = (client) => {
  return client.bot.on('guildMemberAdd', member => {
    if (member.user instanceof client.Discord.ClientUser) return;

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
  });
};
