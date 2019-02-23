const Koa = require('koa');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');

const proxy = require('./middleware/proxy');
const router = require('./router');

const app = new Koa();

// step 1: proxy
app.use(proxy());

// step 2: parse body
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
}));
app.use(json());

app.use(router.routes(), router.allowedMethods());

module.exports = app;
