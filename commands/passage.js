const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('log4js').getLogger('bot');

const { parseBook, Verse } = require('../lib/Bible');
const { availableVersions, files, books } = require('../config/bible/config.json');
const { superscripts } = require('../config/data/characters.json');

const colors = 0xFFFFFF;
const defaultVersion = 'KJV';
const maxVerses = 20;

function interpretSuperscript(str) {
  for (const [key, value] of Object.entries(superscripts)) {
    str.replace(key, value);
  }
  return str;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('passage')
    .setDescription(`Get a passage from the Bible (max ${maxVerses} verses)`)
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
        .setRequired(false)
    ),
  async execute(interaction) {
    await interaction.deferReply();

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
    version = versionFile.split('.')[0];

    if (startBook.length == 0 || endBook.length == 0
      || !(startBook in books) || !(endBook in books)) {
      await interaction.editReply({
        content: 'Your start and end books need to be valid books of the Bible!',
        ephemeral: true
      });
      return;
    }

    // TODO: Check if end book comes after start book

    // Create array of verses
    logger.info(`Looking up passage ${startBook} ${startChapter}:${startVerse} - ${endBook} ${endChapter}:${endVerse} ${version}`);
    const { meta, bible } = require(`../config/bible/versions/${versionFile}`);

    startBook = books[startBook][version];
    endBook = books[endBook][version];

    version = meta.version;
    let book = startBook;
    let bookNames = Object.keys(bible);
    let bookIndex = bookNames.indexOf(book);
    let chapter = startChapter;
    let chapterKeys = Object.keys(bible[book]);
    let chapterIndex = chapterKeys.indexOf(chapter);
    let verse = startVerse;
    let verseKeys = Object.keys(bible[book][chapter]);
    let verseIndex = verseKeys.indexOf(verse);

    let verses = new Array();

    let verseText = bible[book][chapter][verse];
    let verseObject = new Verse(book, chapter, verse, verseText);
    verses.push(verseObject);
    do {

      verseIndex++;
      if (verseIndex >= verseKeys.length) {
        verseIndex = 0;
        chapterIndex++;
      }

      if (chapterIndex >= chapterKeys.length) {
        chapterIndex = 0;
        bookIndex++;
      }

      book = bookNames[bookIndex];
      chapterKeys = Object.keys(bible[book]);
      chapter = chapterKeys[chapterIndex];
      verseKeys = Object.keys(bible[book][chapter]);
      verse = verseKeys[verseIndex];

      verseText = bible[book][chapter][verse];
      verseObject = new Verse(book, chapter, verse, verseText);
      verses.push(verseObject);
    } while (verses.length <= maxVerses && !(book == endBook && chapter == endChapter && verse == endVerse));

    // TODO: Generate paginated embed of verses
    // Generate and send embed of verses
    let verseString = new String();
    for (let verseObject of verses) {
      verseString += interpretSuperscript(verseObject.getVerse()) + verseObject.getText() + ' ';
    }

    const embed = new MessageEmbed()
      .setTitle(`${startBook} ${startChapter}:${startVerse} - ${book} ${chapter}:${verse}`)
      .setColor(Math.floor(Math.random() * colors))
      .setFooter(meta.fullname);


    await interaction.editReply({
      embeds: [embed]
    });
  },
}