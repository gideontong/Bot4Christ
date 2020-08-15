const { query } = require('../lib/Bible');

module.exports = async (bot, msg, args) => {
    msg.channel.send(query(msg.cleanContent.substring(args[0].length + 1)));
}