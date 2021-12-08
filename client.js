// Dependencies
const { Client, Intents } = require('discord.js');
const log4js = require('log4js');

// Configuration
const { token } = require('./config/secrets.json');

// Global Configuration
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const logger = log4js.getLogger('bot');

client.once('ready', () => {
	logger.info(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

client.login(token);