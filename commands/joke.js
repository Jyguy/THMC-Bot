const request = require('request');

module.exports = async (Client, message, args) => {
  const res = request('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json'
    }
  }, (err, res, body) => {
    body = JSON.parse(body);
    return message.channel.send(body.joke);
  });
};

module.exports.help = {
  name: 'joke',
  desc: 'Provides a random joke for you!',
  usage: 'joke'
};
