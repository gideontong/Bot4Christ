const thumbnails = [
    "https://media1.giphy.com/media/4NcULQmzWs06DBBJEF/giphy.gif"
]

const thumbnailsT = [
    "https://cultofthepartyparrot.com/parrots/hd/sleepingparrot.gif",
    "https://cultofthepartyparrot.com/parrots/bananaparrot.gif",
    "https://emojis.slackmojis.com/emojis/images/1584726180/8270/blob-dance.gif",
    "https://emojis.slackmojis.com/emojis/images/1450458551/184/nyancat_big.gif",
    "https://emojis.slackmojis.com/emojis/images/1479081197/1368/vaporeon.gif",
    "https://emojis.slackmojis.com/emojis/images/1492722351/2072/haha.gif",
    "https://emoji.gg/assets/emoji/bongocat.gif",
    "https://emoji.gg/assets/emoji/6971_BongoPing.gif",
    "https://emoji.gg/assets/emoji/Pandabulous.gif",
    "https://emoji.gg/assets/emoji/4264_PandaReeRun.gif",
    "https://emoji.gg/assets/emoji/6490_discomapez.gif",
    "https://emoji.gg/assets/emoji/dittohype.gif",
    "https://emoji.gg/assets/emoji/FeelsDanceMan.gif",
    "https://emoji.gg/assets/emoji/PusheenCompute.gif",
    "https://emoji.gg/assets/emoji/2366_Loading_Pixels.gif"
]

const images = [
    "https://i.imgur.com/zFELnzL.jpg",
    "https://i.imgur.com/F7Ir6Qo.jpg",
    "https://i.imgur.com/SXgThVU.jpg",
    "https://i.imgur.com/TZ0SH5M.jpg",
    "https://i.imgur.com/mwbbUC8.jpg",
    "https://i.imgur.com/4DoSQP8.jpg",
    "https://i.imgur.com/T151fs6.jpg",
    "https://i.imgur.com/6Ybg5cO.jpg",
    "https://i.imgur.com/OIXIU97.jpg",
    "https://i.imgur.com/h22Aauv.jpg",
    "https://i.imgur.com/XZMgiLk.jpg",
    "https://i.imgur.com/5FQIR1P.jpg",
    "https://i.imgur.com/8Ivhf3k.jpg",
    "https://i.imgur.com/ff8BgDm.jpg",
    "https://i.imgur.com/z2b3zpW.jpg",
    "https://i.imgur.com/pMd5gdk.jpg",
    "https://i.imgur.com/wBeBbg1.jpg"
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
            "url": ""
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
    };
    message.embed.image.url = images[Math.floor(Math.random() * images.length)];
    message.embed.thumbnail.url = thumbnails[Math.floor(Math.random() * thumbnails.length)];
    msg.channel.send(message);
}