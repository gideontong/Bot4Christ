const { links } = require('../config/config.json');

const { MessageEmbed } = require('discord.js');

module.exports = async (bot, msg, args) => {
    const errorNotVerse = new MessageEmbed()
        .setTitle('Not a Bible verse?')
        .setDescription(`That is positively not a Bible verse, dude... if you think it's a Bible verse and Gideon messed up, please contact [Gideon Tong](${links.contact}) or let me know [here](${links.bugReport}) with a GitHub account.`)
        .setFooter(`${bot.user.username}'s Bible Reader`)
        .setColor(0xe91e63);
    if (args.length > 3 || args.length < 2) {
        msg.channel.send(errorNotVerse);
        return;
    }
    if (args.length == 3) {
        args[0] = args[0] + ' ' + args[1];
        args.splice(1, 1);
    }
    let code = args[1].split(':');
    if (code.length != 2) {
        msg.channel.send(errorNotVerse);
        return;
    } else {
        args[1] = parseInt(code[0]);
        args[2] = parseInt(code[1]);
        if (!(args[1] && args[2])) {
            msg.channel.send(errorNotVerse);
            return;
        }
    }
    // TODO: Introduce multi version logic
    const { meta, bible } = require('../config/bibles/NIV.json');
    if (bible[args[0]] && bible[args[0]][args[1]] && bible[args[0]][args[1]][args[2]]) {
        const verse = new MessageEmbed()
            .setAuthor(`${meta.version} Bible`, 'https://img.icons8.com/plasticine/100/000000/holy-bible.png')
            .setTitle(`${args[0]} ${args[1]}:${args[2]}`)
            .setDescription(bible[args[0]][args[1]][args[2]])
            .setFooter(`${bot.user.username}'s Bible Reader`)
            .setColor(0xffeb3b);
        msg.channel.send(verse);
    } else {
        msg.channel.send(errorNotVerse);
    }
}