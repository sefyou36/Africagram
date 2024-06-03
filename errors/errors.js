class UnauthenticatedError extends Error {
    constructor(message) {
      super(message);
      this.name = "UnauthenticatedError";
      this.statusCode = 401;
    }
  }
  
  class BadRequestError extends Error {
    constructor(message) {
      super(message);
      this.name = "BadRequestError";
      this.statusCode = 400;
    }
  }

  module.exports = { UnauthenticatedError, BadRequestError }