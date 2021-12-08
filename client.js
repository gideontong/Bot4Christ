// Dependencies
const { Client, Intents } = require('discord.js');
const log4js = require('log4js');

// Configuration
const { token } = require('./config/secrets.json');
const loggingConfig = require('./config/logging.json');

// Global Configuration
log4js.configure(loggingConfig);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const logger = log4js.getLogger('bot');

require('./events.js')(client);

client.once('ready', () => {
	logger.info(`Logged in as ${client.user.tag}!`);
});

client.login(token);