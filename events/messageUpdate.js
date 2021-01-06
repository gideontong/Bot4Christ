const log = require('log4js').getLogger('church');

module.exports = async (oldMsg, newMsg) => {
    if (oldMsg.author.bot || newMsg.author.bot || !newMsg.editedAt) return;
    log.info(`${oldMsg.author.tag} edited ${oldMsg.cleanContent} to ${newMsg.cleanContent} in ${oldMsg.guild.name} (${oldMsg.channel.name})`);
}