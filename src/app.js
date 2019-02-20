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


// let Koa = require('koa');
// let app = new Koa();
// let json = require('koa-json');
// let bodyparser = require('koa-bodyparser');
// let restc = require('restc');
// let proxy = require('./src/proxy_middleware');
// let cacheCookie = require('./src/cache_cookie_middleware');
// let config = require('./src/config');


// let index = require('./routes/index');

// // error handler
// onerror(app);

// // logger
// app.use(async (ctx, next) => {
//     let start = new Date();
//     await next();
//     let ms = new Date() - start;
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

// app.use(cacheCookie());
// app.use(restc.koa2());
// app.use(proxy());

// // middlewares
// app.use(bodyparser({
//     enableTypes:['json', 'form', 'text']
// }));
// app.use(json());
// app.use(logger());
// app.use(require('koa-static')(__dirname + '/public'));

// app.use(views(__dirname + '/views', {
//     extension: 'pug'
// }));


// // routes
// app.use(index.routes(), index.allowedMethods());

// // error-handling
// app.on('error', (err, ctx) => {
//     console.error('server error', err, ctx);
// });

module.exports = app;
