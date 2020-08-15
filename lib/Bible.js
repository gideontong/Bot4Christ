const { availableVersions } = require('../config/meta/bible.json');
const counts = require('../config/meta/counts.json');

const seedrandom = require('seedrandom');

class Bible {
    // Returns the verse of the day using a deterministic (seeded) PRNG
    static verseToday() {
        const day = new Date();
        const seed = day.getFullYear() + ' ' +  day.getMonth() + ' ' +  day.getDate();
        const books = Object.keys(counts);
        const book = books[Math.floor(seedrandom(seed + 'b') * books.length)];
        const chapter = Object.toString(Math.floor(seedrandom(seed + 'c') * Object.keys(counts[book].length)) + 1);
        const verse = Object.toString(Math.floor(seedrandom(seed + 'v') * counts[book][chapter]));
        return `${book} ${chapter}:${verse}`;
    }
}

module.exports = Bible;