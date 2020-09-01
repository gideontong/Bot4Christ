const { logger } = require('../config/config.json');
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('church');

module.exports = async guild => {
    log.info(`Left guild ${guild.name}`);
    try {
        if (guild.available) {
            let loggerGuild = guild.client.guilds.resolve(logger.guild);
            if (loggerGuild) {
                let loggerChannel = loggerGuild.channels.resolve(logger.channel);
                if (loggerChannel && loggerChannel.type == 'text') {
                    const guildNotifcation = new MessageEmbed()
                        .setAuthor(guild.owner.user.tag, guild.owner.user.displayAvatarURL())
                        .setTitle(`Left server ${guild.name}`)
                        .setDescription(`Has ${guild.memberCount} members and was originally created on ${guild.createdAt}`)
                        .setFooter(`Originally joined at ${guild.joinedAt}`);
                    loggerChannel.send(guildNotifcation);
                }
            }
        }
    } catch (err) {
        log.error(`While trying to emite a guildDelete I got ${err}`);
    }
}