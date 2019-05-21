/**
 * mock 数据处理入口
 */

const fs = require('fs');
const router = require('koa-router')();

const { calcFileInfo, tryFile } = require('../util/util');

const config = global.$_config;

router.all('/*', async (ctx) => {
  const {
    filePath,
  } = calcFileInfo(ctx, config);

  const jsFile = `${filePath}.js`;

  // 存在js文件，执行js文件
  if (fs.existsSync(jsFile)) {
    // clear cache, no need restart http to make you data work
    require.cache[require.resolve(jsFile)] = null;

    // eslint-disable-next-line
    ctx.body = await require(jsFile)(ctx.query, ctx.body);
    return;
  }

  // 通过 穷举尝试匹配存在数据存储文件
  const mockDataExtension = tryFile(filePath, config);

  // 如果存在数据文件
  if (mockDataExtension) {
    const data = fs.readFileSync(`${filePath}.${mockDataExtension}`, 'utf-8');

    // json 结构进行特殊处理
    if (mockDataExtension === 'json') {
      ctx.body = JSON.parse(data);
    } else {
      ctx.body = data;
    }
    return;
  }

  // TODO: use user custom config
  // if nothing match, return a empty object
  ctx.body = {};
});

module.exports = router;
