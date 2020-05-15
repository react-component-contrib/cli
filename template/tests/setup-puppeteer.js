import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { e2e } from '../config';

global.TEST_URL = `http://localhost:${e2e.port}`;

expect.extend({ toMatchImageSnapshot });
