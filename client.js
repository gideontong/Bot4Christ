// Dependencies
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const log4js = require('log4js');

// Configuration
const { token } = require('./config/secrets.json');
const loggingConfig = require('./config/logging.json');

// Global Configuration
log4js.configure(loggingConfig);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const logger = log4js.getLogger('bot');

require('./events.js')(client);

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	logger.info(`Logged in as ${client.user.tag}!`);
});

client.login(token);