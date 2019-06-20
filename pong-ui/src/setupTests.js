import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
global.fetch = require('jest-fetch-mock')
fetch.mockResponse(JSON.stringify({ whatever: '12345' })); // mock everything for now.
configure({ adapter: new Adapter() });