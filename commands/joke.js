'use strict';

/**
 * @param {import('../structures/client.js')} client
 * @param {import('discord.js').Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
  const body = await client.fetch('https://canihazdadjoke.com/', {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'THMC Bot: https://github.com/Jyguy/THMC-Bot'
    }
  }).then(res => res.json());

  return message.channel.send(body.joke);
};

module.exports.help = {
  desc: 'Provides a joke for you.',
  usage: 'joke'
};
