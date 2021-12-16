// NOTE: The list of supported events is hardcoded to prevent
// path traversal and other string attacks.
const supportedEvents = [
  'guildCreate',
  'interactionCreate'
];

const reqEvent = (event) => require(`./events/${event}`);

module.exports = (client) => {
  for (const event of supportedEvents) {
    client.on(event, reqEvent(event));
  }
};