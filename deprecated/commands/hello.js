const emojis = ['🖐', '👐', '👌', '✌', '✊', '👋', '👏', '😀', '😊', '☺', '🎃', '🌚', '🌝', '🤖', '😎', '🙂', '😌'];

module.exports = async(bot, msg, args) => {
    msg.reply(`hello! ${emojis[Math.floor(Math.random() * emojis.length)]}`);
}