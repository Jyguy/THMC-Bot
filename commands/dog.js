'use strict';

const fetch = require('node-fetch');

/**
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').Message} message
 * @param {String[]} args
 */
exports.run = async (client, message, args) => {
  if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.reply(':x: I am missing the required permission `Embed Links` in this channel.');

  let res = await fetch('https://dog.ceo/api/breeds/image/random');
  res = res.json();

  if (res.status !== 'success') return message.channel.send(':x: Looks like the API is down, try again later.');

  const url = res.message;
  const embed = new client.Discord.MessageEmbed()
    .setTitle('Doggo!')
    .setColor(0x00FF00)
    .setImage(url)
    .setFooter(`Powered by https://dog.ceo/dog-api/ | Requested by ${message.author.tag}`, message.author.displayAvatarURL());
  return message.channel.send(embed);
};

exports.help = {
  desc: 'Returns a picture of a dog.',
  usage: 'dog'
};
