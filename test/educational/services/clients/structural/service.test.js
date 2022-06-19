const {matchesInService} = require('../../../../helpers/').structural.service;

const servicePath = __dirname + '/../../../../../srv/clients/service.cds';

describe('Client Service structural tests', () => {
  test('service ClientsService { ... } has been used', async () => {
    const serviceClientsRegex = /service[\s]+ClientsService[\s]+/g;
    await matchesInService(servicePath, serviceClientsRegex);
  });

  test('entity Clients as projection on has been used', async () => {
    const projectionRegex = /entity[\s]+Clients[\s]+as[\s]+projection[\s]+/g;
    await matchesInService(servicePath, projectionRegex);
  });
});
