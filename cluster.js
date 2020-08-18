// cluster.js
const cluster = require('cluster');
const os = require('os');

const {
  info,
} = require('./utils/logger');

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  info(`Forking ${cpus} threads:`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  require('./server');
}
