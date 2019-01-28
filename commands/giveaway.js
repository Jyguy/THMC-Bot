let doing = false;

module.exports = async (Client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the required permission `Manage Server`!');
  if (!message.channel.permissionsFor(message.guild.me).has(['EMBED_LINKS'])) return message.reply('I do not have the required permission `Embed Links`!');
  if (doing) return message.reply('There is already a giveaway going on! Please wait for it to finish.');

  const filter = m => m.author.id === message.author.id && m.channel.id === message.channel.id;
  const collector = message.channel.createMessageCollector(filter, { time: 120000 });

  message.channel.send('1. Please state the item you are giving away.\n\nYou may also say "cancel" to abort this command.');
  let step = 1;
  const info = {};
  collector.on('collect', async msg => {
    if (message.channel.permissionsFor(message.guild.me).has('MANAGE_MESSAGES')) msg.delete();
    if (msg.content.toLowerCase() === 'cancel') {
      collector.stop();
      return message.channel.send('Cancelling command.');
    }

    if (step === 1) { // Item Name
      if (!msg.content) return message.reply('Please make the item actual characters, not an embed or an attachment.');
      if (msg.content.length > 100) return message.reply('The item character length may not exceed 100 characters.');

      info.item = msg.content;
      step += 1;
      return message.channel.send('2. Please state the amount of time the giveaway will last __in minutes__. The maximum amount is 24 hours (1,440 minutes) and minimum amount is 10 minutes.');
    } else if (step === 2) { // Time
      if (isNaN(msg.content)) return message.reply('The time must be a number!');
      if (msg.content > 1440) return message.reply('The maximum amount of time is 24 hours (1440 minutes)!');
      if (msg.content < 10) return message.reply('The minimum amount of time is 10 minutes!');
      if (msg.content.includes('.')) return message.reply('The time may not be a decimal!');

      info.time = msg.content;
      step += 1;
      return message.channel.send('3. How many members are able to win this giveaway? Maximum is 5.');
    } else if (step === 3) {
      if (isNaN(msg.content)) return message.reply('The amount of members must be a number!');
      if (msg.content > 5) return message.reply('The maximum amount of members that can win is 5!');
      if (msg.content < 1) return message.reply('The amount of members that can win cannot be lower than 1!');

      collector.stop();
      info.members = msg.content;
      doing = true;

      const embed = new Client.Discord.MessageEmbed()
        .setAuthor('🎉 NEW GIVEAWAY 🎉')
        .setTitle(`Item: **${info.item}**`)
        .addField('Time', `${info.time} Minutes`)
        .addField('Amount of Winners', info.members)
        .setColor(0x00FF00);

      const msg2 = await message.channel.send(embed);
      msg2.react('🎉');

      setTimeout(() => {
        doing = false;
        const winners = msg2.reactions.get('🎉').users.filter(u => !u.bot).random(info.members).filter(u => u);

        if (!winners.first()) return message.channel.send('No one participated in the giveaway.');

        return message.channel.send(`Congratulations **${winners.map(winner => winner.toString()).list()}**! You have won **${info.item}**!`);
      }, info.time * 60 * 1000);
    }
  });
};

module.exports.help = {
  name: 'giveaway',
  desc: 'Starts a giveaway!',
  usage: 'giveaway'
};
