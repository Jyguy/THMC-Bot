'use strict';

require('dotenv').config();
const client = require('./structures/client.js');

process.on('unhandledRejection', info => console.error(info));

client.bot.login(process.env.token);
