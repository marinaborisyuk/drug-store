const {matchesInDBSchema} = require('../../../helpers/').structural.db;

describe('entity Clients structural tests', () => {
  test('entity Clients has been used', async () => {
    await matchesInDBSchema(/entity[\s]+Clients[\s]+/gm);
  });

  test('managed has been used', async () => {
    await matchesInDBSchema(/entity[\s]+Clients[^]+managed/gm);
  });

  test('cuid has been used', async () => {
    await matchesInDBSchema(/entity[\s]+Clients[^]+cuid/gm);
  });
});
