/**
 * 反向代理配置文件
 */

const fs = require('fs');

const parser = require('../../util/parser');
const cfs = require('../../util/file');
const {
  calcFileInfo,
  getFileExtension,
} = require('../../util/util');

const config = global.$_config;

module.exports = {
  changeOrigin: config.changeOrigin, // 需要虚拟主机站点
  secure: config.secure,
  https: config.https,

  proxyReq(proxyReq, req) {
    let data = Buffer.alloc(0);
    req.$query = parser.queryParser(req.url);

    // 保存body
    req.on('data', (chunk) => {
      data = Buffer.concat([data, chunk]);
    });

    // 解析body
    req.on('end', () => {
      req.$body = parser.bodyParser(data);
    });
  },

  proxyRes(proxyRes, req) {
    let body = Buffer.alloc(0);
    proxyRes.on('data', (data) => {
      body = Buffer.concat([body, data]);
    });

    proxyRes.on('end', () => {
      body = body.toString();

      // 计算文件路径并缓存文件
      if (config.cacheMock) {
        const {
          fileDir,
          filePath,
        } = calcFileInfo(req, config);

        const fileExtension = getFileExtension(proxyRes.headers['content-type']);
        cfs.mkdirsSync(fileDir);
        fs.writeFileSync(`${filePath}.${fileExtension}`, body);
      }
    });
  },

  error(e) {
    console.error(e);
  },
};
