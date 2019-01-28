module.exports = async (Client, message, args) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You do not have the permission `Ban Members`!');
  if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('I do not have the permission `Ban Members`! Please make sure I have that permission for this command to work.');

  if (!args[1]) return message.reply('You have to provide a member for me to ban!');
  const member = message.guild.members.get(args[1].replace(/[<>@!?]/g, ''));
  if (!member) return message.reply('The member you provided was invalid!');
  if (member === message.member) return message.reply('You cannot ban yourself!');
  if (member === message.guild.owner) return message.reply('I cannot ban an owner!');
  if (member.roles.highest.position >= message.member.roles.highest.position && message.member !== message.guild.owner) return message.reply('You cannot ban a member that has a higher role than you!');
  if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply('I cannot ban that member, check my role position!');

  const reason = args[2] ? args.slice(2).join(' ') : 'None';
  member.ban({ reason: reason });
  return message.channel.send(`Successfully banned ${member.user.tag}${reason === 'None' ? '.' : ` for ${reason}.`}`);
};

module.exports.help = {
  name: 'ban',
  desc: 'Bans a member.',
  usage: 'ban <Member> [Reason]'
};
