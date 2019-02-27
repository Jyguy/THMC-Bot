function backChannels (message, sGuild) {
  sGuild.channels.forEach(c => c.delete());

  message.guild.channels.filter(c => c.type === 'category').forEach(c => sGuild.channels.create(c.name, { type: 'category' }));
  message.guild.channels.filter(c => c.type !== 'category').forEach(c => sGuild.channels.create(c.name, { type: c.type, parent: c.parent }));

  return message.channel.send('Successfully backed up the channels.');
}

function backRoles (message, sGuild) {
  sGuild.roles.forEach(r => r.delete());

  message.guild.roles.sort((a, b) => b.position - a.position).forEach(r => sGuild.roles.create({ data: { name: r.name, color: `#${r.hexColor}` }}));

  return message.channel.send('Successfully backed up the roles.');
}

async function backBans (message, sGuild) {
  const bans = await sGuild.fetchBans();
  bans.forEach(b => sGuild.members.unban(b.user.id));

  const curBans = await message.guild.fetchBans();
  curBans.forEach(b => sGuild.members.ban(b.user));

  return message.channel.send('Successfully backed up the bans.');
}

module.exports = async (Client, message, args) => {
  if (!message.member.roles.has(message.guild.roles.find(r => r.name === 'Owner').id)) return message.reply('Baka, you\'re not an owner.');

  if (!args[1]) return message.reply('You have to provide an option to backup! `all`, `channels`, `roles`, or `bans`.');
  const aOptions = ['all', 'channels', 'roles', 'bans'];
  const option = args[1].toLowerCase();
  if (!aOptions.includes(option)) return message.reply('That is not a valid option! The options are `all`, `channels`, `roles`, and `bans`.');

  const sGuild = Client.bot.guilds.get('516335260804317205');
  if (!sGuild) return message.reply('I did not find a backup server. Please contact Spiget.');

  if (option === 'all') {
    backChannels(message, sGuild);
    backRoles(message, sGuild);
    backBans(message, sGuild);
  } else if (option === 'channels') {
    backChannels(message, sGuild);
  } else if (option === 'roles') {
    backRoles(message, sGuild);
  } else if (option === 'bans') {
    backBans(message, sGuild);
  }
};

module.exports.help = {
  name: 'backup',
  desc: 'Backs up the server.',
  usage: 'backup all\nbackup channels\nbackup roles\nbackup bans'
};
