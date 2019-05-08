const Discord = require("discord.js");
const config = require("../config.json");

module.exports = async(bot, msg, args) => {
    const embed = new Discord.Message()
    if(!msg.member.roles.some(r=>["admin"].includes(r.name))) {
        msg.reply("You aren't an admin!")
    } else {
        msg.reply("You're an admin!")
    }
}