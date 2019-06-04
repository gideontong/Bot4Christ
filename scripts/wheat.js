const Discord = require("discord.js");
const config = require("../config/config.json");
const responses = require("../config/responses.json");

module.exports = bot => {
    bot.on('message', msg => {
        if (msg.author.bot) {
            return
        }

        if(msg.content.substring(0, 3) == "abc") {
            command = msg.content.substring(3, msg.content.length());
        }

        var x = Math.floor(Math.random() * 50)
        content = "";
        var attach;
        key = msg.content.toLowerCase(); // The message in all lowercase

        // I love you, not that bad, and Paul is
        if (key.includes('i love you')) {
            if (msg.author.discriminator == config.usernames.paul) {
                content += "LOVE YOU TOO :heart: :heart_eyes: :heartpulse:";
            } else {
                content += "I love Paul, did you know that!?";
            }
            // console.log(`[Easter Egg] Love message triggered by ${msg.author.tag}!`);
        } else if (key.includes('not that bad')) {
            content += 'You sure about that? It\'s pretty bad'
        } else if (key.includes('paul is')) {
            content += 'I don\'t have any time for any gossip now'
        }

        // When Paul is talking about Emma
        if (key.includes('emma ') && msg.author.discriminator == config.usernames.paul) {
            if (content.length > 0) {
                content += "\n And "
            }
            content += "Paul, stop talking about me! :blush:"
        }

        if (key.includes('in ') && key.includes(' car')) {
            // console.log(`[Easter Egg] Driving message triggered by ${msg.author.tag}!`);
            if (content.length > 0) {
                content += "\n Psst..."
            }
            if (msg.author.discriminator == config.usernames.paul) {
                content += "Your driving isn't safe, though..."
            } else if (msg.author.discriminator == config.usernames.samuel) {
                content += "HEY STOP TEXTING AND DRIVING... oh wait, you're not Paul. Carry on ;)"
            } else {
                content += "At least your driving seems alright."
            }
        }

        // Images
        if (key.includes(' dress')) {
            attach = new Discord.Attachment("generates/dress.png")
        } else if (key.includes('nissan')) {
            attach = new Discord.Attachment("generates/nissan.png")
        }

        if (x != 1) {
            if (content.length > 0 || attach != null) console.log(`[Easter Egg] ${msg.author.tag} said something that could've triggered the bot!`)
            content = ""
            attach = null
        }

        // Prom
        /*
        if (key.includes(' prom') || key.includes('prom ')) {
            if (msg.author.discriminator == config.usernames.paul) {
                x = Math.floor(Math.random() * 6)
            } else {
                x = Math.floor(Math.random() * 40)
                console.log("[Easter Egg] Not Paul, but prom was talked about. Randomly generated number was " + x)
            }
            console.log(`[Easter Egg] ${msg.author.tag} talked about prom! (Key: ` + x + `)`)
            switch(x) {
                case 0:
                    content = "Speaking of prom..."
                    attach = new Discord.Attachment("generates/dress2.png")
                    break;
                case 1:
                    content = "Paul Yu once said..."
                    attach = new Discord.Attachment("generates/quote1.png")
                    break;
                case 2:
                    content = "Did someone say prom? Don't forget to dance!"
                    attach = new Discord.Attachment("generates/quote2.png")
                    break;
                case 3:
                    content = "Don't forget to bring a date to prom!"
                    attach = new Discord.Attachment("generates/quote3.png")
                    break;
                case 4:
                    content = "It's funny you talk about prom..."
                    attach = new Discord.Attachment("generates/quote4.png")
                    break;
                case 5:
                    content = "Prom dates are cool, but have you tried real dating?"
                    attach = new Discord.Attachment("generates/quote5.png")
                    break;
                case 6:
                    content = "Don't do this at prom!"
                    attach = new Discord.Attachment("generates/quote6.png")
                    break;
            }
        }
        */

        // Reply if there's something to reply with
        if (content.length > 0 || attach != null) {
            console.log(`[Easter Egg] An easter egg has been triggered by ${msg.author.tag}!`)
            msg.reply(content, file = attach);
        } else if (msg.author.discriminator == config.usernames.paul) {
            x = Math.floor(Math.random() * 100)
            if (x <= 55) {
                console.log(`[Easter Egg] No easter egg was triggered, but Paul talked so a response was generated.`)
                msg.reply(responses.responses[x])
            }
        }
    });
}