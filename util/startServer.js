const { fork } = require('child_process');
const path = require('path');

const loadConfig = require('../util/loadConfig');
const validConfig = require('../util/validConfig');

module.exports = function (configFilePath) {
  const configs = loadConfig(false, configFilePath);

  // 校验配置是否合法
  validConfig(configs);

  const pids = [];
  configs.forEach((c, index) => {
    const child = fork(path.resolve(__dirname, '../src/index'));
    child.send({
      configIndex: index,
      configFilePath,
    });
    pids.push(child);
  });
  return pids;
};
