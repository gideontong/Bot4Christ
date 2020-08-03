const { prefix } = require("../config/config.json");
const Discord = require("discord.js");

module.exports = async (bot, msg, args) => {
    const embed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setDescription(`Need a bit of help? ${bot.user.username} is here to help you!`)
        .addField(`See current COVID-19 cases:`, `\`${prefix}cases\` tells you the current number of cases in Ventura.`, false)
        .addField(`Learn more about this bot:`, `\`${prefix}about\` tells you everything you want to know, and cool facts!`, false)
        .setFooter(`${bot.user.username} v${process.env.npm_package_version} Help Menu`)
        .setColor(0xed1c24);

    msg.channel.send(embed)
}