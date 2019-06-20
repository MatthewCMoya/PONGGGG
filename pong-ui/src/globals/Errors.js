export class NOT_FOUND extends Error {
  constructor(message) {
    super();
    this.code = 'NOT_FOUND';
    this.userMessage = message || 'The requested resource could not be found.';
  }
}

export class BAD_REQUEST extends Error {
  constructor(message) {
    super();
    this.code = 'BAD_REQUEST';
    this.userMessage = message || 'Invalid request.';
  }
}

export class GENERIC_ERROR extends Error {
  constructor(message) {
    super();
    this.code = 'GENERIC_ERROR';
    this.userMessage = message || 'Something went wrong. Please try again later.';
  }
}

export class INVALID_INPUT extends Error {
  constructor(message) {
    super();
    this.code = 'INVALID_INPUT';
    this.userMessage = message || 'The provided input cannot be used. Please provide valid input and try again.';
  }
}
