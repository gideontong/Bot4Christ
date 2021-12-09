const supportedEvents = [
  'interactionCreate'
];

const reqEvent = (event) => require(`./events/${event}`);

module.exports = (client) => {
  for (const event of supportedEvents) {
    client.on(event, reqEvent(event));
  }
};