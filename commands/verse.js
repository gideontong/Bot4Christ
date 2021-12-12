const {
  MessageActionRow,
  MessageButton,
  MessageEmbed
} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const referenceParser = require('bible-passage-reference-parser/js/en_bcv_parser').bcv_parser;
const logger = require('log4js').getLogger('bot');

const { availableVersions, files, books } = require('../config/bible/config.json');
const versionList = Object.keys(availableVersions);

const colors = 0xFFFFFF;
const defaultVesrion = 'KJV';

function parse(book) {
  let parser = new referenceParser;
  let osis = parser.parse(`${book} 1:1`).osis();
  let reference = osis.split('.');
  if (reference.length > 0) {
    return reference[0];
  }
  return undefined;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verse')
		.setDescription('Look up a single Bible verse.')
		.addStringOption(option =>
			option.setName('book')
				.setDescription('Name of the book in the Bible')
				.setRequired(true)
		)
    .addIntegerOption(option =>
      option.setName('chapter')
        .setDescription('Chapter number of the book')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('verse')
        .setDescription('Verse number of the chapter')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('version')
        .setDescription('Bible version or language (default is KJV)')
        .setRequired(false)
    ),
	async execute(interaction) {
    const book = interaction.options.getString('book');
    const parsedBook = parse(`${book} 1:1`);

    const chapter = interaction.options.getInteger('chapter');
    const chapterString = chapter.toString();
    const verse = interaction.options.getInteger('verse');
    const verseString = verse.toString();
    
    let version = interaction.options.getString('version');
    
    if (!version) {
      version = defaultVesrion;
    }
    
    version = version.toUpperCase();
    if (!versionList.includes(version)) {
      version = defaultVesrion;
    }
    
    logger.info(`Looking up Bible verse ${parsedBook} ${chapterString}:${verseString} ${version}`);
    const filename = files[version];
    const filecode = filename.split('.')[0];
    const { meta, bible } = require(`../config/bible/versions/${files[version]}`);
    
    if (book.length == 0 || !(parsedBook in books)) {
      await interaction.reply({
        content: 'That isn\'t a valid book of the Bible.',
        ephemeral: true
      });
      return;
    }

    const bookKey = books[parsedBook][filecode];

    if (!(chapterString in bible[bookKey])) {
      await interaction.reply({
        content: `That isn't a chapter of ${bookKey}!`,
        ephemeral: true
      });
      return;
    } else if (!(verseString in bible[bookKey][chapterString])) {
      await interaction.reply({
        content: `That isn't a verse in ${bookKey} ${chapterString}!`,
        ephemeral: true 
      });
      return;
    } else {
      const text = bible[bookKey][chapterString][verseString];

      const color = Math.floor(Math.random() * colors);
      const embed = new MessageEmbed()
        .setTitle(`${bookKey} ${chapterString}:${verseString}`)
        .setColor(color)
        .setDescription(text)
        .setFooter(meta.fullname);
      
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Open in Bible App')
            .setURL(`https://bible.com/bible/1/${parsedBook}.${chapterString}.${verseString}.KJV`)
            .setStyle('LINK'),
        );
      
      await interaction.reply({
        embeds: [embed],
        components: [row]
      });
      return;
    }
	},
};