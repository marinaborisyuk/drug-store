const auditLogging = require('@sap/audit-logging');
const dotenv = require('dotenv');
const LoggerError = require('./LoggerError');

/**
 * Wrapper of @sap/audit-logging functionality
 * for a simplier usage
 */
class EntityLogger {
  /**
   * @param {cds.Request} req Request object
   * @param {string} service Service name
   */
  constructor(req, service) {
    dotenv.config();

    this.user = req.user?.id ?? 'anonymous';
    this.service = service;
    const credentials = this.getCredentials();
    this.auditLogger = this.buildAuditLoggerWithCreds(credentials);
  }

  /**
   * @private
   * @return {object} Creds object for @sap/audit-logging
   */
  getCredentials() {
    if (process.env.AUDIT_LOG_USE_CONSOLE) {
      return {
        logToConsole: true,
      };
    }

    if (!process.env.AUDIT_LOG_CLIENT_ID ||
      !process.env.AUDIT_LOG_CLIENT_SECRET ||
      !process.env.AUDIT_LOG_URL) {
      throw new LoggerError(
          'You must specify audit log parameters in env variables',
      );
    }

    return {
      'uaa': {
        'clientid': process.env.AUDIT_LOG_CLIENT_ID,
        'clientsecret': process.env.AUDIT_LOG_CLIENT_SECRET,
        'url': process.env.AUDIT_LOG_URL,
      },
      'url': process.env.AUDIT_LOG_URL,
    };
  }

  /**
   * @private
   * @param {object} credentials Credentials configuring logging behavior
   * @return {object} Audit logger instance
   */
  buildAuditLoggerWithCreds(credentials) {
    return auditLogging.v2(
        credentials,
        (error, logger) => {
          if (error) {
            throw new LoggerError(error);
          }

          return logger;
        },
    );
  }


  /**
   * @public
   * @param {{
   *  name: string,
   *  id: string,
   *  attributes: Array<string>,
   * }} entitySpecification The specification of the entity to be logged
   */
  pushReadMessage(entitySpecification) {
    if (process.env.AUDIT_LOG_DISABLE) {
      return;
    }

    let message = this.auditLogger.read(this.getIdentifier());
    message = this.provideMessageData(message, entitySpecification);
    message.log((error) => {
      if (error) {
        throw new LoggerError(error);
      }
    });
  }

  /**
   * @public
   * @param {{
   *  name: string,
   *  id: string,
   *  attributes: Array<string>,
   * }} entitySpecification The specification of the entity to be logged
   */
  pushUpdateAttemptMessage(entitySpecification) {
    if (process.env.AUDIT_LOG_DISABLE) {
      return;
    }

    let message = this.auditLogger.update(this.getIdentifier());
    message = this.provideMessageData(message, entitySpecification);
    message.logPrepare((error) => {
      if (error) {
        throw new LoggerError(error);
      }
    });
  }

  /**
   * @public
   * @param {{
   *  name: string,
   *  id: string,
   *  attributes: Array<string>,
   * }} entitySpecification The specification of the entity to be logged
   */
  pushUpdateFinishMessage(entitySpecification) {
    if (process.env.AUDIT_LOG_DISABLE) {
      return;
    }

    let message = this.auditLogger.update(this.getIdentifier());
    message = this.provideMessageData(message, entitySpecification);
    message.logSuccess((error) => {
      if (error) {
        throw new LoggerError(error);
      }
    });
  }

  /**
   * @private
   * @return {object} Audit logger message identifier
   */
  getIdentifier() {
    return {type: 'Drug Store', id: {key: this.service}};
  }

  /**
   * @param {object} message Audit logger message
   * @param {{
   *  name: string,
   *  id: string,
   *  attributes: Array<string>,
   * }} entitySpecification The specification of the entity to be logged
   * @return {object} Updated audit logger message
   */
  provideMessageData(message, {name, id, attributes}) {
    message = message
        .by(this.user)
        .at(new Date())
        .tenant(process.env.AUDIT_LOG_TENANT)
        .dataSubject({type: name, id: {key: id}});

    for (const attribute of attributes) {
      message = message.attribute({name: attribute});
    }

    return message;
  }
}

module.exports = EntityLogger;
