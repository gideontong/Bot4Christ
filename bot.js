const config = require("./config/config.json");

const Discord = require("discord.js");
const log4js = require('log4js');
const bot = new Discord.Client();

function genLog() {
    let date = new Date();
    return date.getFullYear() + "." + date.getMonth() + "." + date.getDate() + "." +
        date.getHours() + "." + date.getMinutes() + "." + date.getSeconds() + ".log";
}

log4js.configure({
    appenders: {
        console: {
            type: 'console'
        },
        file: {
            type: 'file',
            filename: `logs/${genLog()}`
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

bot.login(config.token);

require("./scripts/events.js")(bot);

bot.on("ready", function () {
    log.info(`The bot has begun startup as ${bot.user.tag} on prefix ${config.prefix}`);
    log.info(`Additional information, branch: ${config.branch} and version ${config.version}`);
    bot.user.setActivity('the throne of God', { type: 'WATCHING' })
        .then(presence => log.info(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
        .catch(log.error);
});