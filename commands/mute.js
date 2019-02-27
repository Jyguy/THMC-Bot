module.exports = async (Client, message, args) => {
  if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('You do not have the required permission `Manage Roles`!');
  if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply('I do not have the required permission `Manage Roles`!');

  const mRole = message.guild.roles.find(r => r.name === 'Muted');
  if (!mRole) return message.reply('I did not find a `Muted` role. Please make sure this role exists.');
  if (mRole.position >= message.guild.me.roles.highest.position) return message.reply('The Muted role is higher or equal to my role! Please make it lower than mine.');

  if (!args[1]) return message.reply('You have to provide a member for me to mute!');
  const member = message.guild.members.get(args[1].replace(/[<>@!?]/g, ''));
  if (!member) return message.reply('The member you provided was invalid!');
  if (member === message.member) return message.reply('You cannot mute yourself!');
  if (member === message.guild.owner) return message.reply('I cannot mute an owner!');
  if (member.roles.highest.position >= message.member.roles.highest.position && message.member !== message.guild.owner) return message.reply('You cannot mute a member that has a higher role than you!');
  if (member.roles.has(mRole.id)) return message.reply('That member is already muted!');

  if (!args[2]) return message.reply('You have to provide the amount of time for me to mute that member for!\n\n`Eg. 4h = Four Hours, 3m = Three Minutes, etc`');
  const type = args[2].toLowerCase()[args[2].length - 1];
  if (!['d', 'h', 'm', 's'].includes(type)) return message.reply('The type of time you provided was not valid! It can be `d` (for days), `h` (for hours), `m` (for minutes), and `s` (for seconds).');
  const time = args[2].slice(0, -1);
  if (isNaN(time)) return message.reply('The time you provided was not a number!');
  if (time < 1) return message.reply('The time cannot be zero or less!');
  if (time.includes('.')) return message.reply('The time cannot be a decimal!');
  if ((type === 'd' && time > 7) || (type === 'h' && time > 12) || (type === 'm' && time > 720) || (type === 's' && time > 604800)) return message.reply('The maximum amount of time to mute for is a week (or 168 hours)!');
  let ms;
  if (type === 'd') ms = time * 24 * 60 * 60 * 1000;
  else if (type === 'h') ms = time * 60 * 60 * 1000;
  else if (type === 'm') ms = time * 60 * 1000;
  else if (type === 's') ms = time * 1000;

  const reason = args[3] ? args.slice(3).join(' ') : 'None';

  member.roles.add(mRole, reason);
  Client.mutes.push(member.id);

  setTimeout(() => {
    if (member.roles.has(mRole.id) && message.guild.members.get(member.id)) member.roles.remove(mRole, 'Time Expired');
    if (Client.mutes.includes(member.id)) Client.mutes.splice(Client.mutes.indexOf(member.id), 1);
  }, ms);

  return message.channel.send(`Successfully muted ${member.user.tag} for ${time} ${type === 'h' ? 'hours' : type === 'd' ? 'days' : type === 'm' ? 'minutes' : 'seconds'}.`);
};

module.exports.help = {
  name: 'mute',
  desc: 'Mutes a member for an amount of time.',
  usage: 'mute <Member> <Amount of Time (eg 2h = 2 hours, 2m = 2 minutes etc)> [Reason]'
};
