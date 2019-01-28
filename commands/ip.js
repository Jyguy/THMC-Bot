module.exports = (Client, message, args) => {
  return message.channel.send('The server is not public yet!');
};

module.exports.help = {
  name: 'ip',
  desc: 'Displays the IP of the server.',
  usage: 'ip'
};
