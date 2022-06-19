const {matchesInDBSchema} = require('../../../helpers/').structural.db;

describe('entity Orders structural tests', () => {
  test('entity Orders has been used', async () => {
    await matchesInDBSchema(/entity[\s]+Orders[\s]+/gm);
  });

  test('Association to has been used', async () => {
    await matchesInDBSchema(/entity[\s]+Orders[^]+Association/gm);
  });

  test('managed has been used', async () => {
    await matchesInDBSchema(/entity[\s]+Orders[^]+managed/gm);
  });

  test('cuid has been used', async () => {
    await matchesInDBSchema(/entity[\s]+Orders[^]+cuid/gm);
  });
});
