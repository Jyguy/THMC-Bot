module.exports = async (Client, message, args) => {
  const member = args[1] ? message.guild.members.get(args[1].replace(/[<>@!?]/g, '')) : message.member;
  if (!member) return message.reply('The member you provided was invalid!');

  const row = (await Client.sql.query('SELECT points,level FROM scores WHERE userid = $1', [member.id])).rows[0];
  const { rows } = await Client.sql.query('SELECT * FROM scores ORDER BY points DESC');
  const rank = rows.indexOf(rows.find(r => r.userid === member.id)) + 1;

  const embed = new Client.Discord.MessageEmbed()
    .setTitle(`${member === message.member ? 'Your' : `${member.user.tag}'s`} Leveling Info`)
    .addField('Level', row ? row.level : '0', true)
    .addField('Points', row ? `${row.points}/${row.level ? row.level * 50 + row.level * 50 : '50'}` : '0/50', true)
    .addField('Rank', `#${rank}`, true)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setColor(0x00FF00)
    .setTimestamp();

  return message.channel.send(embed);
};

module.exports.help = {
  name: 'level',
  desc: 'Displays the level of a user.',
  usage: 'level [User]'
};
