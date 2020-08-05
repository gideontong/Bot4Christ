const thumbnails = [
    "https://cultofthepartyparrot.com/parrots/hd/sleepingparrot.gif",
    "https://cultofthepartyparrot.com/parrots/bananaparrot.gif",
    "https://cultofthepartyparrot.com/flags/hd/unitedstatesofamericaparrot.gif",
    "https://emojis.slackmojis.com/emojis/images/1584726180/8270/blob-dance.gif",
    "https://emojis.slackmojis.com/emojis/images/1450458551/184/nyancat_big.gif",
    "https://emojis.slackmojis.com/emojis/images/1479081197/1368/vaporeon.gif",
    "https://emojis.slackmojis.com/emojis/images/1492722351/2072/haha.gif",
    "https://emoji.gg/assets/emoji/bongocat.gif",
    "https://emoji.gg/assets/emoji/6971_BongoPing.gif",
    "https://emoji.gg/assets/emoji/Pandabulous.gif",
    "https://emoji.gg/assets/emoji/6490_discomapez.gif",
    "https://emoji.gg/assets/emoji/dittohype.gif",
    "https://emoji.gg/assets/emoji/2366_Loading_Pixels.gif"
]

let message = {
    content: "*So you want to know who made this bot?*",
    embed: {
        "description": "Hey! I'm a **visual arts** major at [UC San Diego](https://en.wikipedia.org/wiki/University_of_California,_San_Diego) going into my second year. You can click my name to see my website.",
        "color": 16742399,
        "fields": [
            {
                "name": "Portfolio",
                "value": "Check out my portfolio [here](https://gideontong.me)! Notable projects include [Amy](https://amyhelps.ml), [Authentic](https://readauthentic.ml/), and [Platypus](https://getplatypus.ml)."
            },
            {
                "name": "Contact",
                "value": "Join [my Discord server](https://discord.gg/WUGMTcZ) or [add me on LinkedIn](https://linkedin.com/in/gideontong), or better yet, [follow me on GitHub](https://github.com/gideontong)."
            }
        ],
        "author": {
            "name": "Gideon Tong",
            "url": "https://gideontong.com",
            "icon_url": "https://cdn.discordapp.com/avatars/132525049977503744/b9504c05a5805970f9b5551bedc9131d.png"
        },
        "footer": {},
        "image": {
            "url": "https://source.unsplash.com/random/1280x720"
        },
        "thumbnail": {
            "url": ""
        }
    }
}

module.exports = async (bot, msg, args) => {
    message.embed.footer = {
        text: `${bot.user.username} v${process.env.npm_package_version}`,
        icon_url: bot.user.avatarURL
    }
    message.embed.thumbnail.url = thumbnails[Math.floor(Math.random() * thumbnails.length)]
    msg.channel.send(message);
}