const Discord = require("discord.js");
const config = require("../config.json");

module.exports = async(bot, msg, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setDescription(`Commands you can currently try: ${config.prefix}ping, ${config.prefix}hello, ${config.prefix}qr`)
        .setFooter(`${bot.user.username} v${config.version} Help Menu`)
        .setColor(0xed1c24)

    msg.channel.send(embed)
}