module.exports = async (bot, msg, args) => {
    let data = await fetch('https://corona.lmao.ninja/v2/jhucsse/counties/Ventura');
    let cases = data.status.confirmed;
    msg.reply(`${cases} cases in Ventura County today!`);
}