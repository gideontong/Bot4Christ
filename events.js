const reqEvent = (event) => require(`./events/${event}`);
module.exports = bot => {
    bot.on('guildCreate', reqEvent('guildCreate'));
    bot.on('guildDelete', reqEvent('guildDelete'));
    bot.on('message', reqEvent('message'));
}