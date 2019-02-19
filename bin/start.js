#!/usr/bin/env node

let program = require('commander');
let path = require('path');
let pkg = require('../package.json');
let defaultConfig = require('../src/defaultConfig');
let validConfig = require('../util/validConfig');
let fork = require('child_process').fork;

const DEFAULT_FILE = './ms2.config.js';

program
  .version(pkg.version)
  .usage('<command> [options]')
  .option('-c --configFile <file>', 'default to use ms2.config.js in present folder')
  .parse(process.argv);

// 处理配置以及默认选项河合并
let configFile = path.resolve(__dirname, '../', program.configFile || DEFAULT_FILE);
let config = require(configFile);
let configs =  Array.isArray(config) ? config : [config];
configs = configs.map(c => Object.assign({}, defaultConfig, c));

// 校验配置是否合法
validConfig(configs);

let pids = [];
configs.forEach(config => {
    let child = fork(path.resolve(__dirname, '../src/index'));
    child.send(config);
    pids.push(child);
});