const { links, prefix, messageIcons } = require('../config/config.json');
const versions = require('../config/meta/bible.json');
const counts = require('../config/meta/counts.json');

const { MessageEmbed } = require('discord.js');
const log = require('log4js').getLogger('church');

module.exports = async (bot, msg, args) => {
    const errorNotVerse = new MessageEmbed()
        .setTitle('Not a Bible verse?')
        .setDescription(`That is positively not a Bible verse, dude... if you think it's a Bible verse and Gideon messed up, please contact [Gideon Tong](${links.contact}) or let me know [here](${links.bugReport}) with a GitHub account.`)
        .setFooter(`${bot.user.username}'s Bible Reader`)
        .setColor(0xe91e63);
    let bibleData;
    try {
        bibleData = parseVerse(args);
    } catch (err) {
        log.error(`Trying to parse ${args} but got ${err}`);
    }
    if (!bibleData) {
        msg.channel.send(errorNotVerse);
        return;
    }
    const { meta, bible } = require(`../config/bibles/${versions['versionmap'][bibleData[0]]}`);
    let chapterName;
    errorNotVerse.setDescription(`I couldn't find the chapter you were looking for, so if you requested a meme Bible version or a book from the apocrypha the version might not have the book. Contact [Gideon Tong](${links.contact}) if you think there's an issue.`)
        .setThumbnail(messageIcons.sad[Math.floor(Math.random() * messageIcons.sad.length)]);
    try {
        chapterName = versions['bookmap'][bibleData[1][0]][meta.version];
    } catch (err) {
        msg.channel.send(errorNotVerse);
        log.error(err);
        return;
    }
    if (!chapterName) {
        msg.channel.send(errorNotVerse);
        return;
    }
    // TODO: add verse range support
    const verse = new MessageEmbed()
        .setAuthor(`${meta.version} Bible`, 'https://img.icons8.com/plasticine/100/000000/holy-bible.png')
        .setTitle(`${chapterName} ${bibleData[1][1]}:${bibleData[1][2]}`)
        .setDescription(bible[chapterName][bibleData[1][1]][bibleData[1][2]])
        .setFooter(`${bot.user.username}'s Bible Reader, see copyright with ${prefix}copyright ${meta.version}`)
        .setColor(0xffeb3b);
    if (bibleData[3]['outOfBoundsVerse']) {
        verse.addField('⚠ Warning', "The verse or passage you are looking for doesn't exist, so I gave you the last verse from the chapter instead!", false);
    }
    msg.channel.send(verse);
}

/**
 * Returns [version, StartReference, EndReference] with Reference as [Book, Chapter, Verse]
 * If invalid query, returns false
 * @param {str or array[str]} query 
 */
function parseVerse(query) {
    if (typeof query == 'string') {
        query = query.split(' ');
    } else if (!Array.isArray(query)) {
        return false;
    }
    let possibleVersion = query[query.length - 1].toUpperCase();
    let bibleData = ['KJV'];
    let errors = {
        outOfBoundsVerse: false
    }
    if (versions.availableVersions.includes(possibleVersion)) {
        bibleData = [possibleVersion];
        query.pop();
    }
    if (query.includes('-')) {
        let splitLocation = query.findIndex('-');
        let left = parseSingleVerse(query.slice(0, splitLocation));
        let right = parseSingleVerse(query.slice(splitLocation + 1));
        if (left) {
            bibleData[1] = left[0];
            if (right) {
                bibleData[2] = right[0];
            } else {
                bibleData[2] = left[0];
            }
        } else if (right) {
            bibleData[1] = right[0];
            bibleData[2] = right[0];
        } else {
            return false;
        }
    } else {
        let verse = parseSingleVerse(query);
        if (verse) {
            bibleData[1] = verse[0];
            bibleData[2] = verse[0];
            errors.outOfBoundsVerse = verse[1];
        } else {
            return false;
        }
    }
    bibleData.push(errors);
    return bibleData;
}

/**
 * Figures out the reference for a single verse
 * @param {array[str]} query 
 */
function parseSingleVerse(query) {
    let verse = [];
    if (query.length < 2 || query.length > 5) return false;
    if (query.length > 3) {
        query[0] = query.shift() + ' ' + query.shift() + ' ' + query[0];
    }
    // Combine possible book name into one element
    if (query.length == 3 && !(parseInt(query[1]) && parseInt(query[2]))) {
        let possibleNumber = parseInt(query.shift());
        if (possibleNumber) query[0] = possibleNumber + ' ' + query[0];
    }
    // Force potential book name to correct capitalization
    let lowercaseBook = query[0].toLowerCase().split(' ');
    for (var i = 0; i < lowercaseBook.length; i++) {
        if (lowercaseBook[i] == 'of') continue;
        lowercaseBook[i] = lowercaseBook[i].charAt(0).toUpperCase() + lowercaseBook[i].substring(1);
    }
    query[0] = lowercaseBook.join(' ');
    // Check if book exists
    if (Object.keys(counts).includes(query[0])) {
        verse[0] = query[0];
    } else {
        return false;
    }
    // Check if verse exists
    let outOfBoundsVerse = false;
    if (query.length == 2 && query[1].includes(':')) {
        let bibleCode = query[1].split(':');
        let bibleChapter = parseInt(bibleCode[0]);
        let bibleVerse = parseInt(bibleCode[1]);
        if (!bibleChapter || bibleChapter > Object.keys(counts[verse[0]]).length) return false;
        if (!bibleVerse) return false;
        else if (bibleVerse > counts[verse[0]][bibleChapter]) {
            outOfBoundsVerse = true;
            bibleVerse = counts[verse[0]][bibleChapter];
        }
        verse[1] = bibleChapter;
        verse[2] = bibleVerse;
    }
    return [verse, outOfBoundsVerse];
}