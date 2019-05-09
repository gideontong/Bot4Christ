// KJV: de4e12af7f28f599-01
const Discord = require("discord.js");
const request = require('request');
const config = require("../config.json");
const kjv = require("./kjv-books.json");

module.exports = async (bot, msg, args) => {
    const embed = new Discord.Message()

    if (args.length != 2) {
        console.log("[Error] Bible verse wasn't actually a verse.");
        msg.reply("Are you really looking for a verse?");
        return;
    }

    var book;

    for (var i = 0; i < kjv.data.length; i++) {
        if (args[0] == kjv.data[i].name) {
            book = kjv.data[i].id;
            continue;
        }
    }

    if (book.length == 0) {
        console.log("[Error] Bible verse wasn't actually a verse.");
        msg.reply("Are you sure that was a book?");
        return;
    }

    var finns = args[1].split(":");

    var options = {
        method: 'GET',
        url: 'https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/verses/' + book + "." + finns[0] + "." + finns[1],
        headers: {
            'api-key': config.bibleapi
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            console.log("[Bible] Verse pulled and shared: " + info.data.reference);

            verse = info.data.content.replace(/(<([^>]+)>)/ig, ""); // Get rid of HTTP tags
            verse = verse.substring(finns[1].length, verse.length); // Get rid of verse header
            if(verse.substring(0, 1) == "¶") {
                verse = verse.substring(2, verse.length);
            }

            const embed = new Discord.RichEmbed()
                .setAuthor(bot.user.username, bot.user.avatarURL)
                .setDescription(verse)
                .setFooter(info.data.reference)
                .setColor(0x5998c5)

            msg.channel.send(embed)
        } else {
            msg.reply("That's not a verse!");
        }

    });
    // msg.reply("I tried, but...")
}