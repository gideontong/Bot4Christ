const referenceParser = require('bible-passage-reference-parser/js/en_bcv_parser').bcv_parser;

module.exports = {
  /**
   * @function parseBook Parse a name of a book in the Bible
   * @param {String} book Name of the book to parse
   * @returns {String} OSIS book key
   */
  parseBook: function (book) {
    let parser = new referenceParser;
    let osis = parser.parse(`${book} 1:1`).osis();
    let reference = osis.split('.');
    if (reference.length > 0) {
      return reference[0];
    }
    return undefined;
  },
}