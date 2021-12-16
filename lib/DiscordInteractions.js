const logger = require('log4js').getLogger('bot');

module.exports = {
  /**
   * @function sendToChannel Send a message in a channel
   * @param {Client} client Discord.js client object
   * @param {String} channel Discord channel Snowflake resolvable by client
   * @param {MessageOptions} data The data to be sent
   * @returns {undefined} Nothing
   */
  sendToChannel: function (client, channel, data) {
    client.channels.fetch(channel)
      .then((channel) => {
        channel.send(data);
      })
      .catch((err) => logger.error(err));
  }
};