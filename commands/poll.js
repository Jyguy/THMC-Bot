module.exports = async (Client, message, args) => {
  if (!args[1]) return message.reply('You have to provide a question to poll!');
  if (!message.channel.permissionsFor(Client.bot.user).has('ADD_REACTIONS')) return message.reply('I do not have the required permission `Add Reactions`.');

  await message.react('✅');
  return await message.react('❌');
};

module.exports.help = {
  name: 'poll',
  desc: 'Starts a poll.',
  usage: 'poll <Question>'
};
