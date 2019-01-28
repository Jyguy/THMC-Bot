const Discord = require('discord.js');
require('array-utility');
require('dotenv').config();
const sql = new (require('pg')).Pool({
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DB,
  port: process.env.SQL_PORT,
  host: process.env.SQL_HOST,
  ssl: true
});

const Client = {
  Discord,
  escMD: Discord.Util.escapeMarkdown,
  bot: new Discord.Client(),
  request: require('request'),
  commandsList: require('fs').readdirSync('./commands'),
  commands: {},
  config: process.env,
  sql: sql,
  mutes: []
};

for (let i = 0; i < Client.commandsList.length; i++) { // Creates a loop
  const item = Client.commandsList[i]; // Defines each of the file as item
  if (item.match(/\.js$/)) { // only take js files
    delete require.cache[require.resolve(`./commands/${item}`)]; // delete the cache of the require, useful in case you wanna reload the command again
    Client.commands[item.slice(0, -3)] = require(`./commands/${item}`); // and put the require inside the client.commands object
  }
}

Client.commandsList = Client.commandsList.map(cmd => cmd.slice(0, -3));

Client.bot.on('ready', async () => {
  /* sql.query('CREATE TABLE IF NOT EXISTS prefix (customprefix TEXT)');
  sql.query('CREATE TABLE IF NOT EXISTS scores (points INTEGER, userid TEXT, level INTEGER)');
  sql.query('CREATE TABLE IF NOT EXISTS warnings (reason TEXT, userid TEXT)');
  */

  const row = (await sql.query('SELECT customprefix FROM prefix')).rows[0];
  Client.config.prefix = row ? row.customprefix : 'h!';

  console.log(`Logged in as ${Client.bot.user.tag}.`);
  return Client.bot.user.setActivity({
    name: `${Client.bot.guilds.get('407257018978664449').members.filter(m => !m.user.bot).size} Hunters in the Server!`
  });
});

Client.bot.on('message', message => {
  if (!message.guild || !message.guild.available) return;
  if (message.author.bot) return;
  if (!message.channel.permissionsFor(Client.bot.user).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) return;

  require('./functions/level.js')(Client, message);
  if (!message.content.startsWith(Client.config.prefix) || message.content === Client.config.prefix) return;

  const args = message.content.slice(Client.config.prefix.length).split(/ +/g);
  const command = args[0].toLowerCase();

  if (Client.commandsList.includes(command)) Client.commands[command](Client, message, args);
});

Client.bot.on('guildMemberAdd', member => {
  if (Client.mutes.includes(member.id)) member.roles.add(member.guild.roles.find(r => r.name === 'Muted'));

  if (member.guild.me.hasPermission('MANAGE_ROLES')) member.roles.add(member.guild.roles.find(r => r.name === 'Wolves'));

  Client.bot.user.setActivity({
    name: `${Client.bot.guilds.first().members.filter(m => !m.user.bot).size} Hunters in the Server!`
  });

  const channel = member.guild.channels.get('516525421018480649');
  if (!channel || !channel.permissionsFor(Client.bot.user).has(['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'])) return;

  return channel.send(`Welcome to TheHuntersMC, ${member}!`);
});

Client.bot.on('guildMemberRemove', () => {
  Client.bot.user.setActivity({
    name: `${Client.bot.guilds.first().members.filter(m => !m.user.bot).size} Hunters in the Server!`
  });
});

Client.bot.on('guildMemberUpdate', (oldMember, newMember) => {
  if (oldMember.roles.size > newMember.roles.size) {
    const removed = oldMember.roles.filter(r => !newMember.roles.has(r.id)).find(r => r.name === 'Muted');
    if (removed && Client.mutes.includes(oldMember.id)) Client.mutes.splice(Client.mutes.indexOf(oldMember.id), 1);
  }
});

Client.bot.on('error', err => console.error(err));

process.on('unhandledRejection', e => {
  console.error(e);
});

Client.bot.login(Client.config.token);
