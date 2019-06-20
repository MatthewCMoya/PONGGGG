import { Errors, apiConfig } from '../globals';

const { NOT_FOUND, GENERIC_ERROR, BAD_REQUEST } = Errors;

class PongApi {
  constructor() {
    this.baseUrl = apiConfig;
    this.defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
  }

  async get(path) {
    const options = { method: 'GET' };

    return await this.makeRequest(path, options);
  }

  async post(path, body) {
    const options = { method: 'POST', body: JSON.stringify(body) };

    return await this.makeRequest(path, options);
  }

  async put(path, body) {
    const options = { method: 'PUT', body: JSON.stringify(body) };

    return await this.makeRequest(path, options);
  }

  async makeRequest(path, options) {
    const requestParams = { ...this.defaultOptions, ...options };

    try {
      const result = await fetch(`${this.baseUrl}${path}`, requestParams);

      if (result.status === 400) {
        throw new BAD_REQUEST();
      }

      if (result.status === 404) {
        throw new NOT_FOUND('The requested resource could not be found. Please try again.');
      }

      if (result.status === 500) {
        throw new GENERIC_ERROR();
      }

      return result.json();
    } catch (error) {
      throw error.message || error.userMessage || error.code;
    }
  }
}

export default PongApi;
