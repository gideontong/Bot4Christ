const { logger } = require('../config/config.json');

const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('church');

module.exports = async (oldMsg, newMsg) => {
    if (oldMsg.author.bot || newMsg.author.bot) return;
    log.info(`${oldMsg.author.tag} edited ${oldMsg.cleanContent} to ${newMsg.cleanContent} in ${oldMsg.guild.name} (${oldMsg.channel.name})`);
    let guildLog = msg.client.guilds.resolve(logger.guild);
    try {
        if (guildLog.available) {
            let channelLog = guildLog.channels.resolve(logger.channel);
            if (channelLog && channelLog.type == 'text') {
                const editedComment = new MessageEmbed()
                    .setAuthor(oldMsg.author.tag, oldMsg.author.displayAvatarURL())
                    .setTitle(`Message edited in ${oldMsg.guild.name}!`)
                    .setDescription(`It had ${oldMsg.attachments.size} attachments.`)
                    .addField('Old Message', oldMsg.cleanContent, false)
                    .addField('New Message', newMsg.cleanContent, false)
                    .setFooter(`Edited at ${newMsg.editedAt} in ${oldMsg.channel.name}`);
                channelLog.send(editedComment);
            }
        }
    } catch (err) {
        log.error(`While trying to emit a messageUpdate I got ${err}`);
    }
}