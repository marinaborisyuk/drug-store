const {ServiceMock, RequestMock} = require('../../../../helpers/unit');
const {matchesInService} = require('../../../../helpers/').structural.service;
const storeImplementation = require('../../../../../srv/store/service');
jest.mock('@sap/cds');

let mockEach;
let mockRequest;

const servicePath = __dirname + '/../../../../../srv/store/service.cds';

describe('Store Service structural tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockEach = {
      ID: '66ab16e5-8e24-4530-a629-0a1da89d9131',
    };
    mockRequest = new RequestMock();
    mockRequest.data = {
      ...mockEach,
    };
    mockService = new ServiceMock();
    mockService.implement = storeImplementation;
    mockService.implement();
  });

  test('srv.on/before/after has been used', () => {
    const hooksUsedCount = mockService.hooks.on.length +
        mockService.hooks.before.length +
        mockService.hooks.after.length;

    expect(hooksUsedCount).toBeGreaterThan(0);
  });

  test('service StoreService { ... } has been used', async () => {
    const serviceStoreRegex = /service[\s]+StoreService[\s]+/g;
    await matchesInService(servicePath, serviceStoreRegex);
  });

  test('entity Items as projection on has been used', async () => {
    const projectionRegex = /entity[\s]+Items[\s]+as[\s]+projection[\s]+/g;
    await matchesInService(servicePath, projectionRegex);
  });

  test('@readonly has been used', async () => {
    const readonlyRegex = /@readonly/g;
    await matchesInService(servicePath, readonlyRegex);
  });

  test('action has been used', async () => {
    const actionRegex = /action/g;
    await matchesInService(servicePath, actionRegex);
  });

  test('event has been used', async () => {
    const eventRegex = /event/g;
    await matchesInService(servicePath, eventRegex);
  });

  test('order by has been used', async () => {
    const orderByRegex = /order[\s]+by/g;
    await matchesInService(servicePath, orderByRegex);
  });
});
