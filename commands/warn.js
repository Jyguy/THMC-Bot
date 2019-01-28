module.exports = async (Client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the required permission `Manage Server`!');

  if (!args[1]) return message.reply('You have to provide a member for me to warn!');
  const member = message.guild.members.get(args[1].replace(/[<>@!?]/g, ''));
  if (!member) return message.reply('The member you provided was invalid!');
  if (member === message.member) return message.reply('You cannot warn yourself!');
  if (member.user.bot) return message.reply('You cannot warn a bot!');
  if (member === message.guild.owner) return message.reply('You cannot warn an owner!');
  if (member.roles.highest.position >= message.member.roles.highest.position && message.guild.owner !== message.member) return message.reply('Your role position is not high enough to warn that member!');

  const reason = args[2] ? args.slice(2).join(' ') : 'None';
  if (reason.includes('\n')) return message.reply('The reason may not include a line break.');

  Client.sql.query('INSERT INTO warnings (userid, reason) VALUES ($1, $2)', [member.id, reason]);
  return message.channel.send(`Successfully warned ${member.user.tag}.`);
};

module.exports.help = {
  name: 'warn',
  desc: 'Warns a member.',
  usage: 'warn <Member> [Reason]'
};
