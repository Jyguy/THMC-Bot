module.exports = async (Client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the required permission `Manage Server`!');

  if (!args[1]) return message.reply('You have to provide a member for me to unwarn!');
  const member = message.guild.members.get(args[1].replace(/[<>@!?]/g, ''));
  if (!member) return message.reply('The member you provided was invalid!');
  if (member === message.member) return message.reply('You cannot unwarn yourself!');
  if (member.user.bot) return message.reply('You cannot unwarn a bot!');
  if (member === message.guild.owner) return message.reply('You cannot unwarn an owner!');
  if (member.roles.highest.position >= message.member.roles.highest.position && message.guild.owner !== message.member) return message.reply('Your role position is not high enough to unwarn that member!');

  if (!args[2]) return message.reply('You have to provide a warning ID for me to unwarn!');
  const warnID = args[2];
  if (isNaN(warnID)) return message.reply('The warning ID you provide needs to be a number!');
  const { rows } = await Client.sql.query('SELECT * FROM warnings WHERE userid = $1', [member.id]);
  if (!rows.some(r => r.warnid == warnID)) return message.reply(`The warning ID you provided was invalid! Please check it using \`${Client.config.prefix}warnings\`.`);

  Client.sql.query('DELETE FROM warnings WHERE userid = $1 AND warnid = $2', [member.id, warnID]);
  return message.channel.send(`Successfully unwarned ${member.user.tag}.`);
};

module.exports.help = {
  name: 'unwarn',
  desc: `Removes a warning for a user. Warning IDs are obtainable by using \`${process.env.prefix}warnings\`.`,
  usage: 'unwarn <Member> <Warn ID>'
};
