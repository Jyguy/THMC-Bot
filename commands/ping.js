module.exports = (Client, message, args) => {
  return message.channel.send(`:stopwatch: Ping: \`${Math.round(Client.bot.ping * 100) / 100}ms\``);
};

module.exports.help = {
  name: 'ping',
  desc: 'Shows the ping of the bot!',
  usage: 'ping'
};
