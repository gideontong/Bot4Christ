const MAX_VERSES = 32;

const { prefix } = require('../config/config.json');
const { availableVersions, versionmap, bookmap } = require('../config/meta/bible.json');
const counts = require('../config/meta/counts.json');

const { MessageEmbed } = require('discord.js');
const seedrandom = require('seedrandom');
const bcv_parser = require("bible-passage-reference-parser/js/en_bcv_parser").bcv_parser;
const log = require('log4js').getLogger('church');

class Bible {
    /**
     * Builds a Discord.MessageEmbed and returns it with correct sizing. Currently supports up to 5 verses
     * Returns the verse of the day if no query is passed or daily is true
     * @param {Client} bot Disord.Client information
     * @param {string} query String with default query
     * @param {boolean} daily Whether or not this is a verse of the day
     */
    static buildEmbed(bot, query = '', daily = false) {
        /**
         * You might notice that currently this function doesn't use Bible.getVerse(). This is
         * because not using it actually results in an faster, optimized runtime
         */
        const verseEmbed = new MessageEmbed()
            .setAuthor(`KJV Bible`, 'https://img.icons8.com/plasticine/100/000000/holy-bible.png')
            .setDescription("Hey! If you're seeing this message, something went wrong. Try again?")
            .setColor(0xffeb3b);
        if (query && !daily) {
            let [references, version] = Bible.query(query);
            if (references.length == 0) return false;
            const { meta, bible } = require(`../config/bibles/${versionmap[version]}`);
            verseEmbed
                .setAuthor(`${meta.version} Bible`, 'https://img.icons8.com/plasticine/100/000000/holy-bible.png')
                .setFooter(`${bot.user.username}'s Bible Reader, see copyright with ${prefix}copyright ${meta.version}`);
            if (references.length == 1) {
                references[0][0] = Bible.getName(references[0][0], meta.version);
                verseEmbed
                    .setTitle(`${references[0][0]} ${references[0][1]}:${references[0][2]}`)
                    .setDescription(bible[references[0][0]][references[0][1]][references[0][2]]);
            } else {
                verseEmbed.setTitle(`Multiple Verse/Passage Query of ${meta.version}`);
                let verseLength = references.length;
                if (verseLength > 5) {
                    verseLength = 5;
                    verseEmbed.setDescription("You requested more than 5 verses, so I'm showing you the first 5 here instead.");
                } else {
                    verseEmbed.setDescription("Here are the verses you requested:");
                }
                for (let i = 0; i < verseLength; i++) {
                    references[i][0] = Bible.getName(references[i][0], meta.version);
                    verseEmbed.addField(
                        `${references[i][0]} ${references[i][1]}:${references[i][2]}`,
                        bible[references[i][0]][references[i][1]][references[i][2]],
                        false
                    );
                }
            }
        } else {
            let version = query.toUpperCase();
            if (availableVersions.includes(version)) {
                let [book, chapter, verse, text] = Bible.getDailyVerse(version);
                verseEmbed
                    .setTitle(`Verse of the Day: ${book} ${chapter}:${verse}`)
                    .setDescription(text);
            } else {
                version = 'KJV';
                let [book, chapter, verse, text] = Bible.getDailyVerse();
                verseEmbed
                    .setTitle(`Verse of the Day: ${book} ${chapter}:${verse}`)
                    .setDescription(text);
            }
            verseEmbed
                .setAuthor(`${version} Bible`, 'https://img.icons8.com/plasticine/100/000000/holy-bible.png')
                .setFooter(`${bot.user.username}'s Bible Reader, see copyright with ${prefix}copyright ${version}`);
        }
        return verseEmbed;
    }

    /**
     * Returns version-specific book name
     * @param {string} book Name of book
     * @param {string} version Name of version
     */
    static getName(book, version = 'KJV') {
        return bookmap[book][version];
    }

    /**
     * Returns data from Bible.parse(), or false if error
     * @param {string} query String with default query
     */
    static query(query) {
        if (typeof query == 'string') {
            let potentialVersion = query.split(' ').pop().toUpperCase();
            if (availableVersions.includes(potentialVersion)) {
                return [Bible.parse(query.substring(0, query.length - potentialVersion.length - 1)), potentialVersion];
            } else {
                return [Bible.parse(query), 'KJV'];
            }
        } else {
            return false;
        }
    }

    /**
     * Returns an OSIS reference in [[BCV]] format as in [Book, Chapter, Verse]
     * Returns up to MAX_VERSES references for future use, but Bible.buildEmbed() will truncate
     * past 5 refrences
     * @param {string} query String with no potential versions
     */
    static parse(query) {
        let references = [];
        let bcv = new bcv_parser;
        let osis = bcv.parse(query).osis();
        let referenceRanges = osis.split(',');
        for (let range of referenceRanges) {
            if (range.includes('-')) {
                let referenceRange = range.split('-');
                let startReference = referenceRange[0].split('.');
                let endReference = referenceRange[1].split('.');
                if (startReference.length != endReference.length) return;
                Bible.addReferenceRange(references, startReference, endReference);
            } else {
                let reference = range.split('.');
                let nextReference;
                switch (reference.length) {
                    case 1:
                        nextReference = [reference[0], 0, 0];
                        Bible.addReferenceRange(references, nextReference, nextReference);
                        break;
                    case 2:
                        nextReference = [reference[0], reference[1], 0];
                        Bible.addReferenceRange(references, nextReference, nextReference);
                        break;
                    case 3:
                        references.push(reference);
                        break;
                    default:
                        log.warn(`Got an invalid number of arguments in a Bible verse! Query was ${query}`);
                        break;
                }
            }
            if (references.length > MAX_VERSES) {
                return references.slice(0, MAX_VERSES);
            }
        }
        return references;
    }

    /**
     * Modifies a references array in-place as helper to Bible.parse() in order
     * to add ranges of Bible verses. Set unknown BCV values to 0 for chapter
     * or verse to add the complete range
     * @param {Array<string>} references current list of references
     * @param {Array<string>} start beginning [BCV] reference to add
     * @param {Array<string>} end ending [BCV] reference to add
     */
    static addReferenceRange(references, start, end) {
        if (references.length > MAX_VERSES) {
            return;
        }
        start = [start[0], parseInt(start[1]), parseInt(start[2])];
        end = [end[0], parseInt(end[1]), parseInt(end[2])];
        // Start and end in the same book
        if (start[0] == end[0]) {
            // Start and end in the same chapter
            if (start[1] == end[1] && start[1] > 0) {
                let startVerse = start[2] == 0 ? 1 : start[2];
                let endVerse = end[2] == 0 ? counts[start[0]][start[1]] : end[2];
                for (let i = startVerse; i <= endVerse && references.length <= MAX_VERSES; i++) {
                    references.push([start[0], start[1], i]);
                }
            } else {
                if (start[1] == 0) {
                    log.warn(`${counts} ${start[0]} ${counts[start[0]]}`)
                    let chapters = Object.keys(counts[start[0]]).length;
                    for (let i = 1; i <= chapters && references.length <= MAX_VERSES; i++) {
                        let nextReference = [start[0], i, 0];
                        Bible.addReferenceRange(references, nextReference, nextReference);
                    }
                } else {
                    let chapterEndian = counts[start[0]][start[1]];
                    Bible.addReferenceRange(references, start, [start[0], start[1], chapterEndian]);
                    for (let i = start[1] + 1; i < end[1] && references.length <= MAX_VERSES; i++) {
                        let nextReference = [start[0], i, 0];
                        Bible.addReferenceRange(references, nextReference, nextReference);
                    }
                    Bible.addReferenceRange(references, [end[0], end[1], 1], end);
                }
            }
        } else {
            let bibleBooks = Object.keys(counts);
            let startBook = bibleBooks.indexOf(start[0]);
            let endBook = bibleBooks.indexOf(end[0]);
            if (startBook < 0 || endBook < 0) return;
            let firstChapterEndian = Object.keys(counts[start[0]]).length;
            Bible.addReferenceRange(references, start, [start[0], firstChapterEndian, counts[start[0]][firstChapterEndian]]);
            for (let i = startBook + 1; i < endBook && references.length <= MAX_VERSES; i++) {
                let nextReference = [bibleBooks[i], 0, 0];
                Bible.addReferenceRange(references, nextReference, nextReference);
            }
            Bible.addReferenceRange(references, [end[0], 1, 1], end);
        }
    }

    /**
     * Returns [string, boolean] with string as the verse and boolean is true on
     * success. Returns string as the error and boolean as false on failure.
     * @param {string} book A book from the Bible
     * @param {string} chapter A chapter from the book of the Bible
     * @param {string} verse A verse from the chapter of the book of the Bible
     * @param {string} version A version of the Bible, default KJV
     */
    static getVerse(book, chapter, verse, version = 'KJV') {
        if (!availableVersions.includes(version)) {
            return [`${version} is either not a version or I don't support it yet!`, false];
        }
        const { meta, bible } = require(`../config/bibles/${versionmap[version]}`);
        let bookName;
        try {
            bookName = bookmap[book][meta.version];
        } catch (err) {
            log.error(`Tried to set a book name in Bible.getVerse but got ${err}`);
            return [`I couldn't find ${book} in the ${version}!`, false];
        }
        if (!bookName || !bible[bookName][chapter]) {
            return [`I couldn't find ${book} ${chapter} in the ${version}!`, false];
        }
        try {
            const verseData = bible[book][chapter][verse];
            return [verseData, true];
        } catch (err) {
            return [`I couldn't find ${book} ${chapter}:${verse} in the ${version}!`, false];
        }
    }

    /**
     * Returns the verse of the day
     * @param {string} version A version of the Bible, default KJV
     */
    static getDailyVerse(version = 'KJV') {
        const [book, chapter, verse] = Bible.getDailyVerseReference();
        return [book, chapter, verse, Bible.getVerse(book, chapter, verse, version)];
    }

    /**
     * Returns the verse of the day in [book, chapter, verse] by using the
     * current date and PRNG
     */
    static getDailyVerseReference() {
        const day = new Date();
        const seed = day.getFullYear() + ' ' + day.getMonth() + ' ' + day.getDate();
        const books = Object.keys(counts);
        const book = books[Math.floor(seedrandom(seed + 'b')() * books.length)];
        const chapter = Math.floor(seedrandom(seed + 'c')() * Object.keys(counts[book]).length) + 1;
        const verse = Math.floor(seedrandom(seed + 'v')() * counts[book][chapter]);
        return [book, chapter, verse];
    }
}

module.exports = Bible;