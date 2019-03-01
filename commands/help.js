'use strict';

/**
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').Message} message
 * @param {String[]} args
 */
exports.run = (client, message, args) => {
  if (!args[1]) {
    const commands = client.commands.keyArray().map(cmd => `${client.config.prefix}**${cmd}**`);
    const embed = new client.Discord.MessageEmbed()
      .setTitle('Commands List')
      .setDescription(commands.join('\n'))
      .setColor(0x00FF00);

    return message.author.send(embed)
      .then(() => message.channel.send(`${message.author.tag}, Check your DMs!`))
      .catch(() => {
        if (message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return message.channel.send(embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL()));

        const str = `**Commands List**\n\n${commands.join('\n')}`;
        return message.channel.send(str);
      });
  } else {
    if (!message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return message.reply(':x: I do not have enough permissions in this channel! Please make sure I have all the following permissions.\n\n`Embed Links`');
    const cmd = args[1].toLowerCase();
    if (!client.commands.keyArray().includes(cmd)) return message.reply(`I did not find \`${client.escMD(cmd)}\` in the commands list.`);

    const info = client.commands.get(cmd).help;
    const embed = new client.Discord.MessageEmbed()
      .setTitle(`${client.config.prefix + cmd} Info`)
      .setDescription(info.desc)
      .addField('Usage', client.config.prefix + info.usage, true)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .setColor(0x00FF00);
    return message.channel.send(embed);
  }
};

exports.help = {
  desc: 'Shows the help menu.',
  usage: 'help [Command]'
};
