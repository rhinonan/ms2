#!/usr/bin/env node

/*eslint-disable*/

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const app = require('./app');

const config = global.$_config;


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log(`Target ${config.target} is listening on ${bind}`);
}


/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || config.port || 3000);

/**
 * Create HTTP server.
 */
let server;
if (config.https) {
  server = https.createServer({
    key: fs.readFileSync(path.join(__dirname, './ca/server-key.key')),
    cert: fs.readFileSync(path.join(__dirname, './ca/server-cert.crt')),
  }, app.callback());
} else {
  server = http.createServer(app.callback());
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
