module.exports = async (Client, message, args) => {
  if (!args[1]) return message.reply('You have to supply a suggestion to suggest!');

  const channel = message.guild.channels.get('516527634696372225');
  if (!channel) return message.reply('The suggestions channel does not exist! If it does, please ask ᴊʏɢᴜʏ#9535 to fix this problem.');
  if (!channel.permissionsFor(Client.bot.user).has(['SEND_MESSAGES', 'EMBED_LINKS'])) return message.reply('I need **both** the following permissions on that channel: `Send Messages` and `Embed Links`.');

  const suggestion = args.slice(1).join(' ');
  const embed = new Client.Discord.MessageEmbed()
    .setTitle(`New Suggestion from **${Client.escMD(message.member.displayName)}**`)
    .setDescription(suggestion)
    .setColor(0x00FF00)
    .setFooter(`Command: ${Client.config.prefix}suggest <Suggestion>`)
    .setTimestamp();

  const msg = await channel.send(embed);
  await msg.react('✅');
  await msg.react('❌');

  return message.react('✅');
};

module.exports.help = {
  name: 'suggest',
  desc: 'Suggests something to <#516527634696372225>.',
  usage: 'suggest <Suggestion>'
};
