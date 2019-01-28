module.exports = async (Client, message, args) => {
  if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You do not have the permission `Kick Members`!');
  if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('I do not have the permission `Kick Members`!');

  if (!args[1]) return message.reply('You have to provide a member for me to kick!');
  const member = message.guild.members.get(args[1].replace(/[<>@!?]/g, ''));
  if (!member) return message.reply('The member you provided was invalid!');
  if (member === message.member) return message.reply('You cannot kick yourself!');
  if (member === message.guild.owner) return message.reply('I cannot kick an owner!');
  if (member.roles.highest.position >= message.member.roles.highest.position && message.member !== message.guild.owner) return message.reply('You cannot kick a member that has a higher role than you!');
  if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply('I cannot kick that member, check my role position!');

  const reason = args[2] ? args.slice(2).join(' ') : 'None';
  member.kick(reason);
  return message.channel.send(`Successfully kicked ${member.user.tag}${reason === 'None' ? '.' : ` for ${reason}.`}`);
};

module.exports.help = {
  name: 'kick',
  desc: 'Kicks a member.',
  usage: 'kick <Member> [Reason]'
};
