/**
 * 文件相关操作
 */

const fs = require('fs');
const path = require('path');

const config = global.$_config;

/**
 * 同步递归创建目录
 *
 * @param {any} dirname 路径名称
 * @returns {boolean} 是否创建成功
 */
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  }
  if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
  return false;
}

/**
 * 生成默认文件，js文件，db文件
 *
 * @param {string} fileName 文件名称
 * @param {string} relativePath 相对路径，因为mock数据存放的路径是可以配置的，默认是mock目录，这个路径是相对于mock目录而言
 * @returns {object} 文件路径
 */
function generatorFilePath(fileName, relativePath) {
  const defaultFile = `${fileName}.${config.cacheMockExtension}`;
  const jsFile = `${fileName}.js`;


  const defaultFilePath = `./${config.mockDir}${relativePath}${defaultFile}`;
  const jsFilePath = `./${config.mockDir}${relativePath}${jsFile}`;

  return { defaultFilePath, jsFilePath };
}

module.exports.mkdirsSync = mkdirsSync;
module.exports.generatorFilePath = generatorFilePath;
