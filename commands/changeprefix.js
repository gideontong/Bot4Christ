var fs = require('fs');
var config = require("../config/config.json");
// delete require.cache['/home/shimin/test2.js']

module.exports = async (bot, msg, args) => {
    if (msg.member.roles.some(r => ["admin"].includes(r.name))) {

        if (args.length != 1 || args[0].length != 1) {
            msg.reply("Your command prefix must be one character long!");
            return;
        }

        config.prefix = args[0];
        /*fs.writeFile(config, config, function (err, data) {
            if (err) {
                msg.reply("Couldn't save! Tell Gideon#5433 to check his server.");
                return console.log(err);
            }
            // console.log(JSON.stringify(file));
            console.log('[Command Update] Writing the prefix ' + config.prefix + ' to disk...');
        });*/

        console.log('[Command Update] Writing the prefix ' + config.prefix + ' to disk...');
        msg.reply(`Command updated! Try using ${config.prefix}help to verify it's working!`);
        delete require.cache[require.resolve('../config/config.json')];

    } else {
        msg.reply("You can't do that, you're not an admin!")
    }
}