const { prefix, logger } = require('../config/config.json');

const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('church');

module.exports = async msg => {
    if (msg.author.bot || msg.content.startsWith(prefix)) return;
    log.info(`${msg.author.tag} deleted ${msg.cleanContent} from ${msg.guild.name} (${msg.channel.name})`);
}