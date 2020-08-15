const { links } = require('../config/config.json');

const { buildEmbed } = require('../lib/Bible');
const { MessageEmbed } = require('discord.js');

module.exports = async (bot, msg, args) => {
    const errorNotVerse = new MessageEmbed()
        .setTitle('Not a Bible verse?')
        .setDescription(`That is positively not a Bible verse, dude... if you think it's a Bible verse and Gideon messed up, please contact [Gideon Tong](${links.contact}) or let me know [here](${links.bugReport}) with a GitHub account.`)
        .setFooter(`${bot.user.username}'s Bible Reader`)
        .setColor(0xe91e63);
    if (args.length == 0) {
        msg.channel.send(errorNotVerse);
    } else {
        embed = buildEmbed(bot, msg.content.substring(args[0] + 1));
        if (embed) {
            msg.channel.send(embed);
        } else {
            msg.channel.send(errorNotVerse);
        }
    }
}