'use strict';

require('dotenv').config();
const client = require('./structures/client.js');

client.bot.login(process.env.token);
