const {RegexSearcher} = require('@zkud/fs-find').regex;

const appPath = __dirname + '/../../../app';
const cdsFile = /(.)+\.cds/;
const searcher = new RegexSearcher();

/**
 * Asserts that the given pattern matches the db schema
 * @param {string} pattern
 */
async function matchesInAppAnnotations(pattern) {
  expect(await searcher.testMatches(appPath, cdsFile, pattern)).toBeTruthy();
}

module.exports = {
  matchesInAppAnnotations,
};
