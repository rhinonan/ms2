#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const chokidar = require('chokidar');
const pkg = require('../package.json');
const startServer = require('../util/startServer');

const DEFAULT_FILE = './ms2.config.js';
let restartTimes = 0;

program
  .version(pkg.version)
  .usage('<command> [options]')
  .option('-c --configFile <file>', 'default to use ms2.config.js in present folder')
  .option('-w --watch', 'watch configFile & reload server')
  .parse(process.argv);

// 处理配置以及默认选项河合并
const configFilePath = path.resolve(__dirname, '../', program.configFile || DEFAULT_FILE);
let pids = startServer(configFilePath);

if (program.watch) {
  chokidar.watch(configFilePath).on('change', () => {
    restartTimes += 1;
    console.log('Config file changed, all servers will be restart!');
    // todo: 确保进程关闭成功，改进setTimeout的重启方式
    pids.forEach((pid) => {
      pid.kill();
    });
    setTimeout(() => {
      pids = startServer(configFilePath);
      console.log('All servers restarted! RestartTimes:', restartTimes);
    }, 1000);
  });
}
