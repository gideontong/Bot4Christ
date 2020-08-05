module.exports = async (bot, msg, args) => {
    msg.channel.send('🏓 Pinging...').then((message) => {
        const start = new Date().valueOf();
        const { meta } = require('../config/bibles/KJV.json');
        const end = new Date().valueOf();
        message.edit({
            embed: {
                title: `📶 ${bot.user.username} Service Availability`,
                fields: [
                    {
                        name: "Server Round Trip Time",
                        value: `${message.createdAt - msg.createdAt}ms`
                    },
                    {
                        name: "Server Connection Time",
                        value: `${bot.ws.ping}ms`
                    },
                    {
                        name: "Database Connection Time",
                        value: `${end - start}ms`
                    }
                ]
            }
        });
    })
}