const fs = require('fs').promises;

/**
 * Asserts that the given pattern matches the given service
 * @param {string} servicePath
 * @param {string} pattern
 */
async function matchesInService(servicePath, pattern) {
  const serviceDeclaration = await fs.readFile(
      servicePath,
      {encoding: 'utf8'},
  );
  const matches = serviceDeclaration.match(pattern);
  expect(matches?.length).toBeGreaterThan(0);
}

module.exports = {
  matchesInService,
};
