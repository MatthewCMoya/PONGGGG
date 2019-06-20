import ApiConfig from './ApiConfig.json';
import * as Errors from './Errors';

const env = () => {
  switch (process.env.REACT_APP_STAGE) {
    case 'production':
      return 'production';
    case 'forLocal':
      return 'forLocal';
    default:
      return 'development';
  }; // eslint-disable-line
}

const apiConfig = ApiConfig[env()];

export { apiConfig, Errors };