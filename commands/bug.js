module.exports = async (Client, message, args) => {
  if (!args[1]) return message.reply('You have to provide information about which bug you are trying to report!');

  const bug = args.slice(1).join(' ');

  const channel = message.guild.channels.get('516621463974051845');
  if (!channel) return message.reply('The bug reports channel does not exist. Either the ID is incorrect, or it was deleted. Please tell Spiget to fix this.');
  if (!channel.permissionsFor(Client.bot.user).has(['EMBED_LINKS', 'SEND_MESSAGES', 'VIEW_CHANNEL'])) return message.reply('I cannot send an embed to the bug reports channel! Please tell a staff member to set correct permissions for me.\n\n`Embed Links`\n`Send Messages`\n`View Channel`');

  const embed = new Client.Discord.MessageEmbed()
    .setTitle('NEW BUG')
    .setDescription(bug)
    .setColor(0xFF0000)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

  channel.send(embed);
  return message.react('✅');
};

module.exports.help = {
  name: 'bug',
  desc: 'Reports a bug to us.',
  usage: 'bug <Bug Info>'
};
