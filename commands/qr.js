import QRCode from 'qrcode'

const Discord = require("discord.js");
const config = require("../config.json");

module.exports = async (bot, msg, args) => {
    QRCode.toDataURL(msg)
        .then(url => {
            console.log(url)
        })
        .catch(err => {
            console.error(err)
        })

    const embed = new Discord.MessageAttachment()
        .url(url)

    msg.reply(embed)
}