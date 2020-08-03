// Imports from local config files
const { prefix, link } = require('../config/config.json');
const permissions = require('../config/permissions.json');

// Dependencies
const log = require('log4js').getLogger('church');
const { MessageEmbed } = require('discord.js');

module.exports = async msg => {
    if (msg.author.bot || !msg.content.startsWith(prefix)) return;
    const bot = msg.client;
    if (msg.channel.type == 'dm') {
        const disallow = new MessageEmbed()
            .setTitle("I'm not listening to DMs yet!")
            .setDescription(`I appreciate you DMing me, :smiling_face_with_3_hearts: but I have notifications turned off. Want this feature ASAP? Contact [Gideon Tong](${link}) to let him know that you want this feature.`)
            .setFooter(`${bot.user.username}`)
            .setColor(0xc0392b);
        msg.channel.send(disallow);
    }
    const args = msg.content.split(` `);
    const command = args.shift().slice(prefix.length);
    try {
        cmdFile = require(`../commands/${command}.js`);
    } catch {
        const error = new MessageEmbed()
            .setTitle(`Hey, ${prefix}` + command + " isn't a command!")
            .setDescription(`Sorry about this! If you were told it's a command, please contact [Gideon Tong](${link}) for more help! If you think it should be a command, contact him anyways!\n\nAlternatively, click [this link](https://github.com/gideontong/Bot4Christ/issues/new?assignees=gideontong&labels=enhancement%2C+help+wanted&template=feature-request.md&title=%5BNEW+COMMAND%5D+My+command+is...+) to submit a new feature request (*a GitHub account is required*)!`)
            .setFooter(`${bot.user.username} might be going crazy...`)
            .setColor(0x2980b9);
        msg.channel.send(error);
        return;
    }
    if (cmdFile) {
        log.info(`The command ${command} has been executed by ${msg.author.tag} in ${msg.guild.name} (${msg.channel.name})`);
        cmdFile(bot, msg, args).catch(err => {
            const error = new MessageEmbed()
                .setTitle("Error running " + command)
                .setDescription(`Sorry about this! It appears something went wrong.`)
                .setFooter(`Contact Gideon#5433 with this error to get it fixed!`)
                .setColor(0xc0392b);
            msg.channel.send(error);
            log.error(`On execution of ${command} in ${msg.guild.name} (${msg.channel.name}): ${err}`);
        });
    }
};