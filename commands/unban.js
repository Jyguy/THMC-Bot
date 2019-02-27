module.exports = async (Client, message, args) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You are missing a required permission `Ban Members`.');
  if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('I am missing a required permission `Ban Members`.');

  if (!args[1]) return message.reply('You have to provide an ID for me to unban!');
  
  const bans = await message.guild.fetchBans();
  if (!bans.has(args[1])) return message.reply('That ID is not banned!');
  
  const reason = args[2] ? args.slice(2).join(' ') : 'None';

  message.guild.members.unban(args[1], reason);
  return message.channel.send(`Successfully unbanned ${(await Client.bot.users.fetch(args[1])).tag}${reason === 'None' ? '.' : ` for ${reason}.`}`);
};

module.exports.help = {
  name: 'unban',
  desc: 'Unbans a member.',
  usage: 'unban <ID> [Reason]'
};
