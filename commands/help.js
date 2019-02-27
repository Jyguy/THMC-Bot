module.exports = async (Client, message, args) => {
  if (args[1]) {
    const cmd = args[1].toLowerCase();
    if (!Client.commandsList.includes(cmd)) return message.reply(`I did not find \`${cmd}\` in my command list!`);

    const embed = new Client.Discord.MessageEmbed()
      .setTitle(`${Client.config.prefix + cmd} Info`)
      .setColor(0x00FF00)
      .addField('Description', Client.commands[cmd].help.desc)
      .addField('Usage', Client.config.prefix + Client.commands[cmd].help.usage);

    if (!message.channel.permissionsFor(Client.bot.user).has('EMBED_LINKS')) return message.reply('I do not have the `Embed Links` permission on this channel, please make sure I have that permission for this command to work.');

    return message.channel.send(embed);
  } else {
    const embed = new Client.Discord.MessageEmbed()
      .setTitle('Command List')
      .setColor(0x00FF00)
      .setDescription(Client.commandsList.map(command => Client.config.prefix + command).join('\n'))
      .setFooter(`P.S. You can get more information about a command using ${Client.config.prefix}help [Command].`);

    return message.author.send(embed).then(() => message.channel.send(`${message.author.tag}, Check your DMs!`)).catch(() => {
      if (message.channel.permissionsFor(Client.bot.user).has('EMBED_LINKS')) return message.channel.send(embed);
      return message.reply('I do not have the `Embed Links` permission, and I cannot DM you. Please make sure that I have the permission or you have DMs enabled.');
    });
  }
};

module.exports.help = {
  name: 'help',
  desc: 'Shows a list of commands.',
  usage: 'help [Command]'
};
