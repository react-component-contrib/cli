const config = require('./env');
const paths = require('./paths');

module.exports = {
  launch: {
    dumpio: true,
    headless: true,
  },
  browser: 'chromium',
  server: {
    command: `npx gulp -f ${paths.gulpfile} e2e`,
    port: config.e2e.port,
    launchTimeout: config.e2e.launchTimeout,
  },
};
