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
    content = "";
    var attach;
    if (msg.content.toLowerCase().includes('i love you')) {
        if(msg.author.username == "pyu"){
            content += "LOVE YOU TOO :heart: :heart_eyes: :heartpulse:";
        } else {
            content += "I love Paul, did you know that!?";
        }
    } else if (msg.content.toLowerCase().includes('paul is')) {
        msg.reply('I don\'t have any time for any gossip now');
    }
    if (msg.content.toLowerCase().includes('dress')) {
        attach = new Discord.Attachment("generates/dress.png")
    }
    else if (msg.content.toLowerCase().includes('nissan')) {
        attach = new Discord.Attachment("generates/nissan.png")
    }
    if(content.length > 0 || attach != null) {
        msg.reply(content, file = attach);
    }
});