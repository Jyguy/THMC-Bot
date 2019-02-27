module.exports = async (Client, message, args) => {
  const themes = [
    'Kingdom',
    'Space',
    'Forest',
    'Vampire',
    'High School',
    'The Hunger Games',
    'Apocalypse',
    'Family',
    'Camping',
    'Ghosts',
    'Haunting',
    'Concert',
  ];
  const theme = themes[Math.floor(Math.random() * themes.length)];

  return message.channel.send(`The roleplay theme is **${theme}**.`);
};

module.exports.help = {
  name: 'roleplay',
  desc: 'Outputs a random roleplay theme.',
  usage: 'roleplay'
};
