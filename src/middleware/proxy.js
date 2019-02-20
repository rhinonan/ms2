const httpProxy = require('http-proxy');
const proxyOption = require('./proxyOption');

const config = global.$_config;

module.exports = function () {
  const proxy = httpProxy.createProxyServer(Object.assign({}, proxyOption, {
    target: config.target,
  }));

  // 注册proxy 事件
  proxy.on('proxyReq', proxyOption.proxyReq);
  proxy.on('proxyRes', proxyOption.proxyRes);
  proxy.on('error', proxyOption.error);

  return async function (ctx, next) {
    const { query } = ctx;

    // force to use mock data
    if (query.$_mock) {
      await next();
      return;
    }

    // don't force to use proxy
    if (config.model === 'mock' && !query.$_proxy) {
      await next();
      return;
    }

    // eslint-disable-next-line
    return new Promise((resolve, reject) => {
      try {
        proxy.web(ctx.req, ctx.res);
      } catch (e) {
        reject(e);
      }
    });
  };
};
