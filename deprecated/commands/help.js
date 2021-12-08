const { prefix } = require('../config/config.json');
const { availableVersions } = require('../config/meta/bible.json');
const { MessageEmbed } = require('discord.js');

module.exports = async (bot, msg, args) => {
    const embed = new MessageEmbed()
    if (args.length > 0 && args[0].toLowerCase().startsWith('version')) {
        versionList = '';
        for (let version of availableVersions) {
            versionList += version + ', ';
        }
        versionList = versionList.substring(0, versionList.length - 2);
        embed.setAuthor(bot.user.username, bot.user.avatarURL)
            .setDescription("Here's the list of Bible version codes I can currently look at for you.")
            .addField(`Multilanguage:`, versionList, false)
            .setFooter(`${bot.user.username} v${process.env.npm_package_version} Help Menu`);
    } else {
        embed.setAuthor(bot.user.username, bot.user.avatarURL)
            .setDescription(`Need a bit of help? ${bot.user.username} is here to help you!`)
            .addField(`Get a Bible verse!`, `\`${prefix}verse Genesis 1:1 VERSION\` shows you a Bible verse. You can even include information like the Bible version, and passages are coming soon! To see a list of supported versions, say \`${prefix}help versions\`!\nIf you don't put a version, you'll get the default version. Also try searching passages of the Bible!`, false)
            .addField(`See current COVID-19 cases:`, `\`${prefix}cases\` tells you the current number of cases in Ventura.`, false)
            .addField(`More Commands`, `\`${prefix}about\` tells you about the bot, \`${prefix}creator\` tells you about the creator, and \`${prefix}copyright\` tells you about copyright.`, false)
            .setFooter(`${bot.user.username} v${process.env.npm_package_version} Help Menu`)
            .setColor(0xed1c24);
    }
    msg.channel.send(embed)
}