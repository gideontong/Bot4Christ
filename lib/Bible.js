const { availableVersions } = require('../config/meta/bible.json');
const versions = require('../config/meta/bible.json');
const counts = require('../config/meta/counts.json');

const { MessageEmbed } = require('discord.js');
const seedrandom = require('seedrandom');
const bcv_parser = require("bible-passage-reference-parser/js/en_bcv_parser").bcv_parser;
const log = require('log4js').getLogger('church');

class Bible {
    /**
     * Builds a Discord.MessageEmbed and returns it with correct sizing. Currently supports up to 5 verses
     * Returns the verse of the day if no query is passed
     * @param {string} query String with default query
     */
    static buildEmbed(query = '') {
        if (query) {
            let references = Bible.query(query);
        } else {
        }
    }

    /**
     * Returns data from Bible.parse(), or false if error
     * @param {string} query String with default query
     */
    static query(query) {
        if (typeof query == 'string') {
            let potentialVersion = query.split(' ').pop().toUpperCase();
            if (availableVersions.includes(potentialVersion)) { 
                return Bible.parse(query.substring(0, query.length - potentialVersion.length - 1));
            } else {
                return Bible.parse(query);
            }
        } else {
            return false;
        }
    }

    // TODO
    /**
     * Returns an OSIS reference in [[BCV]] format as in [Book, Chapter, Verse]
     * Returns up to 256 references for future use, but Bible.buildEmbed() will truncate
     * past 5 refrences
     * @param {string} query String with no potential versions
     */
    static parse(query, version = 'KJV') {
        let bcv = new bcv_parser;
        let osis = bcv.parse(query).osis();
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
        const { meta, bible } = require(`../config/bibles/${versions['versionmap'][version]}`);
        let bookName;
        try {
            bookName = versions['bookmap'][book][meta.version];
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
        return Bible.getVerse(book, chapter, verse, version);
    }

    /**
     * Returns the verse of the day in [book, chapter, verse] by using the
     * current date and PRNG
     */
    static getDailyVerseReference() {
        const day = new Date();
        const seed = day.getFullYear() + ' ' +  day.getMonth() + ' ' +  day.getDate();
        const books = Object.keys(counts);
        const book = books[Math.floor(seedrandom(seed + 'b')() * books.length)];
        const chapter = Math.floor(seedrandom(seed + 'c')() * Object.keys(counts[book]).length) + 1;
        const verse = Math.floor(seedrandom(seed + 'v')() * counts[book][chapter]);
        return [book, chapter, verse];
    }
}

module.exports = Bible;