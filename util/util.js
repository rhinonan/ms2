/**
 * 工具函数文件
 */

const path = require('path');
const fs = require('fs');

/**
 * 计算文件所在绝对目录以及文件文件绝对路径
 *
 * @param {object} req - http 请求req
 * @param {object} config - 用户配置
 * @returns {object.fileDir} - 文件所在目录
 * @returns {object.filePath} - 文件路径
 */
function calcFileInfo(req, config) {
  const {
    relativePath,
    fileName,
  } = config.handleMapPath(req, req.$query, req.$body, global.$_config);

  // 检测外部自定义函数参数
  if (!relativePath || !fileName) {
    throw new Error('handleMapPath function should return an object include `relativePath` and `fileName`');
  }

  // 文件所在绝对目录
  const fileDir = path.resolve('./', config.mockDataPath, relativePath);

  // 文件绝对路径
  const filePath = path.resolve(fileDir, './', fileName);

  return {
    fileDir,
    filePath,
  };
}

/**
 * 根据请求content-type 获取文件扩展名
 *
 * @param {*} contentType - content-type
 * @returns {string} - 文件扩展名 default: file
 */
function getFileExtension(contentType) {
  const TYPE_FILE_MAP = {
    'text/html': 'html',
  };

  let extension = 'file';
  Object.keys(TYPE_FILE_MAP).forEach((key) => {
    if (contentType.indexOf(key) > -1) {
      extension = TYPE_FILE_MAP[key];
      return false;
    }
    return true;
  });
  return extension;
}

/**
 * 由于自己从本地文件，没有返回头，无法确定文件格式，只能尝试加载
 *
 * @param {string} filePath - 文件路径（没有扩展名）
 * @param {object} config - 用户配置
 * @returns {string} - 存在的文件扩展名
 */
function tryFile(filePath, config) {
  let extension = '';
  config.mockExtensions.forEach((type) => {
    if (fs.existsSync(`${filePath}.${type}`)) {
      extension = type;
      return false;
    }
    return true;
  });
  return extension;
}


exports.calcFileInfo = calcFileInfo;
exports.getFileExtension = getFileExtension;
exports.tryFile = tryFile;
