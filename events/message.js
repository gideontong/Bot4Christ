// Imports from local config files
const { prefix, links } = require('../config/config.json');
const permissions = require('../config/permissions.json');

// Dependencies
const log = require('log4js').getLogger('church');
const { MessageEmbed } = require('discord.js');

module.exports = async msg => {
    if (msg.author.bot || !msg.content.startsWith(prefix)) return;
    const bot = msg.client;
    const args = msg.content.split(` `);
    const command = args.shift().slice(prefix.length);
    if (msg.channel.type == 'dm') {
        const disallow = new MessageEmbed()
            .setTitle("I'm not listening to DMs yet!")
            .setDescription(`I appreciate you DMing me, :smiling_face_with_3_hearts: but I have notifications turned off. Want this feature ASAP? Contact [Gideon Tong](${links.contact}) to let him know that you want this feature.`)
            .setFooter(`${bot.user.username}`)
            .setColor(0xc0392b);
        log.info(`${msg.author.tag} tried to send me a DM`);
        msg.channel.send(disallow);
        return;
    } else if (permissions.commands.admin.includes(command) && (!permissions.admins.includes(msg.author.id) || msg.member.hasPermission('ADMINISTRATOR'))) {
        const disallow = new MessageEmbed()
            .setTitle("You're not allowed to do that!")
            .setDescription(`Nuh uh uh! You have to be an admin to do that. Think this command shouldn't require admin permission? Maybe you thought you had admin powers? Contact [Gideon Tong](${links.contact}) to get this resolved.`)
            .setFooter(`${bot.user.username} stopped you from being naughty...`)
            .setColor(0xc0392b);
        log.info(`${msg.author.tag} tried to run ${command} without admin permissions`);
        msg.channel.send(disallow);
        return;
    } else if (permissions.commands.upcoming.includes(command) && !permissions.admins.includes(msg.author.id)) {
        const disallow = new MessageEmbed()
            .setTitle("That's coming soon...")
            .setDescription("Try again later, Gideon is still working on this feature...")
            .setFooter(`${bot.user.username} is too advanced!`)
            .setColor(0xf1c40f);
        log.info(`${msg.author.tag} tried to run upcoming command ${command}`);
        msg.channel.send(disallow);
        return;
    }
    try {
        cmdFile = require(`../commands/${command}.js`);
    } catch {
        const error = new MessageEmbed()
            .setTitle(`Hey, ${prefix}` + command + " isn't a command!")
            .setDescription(`Sorry about this! If you were told it's a command, please contact [Gideon Tong](${links.contact}) for more help! If you think it should be a command, contact him anyways!\n\nAlternatively, click [this link](${links.featureRequest}) to submit a new feature request (*a GitHub account is required*)!`)
            .setFooter(`${bot.user.username} might be going crazy...`)
            .setColor(0x2980b9);
        msg.channel.send(error);
        return;
    }
    if (cmdFile) {
        log.info(`${msg.author.tag} executed ${command} in ${msg.guild.name} (${msg.channel.name})`);
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