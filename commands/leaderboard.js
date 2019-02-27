module.exports = async (Client, message, args) => {
  if (!message.channel.permissionsFor(message.client.user).has('EMBED_LINKS')) return message.reply('I do not have the required permission `Embed Links`!');

  let { rows: levels } = (await Client.sql.query('SELECT * FROM scores ORDER BY points DESC'));
  levels = levels.slice(0, 10);

  const members = levels.map(r => message.guild.members.get(r.userid)).filter(m => m);
  const lb = levels.filter(r => message.guild.members.has(r.userid)).map((r, i) => `${i ? i === 1 ? ':second_place:' : i === 2 ? ':third_place:' : ':ribbon:' : ':first_place:'} ${members[i].user.tag} - ${r.level} Levels | ${r.points} Points`);

  const embed = new Client.Discord.MessageEmbed()
    .setTitle('Leveling Leaderboard')
    .setDescription(lb.join('\n'))
    .setColor(0x00FF00)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

  return message.channel.send(embed);
};

module.exports.help = {
  name: 'leaderboard',
  desc: 'Displays the leaderboard for leveling.',
  usage: 'leaderboard'
};
