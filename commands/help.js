const Discord = require("discord.js");
const config = require("../config/config.json");

module.exports = async(bot, msg, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setDescription(`Need a bit of help? ${bot.user.username} is here to help you!`)
        .addField(`To find out more about this bot... try`, `\`${config.prefix}about\``, false)
        .addField(`To create a QR code... try`, `\`${config.prefix}qr [string]\` with string being the text you want to make into a QR code.`, false)
        .addField(`To find a Bible verse... try`, `\`${config.prefix}verse [verse]\`, typing out the full name of the Bible verse.`, false)
        .setFooter(`${bot.user.username} v${config.version} Help Menu`)
        .setColor(0xed1c24)

    msg.channel.send(embed)
}