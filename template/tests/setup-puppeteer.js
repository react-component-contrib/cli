import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { config } from '../package.json';

global.TEST_URL = `http://localhost:${config.e2e.port}`;

expect.extend({ toMatchImageSnapshot });
