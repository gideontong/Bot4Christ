const Discord = require("discord.js");
const config = require("../config.json");

module.exports = async(bot, msg, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setDescription(`:ping_pong: **${bot.user.username}** v${config.version} by Gideon, serving ${bot.users.size} users and ${bot.guilds.size} servers`)
        .setFooter(`${bot.user.username} v${config.version}`)
        .setColor(0x00ff05)

    msg.channel.send(embed)
}