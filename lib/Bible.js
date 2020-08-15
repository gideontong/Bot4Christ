const seedrandom = require('seedrandom');

class Bible {
    static verseToday() {
        const day = new Date();
        const random = seedrandom(day.getFullYear() + ' ' +  day.getMonth() + ' ' +  day.getDate());
        return random();
    }
}

module.exports = Bible;