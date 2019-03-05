'use strict';

const fetch = require('node-fetch');

/**
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').Message} message
 * @param {String[]} args
 */
exports.run = async (client, message, args) => {
  if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.reply(':x: I am missing the required permission `Embed Links` in this channel.');

  let res = await fetch('https://api.thecatapi.com/v1/images/search');
  res = res.json();

  const url = res[0].url;
  const embed = new client.Discord.MessageEmbed()
    .setTitle('Kitty!')
    .setColor(0x00FF00)
    .setImage(url)
    .setFooter(`Powered by https://thecatapi.com/ | Requested by ${message.author.tag}`, message.author.displayAvatarURL());
  return message.channel.send(embed);
};

exports.help = {
  desc: 'Returns a picture of a cat.',
  usage: 'cat'
};
