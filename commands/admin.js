module.exports = async(bot, msg, args) => {
    if(!msg.member.roles.some(r=>["admin"].includes(r.name))) {
        msg.reply("You aren't an admin!")
    } else {
        msg.reply("You're an admin!")
    }
}