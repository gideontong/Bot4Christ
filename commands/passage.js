const { SlashCommandBuilder } = require('@discordjs/builders');

const { parseBook } = require('../lib/Bible');
const { availableVersions, files, books } = require('../config/bible/config.json');

const defaultVersion = 'KJV';
const maxVerses = 20;

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
    // Get all the variables and parse them
    let startBook = interaction.options.getString('start-book');
    startBook = parseBook(`${startBook} 1:1`);

    const startChapter = interaction.options.getString('start-chapter');
    const startVerse = interaction.options.getString('start-verse');

    let endBook = interaction.options.getString('end-book');
    endBook = parseBook(`${endBook} 1:1`);

    const endChapter = interaction.options.getString('end-chapter');
    const endVerse = interaction.options.getString('end-verse');

    // Verify the version is valid and get the Bible file
    let version = interaction.options.getString('version');
    if (!version) {
      version = defaultVersion;
    } else {
      version = version.toUpperCase();

      if (!(version in files)) {
        version = defaultVersion;
      }
    }
    const versionFile = files[version];

    if (startBook.length == 0 || endBook.length == 0
      || !(startBook in books) || !(endBook in books)) {
        await interaction.reply({
          content: 'Your start and end books need to be valid books of the Bible!',
          ephemeral: true
        });
        return;
      }
    
    // TODO: Check if end book comes after start book

    const { meta, bible } = require(`../config/bible/versions/${versionFile}.json`);
    
    version = meta.version;
    let book = startBook;
    let chapter = startChapter;
    let verse = startVerse;

    let verses = new Array();

    while (verses.length <= maxVerses
      && (book != endBook
        || chapter != endChapter
        || verse != endVerse)) {
          let bookName = books[book][version];

          // TODO: Push each verse into the array
        }

    // TODO: Check that the length is less than 20 verses long
  },
}