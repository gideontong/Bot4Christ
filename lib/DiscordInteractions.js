const logger = require('log4js').getLogger('bot');

module.exports = {
  /**
   * @function sendToChannel
   * @param {Client} client Discord.js client object
   * @param {String} channel Discord channel Snowflake resolvable by client
   * @param {MessageOptions} data The data to be sent
   */
  sendToChannel: function (client, channel, data) {
    client.channels.fetch(channel)
      .then((channel) => {
        channel.send(data);
      })
      .catch((err) => logger.error(err));
  }
};