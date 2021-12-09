const { SlashCommandBuilder } = require('@discordjs/builders');

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
    ),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};