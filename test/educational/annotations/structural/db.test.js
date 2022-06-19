const {matchesInDBSchema} = require('../../../helpers/').structural.db;

describe('Annotations structural tests', () => {
  test('@mandatory has been used', async () => {
    await matchesInDBSchema(/@mandatory/gm);
  });

  test('@assert.range has been used', async () => {
    await matchesInDBSchema(/@assert.range/gm);
  });

  test('@assert.integrity has been used', async () => {
    await matchesInDBSchema(/@assert.integrity/gm);
  });

  test('@assert.format has been used', async () => {
    await matchesInDBSchema(/@assert.format/gm);
  });
});
