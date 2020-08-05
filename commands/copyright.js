const { prefix, links } = require('../config/config.json');
const versions = require('../config/meta/bible.json');
const { MessageEmbed } = require('discord.js');

module.exports = async (bot, msg, args) => {
    const error = new MessageEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setDescription("I couldn't find that version in my database. Did you spell it correctly?")
        .setFooter(`${bot.user.username}'s Bible Reader`)
        .setColor(0xe91e63);
    if (args.length < 1) {
        const message = {
            "embed": {
                "description": `• ${bot.user.username} is developed by [Gideon Tong](${links.contact}) and is licensed under MIT, copyright 2019-2020.\n• Various Bibles have different copyright, check their copyright with \`${prefix}copyright [version]\`\n• Usagyuuun stickers (visible on some screens) are copyright Quan Inc. :flag_jp:`,
                "author": {
                    "name": bot.user.username,
                    "icon_url": bot.user.avatarURL
                },
                "footer": {
                    "text": "Copyright Information Screen"
                },
                "color": 0x3f51b5
            }
        }
        msg.channel.send(message);
        return;
    }
    let version = args[0].toUpperCase();
    if (versions.availableVersions.includes(version)) {
        const { meta } = require(`../config/bibles/${versions['versionmap'][version]}`);
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