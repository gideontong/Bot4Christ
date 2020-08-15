const { verseToday } = require('../lib/Bible');

module.exports = async (bot, msg, args) => {
    msg.reply(verseToday());
}