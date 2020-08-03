const Discord = require("discord.js");
const config = require("../config/config.json");

module.exports = async(bot, msg, args) => {
    const embed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setDescription(`:smirk: **${bot.user.username}** by Gideon#5433, serving ${bot.users.size} Christians
            Need help? :confused: Try **${config.prefix}help** to get started.`)
        .setFooter(`${bot.user.username} v${config.version}`)
        .setColor(0xf1d302)

    msg.channel.send(embed)
}