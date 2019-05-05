const reqEvent = (event) => require(`./events/${event}`)
module.exports = bot => {
    bot.on("message", reqEvent("message"));
}