const Discord = require("discord.js");
var QRCode = require('qrcode')
const config = require("../config.json");

module.exports = async (bot, msg, args) => {
    // console.log(msg.content)
    var attach
    if(msg.content.length < 5) {
        msg.reply("You... didn't put anything?")
        return
    }
    var text = msg.content.substring(4, msg.content.length)
    if(text.length > 512) {
        msg.reply("Your message is too long!")
        return
    }
    QRCode.toDataURL(text, function (err, url) {
        // console.log(url)

        var base64Data = url.replace(/^data:image\/png;base64,/, "");
        require("fs").writeFile("generates/QR.png", base64Data, 'base64', function (err) {
            console.log(err);
            attach = new Discord.Attachment("generates/QR.png")
            msg.channel.send(attach)
        });

        // attach = new Discord.Attachment(url)
    })

    // msg.channel.send(attach)
}