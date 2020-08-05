module.exports = async (bot, msg, args) => {
    msg.channel.send('🏓 Pinging...').then((message) => {
        const start = new Date().valueOf();
        const { links } = require('../config/config.json');
        const end = new Date().valueOf();
        message.edit({
            content: "🏓 Successfully ponged!",
            embed: {
                title: `📶 ${bot.user.username} Service Availability`,
                description: `Currently running on \`us-west-01.gid.network/discord\`. Issues? Contact [Gideon Tong](${links.contact}) for help.`,
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
                    },
                ],
                footer: {
                    text: `Currently serving ${bot.users.cache.size} users!`
                },
                color: 0x18ffff
            }
        });
    })
}