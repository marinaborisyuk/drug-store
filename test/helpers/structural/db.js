const {RegexSearcher} = require('@zkud/fs-find').regex;

const dbPath = __dirname + '/../../../db';
const cdsFile = /(.)+\.cds/;
const searcher = new RegexSearcher();

/**
 * Asserts that the given pattern matches the db schema
 * @param {string} pattern
 */
async function matchesInDBSchema(pattern) {
  expect(await searcher.testMatches(dbPath, cdsFile, pattern)).toBeTruthy();
}

module.exports = {
  matchesInDBSchema,
};
