// Dependencies
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const log4js = require('log4js');

// Configuration
const { clientId, token } = require('./config/secrets.json');
const loggingConfig = require('./config/logging.json');

log4js.configure(loggingConfig);
const logger = log4js.getLogger('deploy');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => logger.info('Successfully registered application commands.'))
  .catch(logger.error);