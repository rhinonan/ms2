// 自动修改vue.config.js中的配置

// TODO: 提示文件覆盖
// TODO: 增加端口是否占用判断

const path = require('path');
const fs = require('fs');

const { CONFIG_FILE_NAME } = require('../../util/const');


module.exports = function initVue() {
  const VUE_CONFIG_FILE = 'vue.config.js';

  // eslint-disable-next-line
  const config = require(path.resolve('./', VUE_CONFIG_FILE));

  const proxyConfig = config.devServer.proxy;

  const rs = [];
  Object.keys(proxyConfig).forEach((key, index) => {
    rs.push({
      secure: proxyConfig[key].secure,
      target: proxyConfig[key].target,
      https: proxyConfig[key].https,
      changeOrigin: proxyConfig[key].changeOrigin,
      port: config.devServer.port ? config.devServer.port + index + 1 : 3000 + index,
    });
  });

  const fileContent = `
  /**
   * ms2 配置文件
   */

  /* eslint-disable */
  module.exports = ${JSON.stringify(rs)}
  `;

  fs.writeFileSync(`./${CONFIG_FILE_NAME}`, fileContent);
  console.log('config file init success!');
};
