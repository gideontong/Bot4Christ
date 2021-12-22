const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const logger = require('log4js').getLogger('bot');

const colors = 0xFFFFFF;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get help and learn about Bot4Christ!')
    .addStringOption(option => 
      option.setName('command')
        .setDescription('The Bot4Christ command you need help with')
        .setRequired(false)
        .addChoice('verse', 'verse')
        .addChoice('versions', 'versions')
    ),
  async execute(interaction) {
    const query = interaction.options.getString('command');
    const color = Math.floor(Math.random() * colors);
    
    let embed = new MessageEmbed()
      .setColor(color);

    if (query) {
      embed.setTitle(`Command Help: ${query}`)

      switch (query) {
        case 'verse':
          embed.setDescription([
            'Use the verse command to find a verse in the Bible! Simply provide the book,',
            'chapter, and verse. If you want a specific version, you can provide that as well!'
          ].join(' '));
          break;
        case 'versions':
          embed.setDescription([
            'You can learn about different versions of the Bible available through Bot4Christ.'
          ].join(' '));
          break;
        default:
          embed.setDescription('Something went wrong!');
          logger.error(`On help command, user provided ${query} which was not a valid query!`);
      }

      interaction.reply({
        embeds: [embed],
        ephemeral: true
      });
      return;
    }

    embed.setTitle('About Bot4Christ')
      .setDescription([
        'Bot4Christ is a Discord bot for Christian servers that allows you to share in the Word', 
        'of God with your brothers and sisters in Christ.'
      ].join(' '))
      .addField('Commands', [
        'Use Discord Slash Commands to share in the Word! You can try commands like `/verse` or',
        '`/passage`. If you need help, try using help commands to learn more about each command.'
      ].join(' '))
      .addField('Developer', [
        'If you have any feature requests or want to get in contact with the developer, please',
        'contact Gideon Tong at gideon@gideontong.com.'
      ].join(' '));

      interaction.reply({
        embeds: [embed]
      });
  },
};