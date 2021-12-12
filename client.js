// Dependencies
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const log4js = require('log4js');

// Configuration
const { activity } = require('./config/config.json');
const { token } = require('./config/secrets.json');
const loggingConfig = require('./config/logging.json');

// Global Configuration
log4js.configure(loggingConfig);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const logger = log4js.getLogger('bot');

// Bot Setup
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

require('./events.js')(client);

client.once('ready', () => {
  logger.info(`Logged in as ${client.user.tag}!`);

  setInterval(() => {
    const idx = Math.floor(Math.random() * activity.activities.length);
    client.user.setActivity(activity.activities[idx].text, activity.activities[idx].options);
  }, activity.updateInterval * 1000);
});

client.login(token);