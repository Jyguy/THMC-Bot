module.exports = async (Client, message, args) => {
  if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('You do not have the required permission `Manage Roles`!');
  if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I do not have the required permission `Manage Roles`!');

  const mRole = message.guild.roles.find(r => r.name === 'Muted');
  if (!mRole) return message.reply('I did not find a "Muted" role. Please make sure this role exists for this command to work.');
  if (mRole.position >= message.guild.me.roles.highest.position) return message.reply('The Muted role is higher or equal to my role! Please make sure it\'s **lower** than my role.');

  if (!args[1]) return message.reply('You have to provide a member for me to unmute!');
  const member = message.guild.members.get(args[1].replace(/[<>@!?]/g, ''));
  if (!member) return message.reply('The member you provided was invalid!');
  if (member === message.member) return message.reply('You cannot unmute yourself!');
  if (member.roles.highest.position >= message.member.roles.highest.position && message.member !== message.guild.owner) return message.reply('You cannot unmute a member that has a higher role than you!');
  if (!member.roles.has(mRole.id)) return message.reply('That member is not muted!');

  const reason = args[2] ? args.slice(2).join(' ') : 'None';

  member.roles.remove(mRole, reason);
  if (Client.mutes.includes(member.id)) Client.mutes.splice(Client.mutes.indexOf(member.id), 1);

  return message.channel.send(`Successfully unmuted ${member.user.tag}${reason === 'None' ? '.' : ` for ${reason}.`}`);
};

module.exports.help = {
  name: 'unmute',
  desc: 'Unmutes a member.',
  usage: 'unmute <Member> [Reason]'
};
