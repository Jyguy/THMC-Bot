module.exports = async (Client, message, args) => {
  const row = (await Client.sql.query('SELECT * FROM prefix')).rows[0];
  if (!args[1]) {
    return message.channel.send(`The current prefix for **${message.guild.name}** is \`${Client.escMD(Client.config.prefix)}\``);
  } else {
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You do not have the required `Manage Server` permission!');
    const newPrefix = args.slice(1).join(' ');
    if (newPrefix.length > 15) return message.reply('Please refrain from making the prefix exceed 15 characters.');
    Client.config.prefix = newPrefix;
    if (!row) Client.sql.query('INSERT INTO prefix (customprefix) VALUES ($1)', [newPrefix]);
    else Client.sql.query('UPDATE prefix SET customprefix = $1', [newPrefix]);

    return message.channel.send(`Successfully changed the prefix to \`${Client.escMD(newPrefix)}\``);
  }
};

module.exports.help = {
  name: 'prefix',
  desc: 'Either displays the prefix, or changes it.',
  usage: 'prefix [New Prefix]'
};
