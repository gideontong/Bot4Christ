const versions = require('../config/meta/bible.json');
const { MessageEmbed } = require('discord.js');

module.exports = async (bot, msg, args) => {
    const error = new MessageEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setDescription("I couldn't find that version in my database. Did you spell it correctly?")
        .setFooter(`${bot.user.username}'s Bible Reader`)
        .setColor(0xe91e63);
    if (args.length < 1) {
        msg.channel.send(error);
        return;
    }
    let version = args[0].toUpperCase();
    if (versions.availableVersions.includes(version)) {
        const { meta } = require(`../config/bibles/${versions[version]}`);
        const copyright = new MessageEmbed()
            .setAuthor(bot.user.username, bot.user.avatarURL)
            .setTitle(`${meta.fullname} Copyright Information`)
            .setDescription(meta.copyright)
            .setFooter(`${bot.user.username}'s Bible Reader`)
            .setColor(0x00bcd4);
        msg.channel.send(copyright);
    } else {
        msg.channel.send(error);
    }
}