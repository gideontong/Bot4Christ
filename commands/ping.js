const { prefix } = require('../config/config.json');

const { MessageEmbed } = require('discord.js');

module.exports = async(bot, msg, args) => {
    const embed = new MessageEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setDescription(`:smirk: **${bot.user.username}** by Gideon#5433, serving ${bot.users.cache.size} Christians
            Need help? :confused: Try **${prefix}help** to get started.`)
        .setFooter(`${bot.user.username} v${process.env.npm_package_version}`)
        .setColor(0xf1d302);

    msg.channel.send(embed);
}