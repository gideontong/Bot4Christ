const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies to you if I am online!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};