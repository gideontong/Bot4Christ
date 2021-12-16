const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('passage')
    .setDescription('Get a passage from the Bible (max 20 verses)')
    .addStringOption(option =>
      option.setName('start-book')
        .setDescription('Book of the Bible to start with')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('start-chapter')
        .setDescription('Chapter of the Bible to start with')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('start-verse')
        .setDescription('Verse of the Bible to start with')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('end-book')
        .setDescription('Book of the Bible to end with')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('end-chapter')
        .setDescription('Chapter of the Bible to end with')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('end-verse')
        .setDescription('Verse of the Bible to end with')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('version')
        .setDescription('Bible version or language (default is KJV)')
        .setRequired(true)
    ),
  async execute(interaction) {
  },
}