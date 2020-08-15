module.exports = async (bot, msg, args) => {
    require('./help')(bot, msg, ['version']);
}