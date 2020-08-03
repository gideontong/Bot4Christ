const { prefix, logger } = require('../config/config.json');

const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('church');

module.exports = async msg => {
    if (msg.author.bot || !msg.content.startsWith(prefix)) return;
    log.info(`${msg.author.tag} deleted ${msg.cleanContent} from ${msg.guild.name} (${msg.channel.name})`);
    let guildLog = msg.client.guilds.resolve(logger.guild);
    try {
        if (guildLog.available) {
            let channelLog = guildLog.channels.resolve(logger.channel);
            if (channelLog && channelLog.type == 'text') {
                const deletedComment = new MessageEmbed()
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
                    .setTitle(`Message deleted in ${msg.guild.name}!`)
                    .setDescription(msg.content)
                    .setFooter(`${msg.createdAt} in ${msg.channel.name}`)
                    .attachFiles(msg.attachments.array());
                channelLog.send(deletedComment);
            }
        }
    } catch (err) {
        log.error(`While trying to emit a messageDelete I got ${err}`);
    }
}