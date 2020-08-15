const { verseToday } = require('../lib/Bible');

module.exports = async (bot, msg, args) => {
    msg.channel.send(verseToday());
}