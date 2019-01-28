module.exports = async (Client, message, args) => {
  if (!message.channel.permissionsFor(message.member).has('MANAGE_MESSAGES')) return message.reply('You do not have the required permission `Manage Messages`!');
  if (!message.channel.permissionsFor(message.guild.me).has('MANAGE_MESSAGES')) return message.reply('I do not have the required permission `Manage Messages`!');

  if (!args[1]) return message.reply('You have to provide an amount for me to purge!');
  const amt = args[1];
  if (isNaN(amt)) return message.reply('The amount you provided was not a number!');
  if (amt.includes('.')) return message.reply('The amount cannot be a decimal!');
  if (amt < 2) return message.reply('The amount to purge has to be at least 2!');
  if (amt > 100) return message.reply('The maximum amount to purge is 100!');

  let member;
  if (!args[2]) member = null;
  else {
    member = message.guild.members.get(args[2].replace(/[<>@!?]/g, ''));
    if (!member) return message.reply('The member you provided was invalid!');
  }

  await message.delete();
  if (!member) return message.channel.bulkDelete(amt, true);
  else {
    const msgs = await message.channel.messages.fetch({ limit: amt });
    const filtered = msgs.filter(m => m.author.id === member.id);
    if (filtered.size === 0) return message.reply('I did not find any recent messages from that user.');

    return message.channel.bulkDelete(filtered, true);
  }
};

module.exports.help = {
  name: 'purge',
  desc: 'Purges an amount of messages.',
  usage: 'purge <Amount> [Member]'
};
