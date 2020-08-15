const { availableVersions } = require('../config/meta/bible.json');
const versions = require('../config/meta/bible.json');
const counts = require('../config/meta/counts.json');

const seedrandom = require('seedrandom');
const log = require('log4js').getLogger('church');

class Bible {
    /**
     * Returns data from parseQuery
     * @param {str} query String with default query
     */
    static query(query) {
        if (typeof query == 'string') {
            return Bible.parse(query.split(' '));
        } else {
            return false;
        }
    }

    /**
     * Returns [version, StartReference, EndReference] with Reference as
     * [Book, Chapter, Verse]
     * 
     * If invalid query, returns false
     * @param {Array<string>} query Array with query of strings
     */
    static parse(query) {
    }

    /**
     * Queries a single verse, as passed from Bible.parse()
     * @param {Array<string>} query Array with query of strings
     */
    static parseSingle(query) {
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