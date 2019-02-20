const loadConfig = require('../util/loadConfig');

process.on('message', (config) => {
  global.$_config = loadConfig(config.configIndex, config.configFilePath);

  /* eslint-disable-next-line */
  require('./server');
});
