const Discord = require("discord.js");
const config = require("../config/config.json");

module.exports = bot => {
    bot.on('message', msg => {
        if (msg.author.bot) {
            return
        }

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

        if (key.includes('in ') || key.includes(' car')) {
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
        if (key.includes('dress')) {
            attach = new Discord.Attachment("generates/dress.png")
        } else if (key.includes('nissan')) {
            attach = new Discord.Attachment("generates/nissan.png")
        }

        // Reply if there's something to reply with
        if (content.length > 0 || attach != null) {
            msg.reply(content, file = attach);
        }
    });
}