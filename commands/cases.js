const pandemicIcon = 'https://img.icons8.com/flat_round/128/000000/protection-mask.png';

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
                    .setAuthor('Stay home and wear masks!', pandemicIcon)
                    .setTitle(`${bot.user.username} LIVE COVID-19 Tracker`)
                    .setDescription(`There are currently **${data[0].stats ? data[0].stats.confirmed : 'Unknown'} cases** in Ventura County right now!\n*Additionally...*`)
                    .addField('Deaths', `${data[0].stats ? data[0].stats.deaths : 'Unknown'} Deaths`, true)
                    .addField('Recovered', `${data[0].stats ? data[0].stats.recovered : 'Unknown'} Recovered`, true)
                    .addField('ICU Beds', `Coming Soon/97 __Currently__ In Use`, false)
                    .setFooter(`${bot.user.username}'s data is sourced from Johns Hopkins University.`)
                    .setColor(0x8bc34a);
                msg.channel.send(cases);
            })
        }).end();
    } catch (err) {
        log.error(err);
    }
}