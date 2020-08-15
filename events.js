const reqEvent = (event) => require(`./events/${event}`);
module.exports = bot => {
    bot.on('message', reqEvent('message'));
    bot.on('messageDelete', reqEvent('messageDelete'));
    bot.on('messageUpdate', reqEvent('messageUpdate'));
}