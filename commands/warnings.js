module.exports = async (Client, message, args) => {
  const member = args[1] ? message.guild.members.get(args[1].replace(/[<>@!?]/g, '')) : message.member;
  if (!member) return message.reply('The member you provided was invalid!');

  const { rows } = await Client.sql.query('SELECT * FROM warnings WHERE userid = $1 ORDER BY warnid DESC', [member.id]);
  if (rows.length === 0) return message.channel.send('That member does not have any warnings!');

  const info = rows.map(r => `Warn ID: ${r.warnid} | Reason: ${r.reason}`);

  if (info.join('\n').length > 2048) {
    const pages = Client.Discord.Util.splitMessage(info.join('\n'), {
      maxLength: 1024
    });
    let page = 1;

    const embed = new Client.Discord.MessageEmbed()
      .setTitle(`${member === message.member ? 'Your' : `${member.user.tag}'s`} Warnings`)
      .setDescription(pages[0])
      .setColor(0x00FF00)
      .setFooter(`Page 1 of ${pages.length} | Requested by ${message.author.tag}`, message.author.displayAvatarURL());

    const msg = await message.channel.send(embed);

    const emojis = ['⬅', '➡'];
    const filter = (reaction, user) => user.id === message.author.id && emojis.includes(reaction.emoji.name);
    const collector = msg.createReactionCollector(filter, { time: 60000 });

    collector.on('collect', reaction => {
      if (reaction.emoji.name === emojis[0]) {
        if (page === 1) return message.reply('You cannot go before page 1!');

        page--;
        return msg.edit(pages[page - 1]);
      } else {
        if (page === pages.length) return message.reply(`You cannot go after page ${pages.length}!`);

        page++;
        return msg.edit(pages[page - 1]);
      }
    });
  } else {
    const embed = new Client.Discord.MessageEmbed()
      .setTitle(`${member === message.member ? 'Your' : `${member.user.tag}'s`} Warnings`)
      .setDescription(info.join('\n'))
      .setColor(0x00FF00)
      .setFooter(`Requested by ${member.user.tag}`, message.author.displayAvatarURL());

    return message.channel.send(embed);
  }
};

module.exports.help = {
  name: 'warnings',
  desc: 'Shows the total amount of warnings for a member.',
  usage: 'warnings [Member]'
};
