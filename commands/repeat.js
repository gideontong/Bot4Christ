const Discord = require("discord.js");
const config = require("../config/config.json");

module.exports = async(bot, msg, args) => {
    msg.channel.send(args)
}