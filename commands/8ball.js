module.exports = (Client, message, args) => {
  if (!args[1]) return message.reply('You have to provide a yes/no question for me to answer!');

  const replies = {
    'y': [
      'Yes.',
      'Absolutely.',
      'Of course.',
      'Definitely.'
    ],
    'n': [
      'No.',
      'Absolutely not.',
      'Of course not.',
      'Indefinitely.'
    ]
  };

  const answer = replies[Object.keys(replies)[Math.floor(Math.random() * 2)]][Math.floor(Math.random() * 4)];
  const embed = new Client.Discord.MessageEmbed()
    .setTitle(answer)
    .setColor(replies['y'].includes(answer) ? 0x00FF00 : 0xFF0000)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

  return message.channel.send(embed);
};

module.exports.help = {
  name: '8ball',
  desc: 'Sends a random reply from Yes or No.',
  usage: '8ball <Question>'
};
