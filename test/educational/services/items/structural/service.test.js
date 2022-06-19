const {matchesInService} = require('../../../../helpers/').structural.service;

const servicePath = __dirname + '/../../../../../srv/items/service.cds';

describe('Items Service structural tests', () => {
  test('service ItemsService { ... } has been used', async () => {
    const serviceItemsRegex = /service[\s]+ItemsService[\s]+/g;
    await matchesInService(servicePath, serviceItemsRegex);
  });

  test('entity Items as projection on has been used', async () => {
    const projectionRegex = /entity[\s]+Items[\s]+as[\s]+projection[\s]+/g;
    await matchesInService(servicePath, projectionRegex);
  });
});
