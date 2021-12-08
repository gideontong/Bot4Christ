const { prefix, links } = require('../config/config.json');

const { MessageEmbed } = require('discord.js');

module.exports = async (bot, msg, args) => {
    const embed = new MessageEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL())
        .setDescription(`**${bot.user.username}** by [Gideon Tong](${links.contact}), serving ${bot.users.cache.size} Christians worldwide!\nNeed help? :confused: Try **${prefix}help** to get started.`)
        .setFooter(`${bot.user.username} v${process.env.npm_package_version}`)
        .setColor(0xf1d302);

    msg.channel.send(embed);
}