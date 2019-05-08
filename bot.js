const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("./config.json");
bot.login(config.token);

require("./scripts/events.js")(bot);
require("./scripts/wheat.js")(bot);

bot.on("ready", function () {
    console.log('[INFO] The Discord bot has begun startup...')
    console.log(`[INFO] Connected to Discord as: ${bot.user.tag} with the id: ${bot.user.id}! Prefix: ${config.prefix}, branch: ${config.branch}, version: ${config.version}`)
    require('child_process').exec('cd dashboard && node WebServer.js', () => {
    })
});