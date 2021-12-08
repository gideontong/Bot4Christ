// Local config files
const { prefix, activities, activityUpdateInterval } = require('./config/config.json');
const { token } = require('./config/secrets.json');

// Dependencies
const Discord = require('discord.js');
const log4js = require('log4js');
const client = new Discord.Client();

function createLogName() {
    let date = new Date();
    return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate() + '.' +
        date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds() + '.log';
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

require('./events.js')(client);

client.on('ready', () => {
    log.info(`The bot has begun startup as ${client.user.tag} on prefix ${prefix}`);
    setInterval(() => {
        const index = Math.floor(Math.random() * activities.length);
        client.user.setActivity(activities[index].text, activities[index].options);
    }, activityUpdateInterval * 1000);
});

client.login(token);