class CustomError extends Error {
  constructor() {
    super();
    this.code = '';
    this.message = '';
  }
}

class MALFORMED_JSON_ERROR extends CustomError {
  constructor() {
    super();
    this.code = 'MALFORMED_JSON_ERROR';
    this.message = 'Malformed JSON was provided';
  }
}

class INVALID_URL_ERROR extends CustomError {
  constructor() {
    super();
    this.code = 'INVALID_URL_ERROR';
    this.message = 'The provided url is not valid';
  }
}

class NOT_FOUND_ERROR extends Error {
  constructor() {
    super();
    this.code = 'NOT_FOUND_ERROR';
    this.message = 'The requested resource could not be retrieved.';
  }
}

class INVALID_SECRET_REQUEST extends Error {
  constructor() {
    super();
    this.code = 'INVALID_SECRET_REQUEST';
    this.message = 'The request to secret manager was invalid';
  }
}

class GENERIC_ERROR extends Error {
  constructor() {
    super();
    this.code = 'GENERIC_ERROR';
    this.message = 'Something went wrong. Please try again later.';
  }
}

class MISSING_PARAMETERS_ERROR extends Error {
  constructor() {
    super();
    this.code = 'MISSING_PARAMETERS_ERROR';
    this.message = 'You are missing one or more parameters.';
  }
}

class FORBIDDEN_ERROR extends Error {
  constructor() {
    super();
    this.code = 'FORBIDDEN_ERROR';
    this.message = 'Forbidden action.';
  }
}

module.exports = {
  MALFORMED_JSON_ERROR,
  NOT_FOUND_ERROR,
  GENERIC_ERROR,
  MISSING_PARAMETERS_ERROR,
  FORBIDDEN_ERROR,
  INVALID_URL_ERROR,
  INVALID_SECRET_REQUEST
};
