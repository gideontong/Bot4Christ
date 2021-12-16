const { MessageEmbed } = require('discord.js');
const logger = require('log4js').getLogger('bot');

const colors = 0xFFFFFF;

module.exports = async (guild) => {
  logger.info(`Left guild ${guild.name}`);

  const client = guild.client;
  const embed = new MessageEmbed()
    .setTitle(`Left server: ${guild.name}`)
    .setColor(Math.floor(Math.random() * colors));
}