const { MessageEmbed } = require('discord.js');
const humanize = require('humanize-duration');
const logger = require('log4js').getLogger('bot');

const { sendToChannel } = require('../lib/DiscordInteractions');
const { loggingChannel } = require('../config/config.json');

const colors = 0xFFFFFF;
const nsfwLevels = {
  DEFAULT: 'NSFW Channels',
  EXPLICIT: 'All Channels',
  SAFE: 'No Channels',
  AGE_RESTRICTED: 'Kid-Friendly'
}

module.exports = async (guild) => {
  try {
    logger.info(`Joined new guild ${guild.name}`);

    const client = guild.client;
    const embed = new MessageEmbed()
      .setTitle(`Joined new server: ${guild.name}`)
      .setColor(Math.floor(Math.random() * colors));

    if (guild.available) {
      guild.fetch()
        .then((guild) => {
          const mfaRequiredString = guild.mfaLevel == 'NONE' ?
            'Required' : 'Optional';

          embed.setDescription(guild.description ? guild.description : 'No description.')
            .addField('Members', guild.memberCount.toString(), true);

          const timeDifference = new Date() - guild.createdAt;
          const creationTime = humanize(timeDifference, {
            largest: 2,
            round: true
          });

          guild.fetchOwner()
            .then((owner) => {
              let ownerString = owner.user ? owner.username : 'N/A';

              if (owner.nickname) {
                ownerString += ` (${owner.nickname})`;
              }

              embed.setAuthor(`Owner: ${ownerString}`, owner.displayAvatarURL())
                .addField('NSFW', nsfwLevels[guild.nsfwLevel], true)
                .addField('Discord MFA', mfaRequiredString, true)
                .addField('Language', guild.preferredLocale, true)
                .addField('Boosts', guild.premiumSubscriptionCount.toString(), true)
                .setFooter(`Created ${creationTime} ago`);

              sendToChannel(client, loggingChannel, {
                embeds: [embed]
              });
            })
            .catch((err) => logger.error(err));
        })
        .catch((err) => logger.error(err));
    } else {
      embed.setDescription('Cannot retrieve information about the server as it is currently offline.');

      sendToChannel(client, loggingChannel, {
        embeds: [embed]
      });
    }
  } catch (err) {
    logger.error(err);
  }
}