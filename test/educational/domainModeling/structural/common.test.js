const {matchesInDBSchema} = require('../../../helpers/').structural.db;

describe('Common functionality structural tests', () => {
  test('type Phone has been used', async () => {
    await matchesInDBSchema(/type[\s]+Phone[\s]+/gm);
  });

  test('type Price : {...} has been used', async () => {
    await matchesInDBSchema(/type[\s]+Price[\s]*:[\s]*{[^]+}/gm);
  });

  test('type Currency : String enum has been used', async () => {
    await matchesInDBSchema(/type[\s]+Currency[\s]*:[\s]*String[\s]+enum/gm);
  });
});

