const { MessageEmbed } = require('discord.js');
const humanize = require('humanize-duration');
const logger = require('log4js').getLogger('bot');

const { sendToChannel } = require('../lib/DiscordInteractions');
const { loggingChannel } = require('../config/config.json');

const colors = 0xFFFFFF;

module.exports = async (guild) => {
  try {
    logger.info(`Left guild ${guild.name}`);

    const client = guild.client;

    const timeDifference = new Date() - guild.joinedAt;
    const joinedTime = humanize(timeDifference, {
      largest: 2,
      round: true
    });

    const embed = new MessageEmbed()
      .setTitle(`Left server: ${guild.name}`)
      .setColor(Math.floor(Math.random() * colors))
      .addField('Users Lost', guild.memberCount.toString(), true)
      .setFooter(`In server for ${joinedTime}`);

    sendToChannel(client, loggingChannel, {
      embeds: [embed]
    });
  } catch (err) {
    logger.error(err);
  }
}