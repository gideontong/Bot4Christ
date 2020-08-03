// Local config files
const { prefix } = require("./config/config.json");
const { token } = require('./config/secrets.json');

// Dependencies
const Discord = require("discord.js");
const log4js = require('log4js');
const bot = new Discord.Client();

function createLogName() {
    let date = new Date();
    return date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate() + "." +
        date.getHours() + "." + date.getMinutes() + "." + date.getSeconds() + ".log";
}

log4js.configure({
    appenders: {
        console: {
            type: 'console'
        },
        file: {
            type: 'file',
            filename: `logs/${createLogName()}`
        }
    },
    categories: {
        default: {
            appenders: ['console', 'file'],
            level: 'info'
        }
    }
});
const log = log4js.getLogger('church');

require("./events.js")(bot);

bot.on("ready", function () {
    log.info(`The bot has begun startup as ${bot.user.tag} on prefix ${prefix}`);
    bot.user.setActivity('the throne of God', { type: 'WATCHING' })
    .then(presence => log.info(`Activity set to ${presence.activites[0].type} ${presence.activities.toString()}`))
    .catch(log.error);
});

bot.login(token);