export class RequestValidationError extends Error {
  statusCode: number;
  errors: { message: string; field?: string }[];

  constructor(errors: { message: string; field?: string }[]) {
    super('Invalid request parameters');
    this.statusCode = 400;
    this.errors = errors;
    
    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(error => ({
      message: error.message,
      field: error.field
    }));
  }
}
