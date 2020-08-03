const { prefix } = require("../config/config.json");
const Discord = require("discord.js");

module.exports = async (bot, msg, args) => {
    const embed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setDescription(`Need a bit of help? ${bot.user.username} is here to help you!`)
        .addField(`To find out more about this bot... try`, `\`${prefix}about\``, false)
        .setFooter(`${bot.user.username} v${process.env.npm_package_version} Help Menu`)
        .setColor(0xed1c24);

    msg.channel.send(embed)
}