const {ServiceMock, RequestMock} = require('../../../../helpers').unit;
const EntityLogger = require('../../../../../srv/common')
    .helpers
    .logging
    .EntityLogger;
jest.mock('../../../../../srv/common/helpers/logging/EntityLogger');
const storeImplementation = require('../../../../../srv/store/service');
jest.mock('@sap/cds');

let mockEach;
let mockRequest;
let entityName;

describe('Store Service event handlers tests', () => {
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
    entityName = 'Items';
    mockService.implement = storeImplementation;
    mockService.implement();
  });

  describe('With read event', () => {
    describe('With correct data', () => {
      test('It logs data access message', () => {
        const hook = mockService.extractAfterHookForEntity('READ', entityName);

        hook(mockEach, mockRequest);

        expect(EntityLogger).toBeCalledTimes(1);
        const logger = EntityLogger.mock.instances[0];
        expect(logger.pushReadMessage).toBeCalledTimes(1);
        const {name, id, attributes} = logger.pushReadMessage.mock.calls[0][0];
        expect(name).toEqual(entityName);
        expect(id).toEqual('66ab16e5-8e24-4530-a629-0a1da89d9131');
        expect(attributes).toEqual(['ID']);
        expect(logger.pushUpdateFinishMessage).not.toBeCalled();
        expect(logger.pushUpdateAttemptMessage).not.toBeCalled();
      });
    });

    describe('With missing ID', () => {
      test('It logs data access message with default ID value', () => {
        const hook = mockService.extractAfterHookForEntity('READ', entityName);
        delete mockEach.ID;

        hook(mockEach, mockRequest);

        expect(EntityLogger).toBeCalledTimes(1);
        const logger = EntityLogger.mock.instances[0];
        expect(logger.pushReadMessage).toBeCalledTimes(1);
        const {name, id, attributes} = logger.pushReadMessage.mock.calls[0][0];
        expect(name).toEqual(entityName);
        expect(id).toEqual('unknown');
        expect(attributes).toEqual([]);
        expect(logger.pushUpdateFinishMessage).not.toBeCalled();
        expect(logger.pushUpdateAttemptMessage).not.toBeCalled();
      });
    });
  });
});
