# mock-server

## Install

全局安全运行

```shell
npm i ms2 -g
ms2 -c ./ms.config.js
```

局部安装运行

```shell
npm i ms2 --save-dev
npx ms2 -c ./ms.config.js
```

## Config

配置文件统一定义在ms2.config.js，同时也支持package.json中ms2字段（未完成）

配置文件示例：

```js
// ms2.config.js
module.exports = {
  target: 'https://google.com.hk'
}

// 同时也支持多个
// ms2.config.js
module.exports = [{
  target: 'https://google.com.hk',
  port: 3000
}, {
  target: 'https://bing.com',
  port: 3001
}]
```

### target

required: `true`

type: `string`

目标服务器地址（必须选项）

### model

当前工作模式（default: proxy）

* proxy：代理模式，反向代理请求解决跨域问题
* mock：mock数据模式，请求本地缓存或者构造的顺序

可以在query中写入\$mock，\$proxy定义单个请求

## Feature request

* 引入restc
* 静态资源服务器
* 支持读取packjson.json中的配置