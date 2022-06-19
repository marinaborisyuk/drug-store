/**
 * cds.Service mock class
 */
class ServiceMock {
  // eslint-disable-next-line require-jsdoc
  constructor() {
    this.hooks = {
      before: [],
      on: [],
      after: [],
    };

    this.name = 'ServiceMock';
  }

  // eslint-disable-next-line require-jsdoc
  before(event, entity, hook) {
    this.registerHook('before', event, entity, hook);
  }

  // eslint-disable-next-line require-jsdoc
  on(event, entity, hook) {
    this.registerHook('on', event, entity, hook);
  }

  // eslint-disable-next-line require-jsdoc
  after(event, entity, hook) {
    this.registerHook('after', event, entity, hook);
  }

  // eslint-disable-next-line require-jsdoc
  registerHook(moment, event, entity, hook) {
    if (typeof event === 'string') {
      return this.registerHookForSingleEvent(
          moment,
          event,
          entity,
          hook,
      );
    }

    for (const derivateEvent of event) {
      return this.registerHookForSingleEvent(
          moment,
          derivateEvent,
          entity,
          hook,
      );
    }
  }

  // eslint-disable-next-line require-jsdoc
  registerHookForSingleEvent(moment, event, entity, hook) {
    if (typeof entity === 'function') {
      this.hooks[moment].push({
        event,
        hook: entity,
      });
    }

    this.hooks[moment].push({
      event,
      entity,
      hook,
    });
  }

  /**
   * @public
   * @param {string} eventName
   * @param {string} entityName
   * @return {function} Specified hook
   */
  extractBeforeHookForEntity(eventName, entityName) {
    return this
        .hooks
        .before
        .find(
            ({event, entity}) => (
              event === eventName &&
              entity === entityName
            ),
        )?.hook;
  }

  /**
   * @public
   * @param {string} eventName
   * @param {string} entityName
   * @return {function} Specified hook
   */
  extractOnHookForEntity(eventName, entityName) {
    return this
        .hooks
        .on
        .find(
            ({event, entity}) => (
              event === eventName &&
              entity === entityName
            ),
        )?.hook;
  }

  /**
   * @public
   * @param {string} eventName
   * @param {string} entityName
   * @return {function} Specified hook
   */
  extractAfterHookForEntity(eventName, entityName) {
    return this
        .hooks
        .after
        .find(
            ({event, entity}) => (
              event === eventName &&
              entity === entityName
            ),
        )?.hook;
  }
}

module.exports = ServiceMock;
