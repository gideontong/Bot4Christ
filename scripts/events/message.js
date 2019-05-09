const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = async msg => {
    if(!msg.content.startsWith(config.prefix)) return;
    if(msg.author.bot) return;
    const bot = msg.client;
    const args = msg.content.split(` `);
    const command = args.shift().slice(config.prefix.length);
    let cmdFile = require(`../../commands/${command}.js`);
    console.log(`[Command] The command ${command} has been executed by ${msg.author.tag} in ${msg.guild.name}`)
    if (!cmdFile) {
        return;
    }
    if (cmdFile) {
        cmdFile(bot, msg, args).catch(err => {
            id = makeid(10)
            const error = new Discord.RichEmbed()
                .setTitle(command)
                .setDescription(`Sorry about this!`)
                .addField(`The error code is `, "```" + id + "```", false)
                .setFooter(`Contact Gideon#5433 with this error message to get it fixed!`)
                .setColor(0xf45c42)

            msg.channel.send(error)
            
            console.error(`[Error] The following error ID is ` + id)
            console.error(`[Error] On execution of ` + command + ` in ` + msg.guild.name + `, something went wrong: ` + err)
        });    
    }
};

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }