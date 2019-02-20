/**
 * 解析body
 * @from koa-bodyparser
 */

/*eslint-disable */

function bodyParser(data) {
  if (!data) {
    return;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return formdataParser(data);
  }
}
function formdataParser(data) {
  let payload = data.toString();
  let payloadArray = payload.split('&');
  let params = {};
  for (let p of payloadArray) {
    let ps = p.split('=');
    params[ps[0]] = ps[1] || '';
  }
  return params;
}

function queryParser(url) {
  if (!url) {
    return;
  }
  let queryIndex = url.indexOf('?') + 1;

  let query = url.slice(queryIndex);
  let reg = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
  let obj = {};
  while (reg.exec(query)) {
    obj[RegExp.$1] = RegExp.$2;
  }
  return obj;
}

module.exports.bodyParser = bodyParser;
module.exports.queryParser = queryParser;
