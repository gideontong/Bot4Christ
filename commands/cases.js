const https = require('https');
const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('church');

module.exports = async (bot, msg, args) => {
    let options = {
        host: 'corona.lmao.ninja',

        path: '/v2/jhucsse/counties/Ventura'
    };

    try {
        https.request(options, res => {
            let data = '';
            res.on('data', d => { data += d; });
            res.on('end', () => {
                data = JSON.parse(data);
                const cases = new MessageEmbed()
                    .setTitle('Act4Christ LIVE COVID-19 Tracker')
                    .setDescription(`There are currently ${data[0].stats ? data[0].stats.confirmed : 'Unknown'} cases in Ventura County right now!`)
                msg.reply(`${data[0].stats ? data[0].stats.confirmed : 'Unknown'} cases in Ventura County right now!`);
            })
        }).end();
    } catch (err) {
        log.error(err);
    }
}