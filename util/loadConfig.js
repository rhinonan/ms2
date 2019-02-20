/**
 * 获取服务特定配置
 */

const defaultConfig = require('../src/defaultConfig');

/**
 * 获取用户自定义配置
 *
 * @param {number} index - 配置位置索引
 * @param {string} filePath - 配置文件路径
 * @returns {object} 有索引时返回单个配置，无索引时返回整个配置
 */
module.exports = function (index = false, filePath) {
  // eslint-disable-next-line
  const config = require(filePath);
  let configs = Array.isArray(config) ? config : [config];

  // 合并默认配置
  configs = configs.map(c => Object.assign({}, defaultConfig, c));
  return index !== false ? configs[index] : configs;
};
