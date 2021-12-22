const {
  MessageActionRow,
  MessageButton,
  MessageEmbed
} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('log4js').getLogger('bot');

const { parseBook, Verse } = require('../lib/Bible');
const { availableVersions, files, books } = require('../config/bible/config.json');
const { superscripts } = require('../config/data/characters.json');

const colors = 0xFFFFFF;
const defaultVersion = 'KJV';
const maxVerses = 20;

function interpretSuperscript(str) {
  str = new String(str);
  for (const [key, value] of Object.entries(superscripts)) {
    str = str.replace(key, value);
  }
  return str;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('passage')
    .setDescription(`Get a passage from the Bible (max ${maxVerses} verses)`)
    .addStringOption(option =>
      option.setName('book')
        .setDescription('Book of the Bible')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('chapter')
        .setDescription('Chapter of the Bible')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('start-verse')
        .setDescription('Verse of the Bible to start with')
        .setRequired(true)
    )
    .addIntegerOption(option =>
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
    let book = interaction.options.getString('book');
    book = parseBook(`${book} 1:1`);

    const chapter = interaction.options.getInteger('chapter');
    const startVerse = interaction.options.getInteger('start-verse');
    const endVerse = interaction.options.getInteger('end-verse');

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

    if (book.length == 0 || !(book in books)) {
      await interaction.editReply({
        content: 'The book you choose needs to be a book of the Bible!',
        ephemeral: true
      });
      return;
    }

    // Create array of verses
    logger.info(`Looking up passage ${book} ${chapter}:${startVerse}-${endVerse} ${version}`);
    const { meta, bible } = require(`../config/bible/versions/${versionFile}`);

    book = books[book][version];

    version = meta.version;
    let verse = startVerse;
    let verseKeys = Object.keys(bible[book][chapter]);
    let verseIndex = new String(verse - 1);

    let verses = new Array();

    let verseText = bible[book][chapter][verse];
    let verseObject = new Verse(book, chapter, verse, verseText);
    verses.push(verseObject);
    while (verses.length < maxVerses && verse != endVerse) {
      verseIndex++;
      verse = verseKeys[verseIndex];
      if (verseIndex >= verseKeys.length) {
        break;
      }

      verseText = bible[book][chapter][verse];
      verseObject = new Verse(book, chapter, verse, verseText);
      verses.push(verseObject);
    }

    // Generate and send embed of verses
    let verseString = new String();
    for (let verseObject of verses) {
      verseString += interpretSuperscript(verseObject.getVerse()) + verseObject.getText() + ' ';
    }

    const appId = meta.bibleAppId ? meta.bibleAppId : '1';
    const embed = new MessageEmbed()
      .setTitle(`${book} ${chapter}:${startVerse}-${verse}`)
      .setDescription(verseString)
      .setColor(Math.floor(Math.random() * colors))
      .setFooter(meta.fullname);
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('Open in Bible App')
          .setURL(`https://bible.com/bible/${appId}/${book}.${chapter}.${startVerse}-${verse}`)
          .setStyle('LINK'),
      );

    if (endVerse - startVerse + 1 > maxVerses) {
      embed.addField('Warning', `You cannot request more than ${maxVerses} verses at a time.`);
    }

    await interaction.editReply({
      embeds: [embed],
      components: [row]
    });
  },
}