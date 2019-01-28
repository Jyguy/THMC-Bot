module.exports = async (Client, message) => {
  if (message.guild.id !== '407257018978664449') return;
  if (message.member.roles.has(message.guild.roles.find(r => r.name === 'No Levels').id)) return;
  const word = Math.random() < 0.5;
  const row = (await Client.sql.query('SELECT points, level FROM scores WHERE userid = $1', [message.author.id])).rows[0];
  let points;
  if (word) points = message.content.split(' ').length;
  else points = 1;

  if (!row) {
    points = 1;
    return Client.sql.query('INSERT INTO scores (points, level, userid) VALUES ($1, $2, $3)', [points, 0, message.author.id]);
  } else {
    const requiredPoints = row.level === 0 ? 50 : row.level * 50 + 50 * row.level;
    const curPoints = row.points + points;
    const curLevel = curPoints >= requiredPoints ? row.level + 1 : row.level;

    if (curLevel > row.level) {
      message.channel.send(`GG! ${message.author.tag}, You have leveled up to level ${curLevel}!`).then(m => m.delete({ timeout: 5000 }).catch(() => {}));
      Client.sql.query('UPDATE scores SET points = $1, level = $2 WHERE userid = $3', [curPoints, curLevel, message.author.id]);
    } else return Client.sql.query('UPDATE scores SET points = $1 WHERE userid = $2', [curPoints, message.author.id]);
  }
};
