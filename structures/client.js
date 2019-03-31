'use strict';

const Discord = require('discord.js');
const fs = require('fs');
const sql = new (require('pg').Pool)({
  database: process.env.SQL_DB,
  host: process.env.SQL_HOST,
  password: process.env.SQL_PASS,
  port: process.env.SQL_PORT,
  user: process.env.SQL_USER
});
const bot = new Discord.Client({
  disabledEvents: [
    'START_TYPING',
    'STOP_TYPING',
    'RELATIONSHIP_ADD',
    'RELATIONSHIP_REMOVE',
    'USER_SETTINGS_UPDATE',
    'USER_NOTE_UPDATE',
    'GUILD_SYNC'
  ],
  disableEveryone: true
});

/**
 * @typedef {Object} configObj
 * @prop {String} prefix
 */

/**
 * @typedef {Object} Client
 * @prop {Discord.Client} bot
 * @prop {String[]} cmdList
 * @prop {Discord.Collection<String, Object>} commands
 * @prop {configObj} config
 * @prop {Discord} Discord
 * @prop {Discord.Util.escapeMarkdown} escMD
 * @prop {String[]} eventList
 * @prop {String[]} fnList
 * @prop {Discord.Collection<String, Object>} functions
 * @prop {Discord.Util.splitMessage} splitMessage
 * @prop {import('pg').Pool} sql
 */

/** @type {Client} */
const client = {
  bot: bot,
  cmdList: fs.readdirSync('./commands').filter(f => f.endsWith('.js')).map(f => f.slice(0, -3)),
  commands: new Discord.Collection(),
  config: require('../config.json'),
  Discord: Discord,
  escMD: Discord.Util.escapeMarkdown,
  eventList: fs.readdirSync('./events').filter(f => f.endsWith('.js')).map(f => f.slice(0, -3)),
  fnList: fs.readdirSync('./functions').filter(f => f.endsWith('.js')).map(f => f.slice(0, -3)),
  functions: new Discord.Collection(),
  splitMessage: Discord.Util.splitMessage,
  sql: sql
};

client.cmdList.forEach(cmd => client.commands.set(cmd, require(`../commands/${cmd}.js`)));
client.eventList.forEach(event => require(`../events/${event}.js`).run(client));
client.fnList.forEach(fn => client.functions.set(fn, require(`../functions/${fn}.js`)));

module.exports = client;
