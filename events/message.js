// Imports from local config files
const { prefix } = require('../config/config.json');

// Dependencies
const log = require('log4js').getLogger('church');
const Discord = require('discord.js');

module.exports = async msg => {
    if (msg.author.bot || !msg.content.startsWith(prefix)) return;
    const bot = msg.client;
    const args = msg.content.split(` `);
    const command = args.shift().slice(prefix.length);
    try {
        cmdFile = require(`../commands/${command}.js`);
    } catch {
        const error = new Discord.MessageEmbed()
            .setTitle(`Hey, ${prefix}` + command + " isn't a command!")
            .setDescription(`Sorry about this! If you were told it's a command, please contact Gideon#5433 for more help! If you think it should be a command, contact him anyways!`)
            .setFooter(`${bot.user.username} might be going crazy...`)
            .setColor(0xf45c42)

        msg.reply(error)
    }
    log.info(`The command ${command} has been executed by ${msg.author.tag} in ${msg.guild.name}`)
    if (!cmdFile) {
        return;
    }
    if (cmdFile) {
        cmdFile(bot, msg, args).catch(err => {
            id = makeid(10)
            const error = new Discord.MessageEmbed()
                .setTitle("Error running " + command)
                .setDescription(`Sorry about this!`)
                .addField(`The error code is `, "```" + id + "```", false)
                .setFooter(`Contact Gideon#5433 with this error to get it fixed!`)
                .setColor(0xf45c42)

            msg.channel.send(error)

            log.error(`The following error ID is ` + id)
            log.error(`On execution of ` + command + ` in ` + msg.guild.name + `, something went wrong: ` + err)
        });
    }
};

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}