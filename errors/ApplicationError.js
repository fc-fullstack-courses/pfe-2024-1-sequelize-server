class ApplicationError extends Error {
  constructor(status, message) {
    super();

    this.status = status || 500;
    this.message = message || 'Application Error';
    this.name = this.constructor.name;
  }
}

module.exports = ApplicationError;