import { HttpStatus } from './httputlis';

/**
 * @extends Error
 */
class ExtendableError extends Error {
    constructor({
      message,
      errors,
      status,
      isPublic,
      stack,
    }) {
      super(message);
      this.name = this.constructor.name;
      this.message = message;
      this.errors = errors;
      this.status = status;
      this.isPublic = isPublic;
      this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
      this.stack = stack;
      // Error.captureStackTrace(this, this.constructor.name);
    }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor({
      message,
      errors,
      stack,
      status = HttpStatus.INTERNAL_SERVER_ERROR,
      isPublic = false,
    }) {
      super({
        message, errors, status, isPublic, stack,
      });
    }
}

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
export const handler = (err, req, res, next) => {
    const response = {
      code: err.status,
      message: err.message || HttpStatus[err.status],
      errors: err.errors,
      stack: err.stack,
    };
    
    res.status(err.status);
    return res.json(response);
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
export const converter = (err, req, res, next) => {
    let convertedError = err;
    return handler(convertedError, req, res);
};


/**
 * Catch 404 and forward to error handler
 * @public
 */
export const notFound = (req, res, next) => {
    const err = new APIError({
      message: 'Not found',
      status: HttpStatus.NOT_FOUND,
    });
    return handler(err, req, res);
};