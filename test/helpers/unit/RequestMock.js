/**
 * cds.Request mock class
 */
class RequestMock {
  // eslint-disable-next-line require-jsdoc
  constructor() {
    this.data = {};
    this.event = 'READ';
    this.method = 'GET';
    this.user = {id: 'anonymous'};
  }
}

module.exports = RequestMock;
