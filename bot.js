const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("./config.json");
bot.login(config.token);

require("./scripts/events.js")(bot);

bot.on("ready", function () {
    console.log('[info] Started the best Discord bot! Running...')
    console.log(`[info] Connected to Discord as: ${bot.user.tag} with the id: ${bot.user.id}! Prefix: ${config.prefix}, branch: ${config.branch}, version: ${config.version}`)
    require('child_process').exec('cd dashboard && node WebServer.js', () => {
    })
});

bot.on('message', msg => {
    if (msg.content === 'i love you') {
        msg.reply('i love paul too');
    }
});