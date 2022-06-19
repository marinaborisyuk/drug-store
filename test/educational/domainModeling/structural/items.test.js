const {matchesInDBSchema} = require('../../../helpers/').structural.db;

describe('entity Items structural tests', () => {
  test('entity Items has been used', async () => {
    await matchesInDBSchema(/entity[\s]+Items[\s]+/gm);
  });

  test('managed has been used', async () => {
    await matchesInDBSchema(/entity[\s]+Items[^]+managed/gm);
  });

  test('cuid has been used', async () => {
    await matchesInDBSchema(/entity[\s]+Items[^]+cuid/gm);
  });
});
