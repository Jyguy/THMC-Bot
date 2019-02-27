module.exports = async (Client, message, args) => {
  if (!message.channel.permissionsFor(Client.bot.user).has('EMBED_LINKS')) return message.reply(':x: I do not have the permission `Embed Links`! Please make sure I have this permission for this command to work.');

  const http = require("http");

  const req = http.get('http://aws.random.cat/meow', function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = JSON.parse(Buffer.concat(chunks).toString());

      const embed = new Client.Discord.MessageEmbed()
        .setTitle('Kitty!')
        .setColor(0x00FF00)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setImage(body.file);
      
      return message.channel.send(embed);
    });
  });

  return req.end();
};

module.exports.help = {
  name: 'cat',
  desc: 'Displays a random cat.',
  usage: 'cat'
};
