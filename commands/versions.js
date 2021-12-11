const { SlashCommandBuilder } = require('@discordjs/builders');

const { availableVersions } = require('../config/bible/config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('versions')
    .setDescription('See a list of available versions'),
  async execute(interaction) {
    interaction.reply('Coming soon!');
  },
};