'use strict';

require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.config = require('./config.json');
client.Discord = Discord;
client.Util = Discord.Util;
client.escMD = Discord.Util.escapeMarkdown;

client.splitMessage = Discord.Util.splitMessage;

client.sql = new (require('pg').Pool)({
  database: process.env.SQL_DB,
  host: process.env.SQL_HOST,
  password: process.env.SQL_PASS,
  port: process.env.SQL_PORT,
  user: process.env.SQL_USER
});

client.commands = new Discord.Collection();
client.functions = new Discord.Collection();

client.cmdList = fs.readdirSync('./commands').filter(f => f.endsWith('.js')).map(f => f.slice(0, -3));
client.eventList = fs.readdirSync('./events').filter(f => f.endsWith('.js')).map(f => f.slice(0, -3));
client.fnList = fs.readdirSync('./functions').filter(f => f.endsWith('.js')).map(f => f.slice(0, -3));

client.cmdList.forEach(cmd => client.commands.set(cmd, require(`./commands/${cmd}.js`)));
client.eventList.forEach(event => require(`./events/${event}.js`).run(client));
client.fnList.forEach(fn => client.functions.set(fn, require(`./functions/${fn}.js`)));

client.login(process.env.token);
