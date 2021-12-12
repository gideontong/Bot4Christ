const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const { availableVersions, files } = require('../config/bible/config.json');

const colors = 0xFFFFFF;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('versions')
    .setDescription('See a list of available versions')
    .addStringOption(option =>
      option.setName('version')
        .setDescription('Bible version or language')
        .setRequired(false)
    ),
  async execute(interaction) {
    let query = interaction.options.getString('version');
    const color = Math.floor(Math.random() * colors);

    if (query) {
      query = query.toUpperCase();

      if (!(query in availableVersions)) {
        interaction.reply({
          content: 'That isn\'t a valid Bible version!',
          ephemeral: true
        });
        return;
      }

      const embed = new MessageEmbed()
        .setTitle(`About the ${query}`)
        .setColor(color);

      interaction.reply({
        embeds: [embed]
      });
      return;
    }

    const versions = Object.keys(availableVersions);
    const embed = new MessageEmbed()
      .setTitle('Available Versions')
      .setColor(color)
      .setDescription(versions.join(', '))
      .setFooter('Use /version CODE to find out more about a specific version.');

    interaction.reply({
      embeds: [embed]
    });
  },
};