module.exports = {
  preset: 'jest-puppeteer',
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  globalSetup: 'jest-environment-puppeteer/setup',
  globalTeardown: 'jest-environment-puppeteer/teardown',
  setupFilesAfterEnv: ['<rootDir>/tests/setup-puppeteer.js'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  transformIgnorePatterns: ['\\\\node_modules\\\\'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};
