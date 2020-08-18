// server.js

const path = require('path');
const {readdirSync} = require('fs');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

const {info, error} = require('./utils/logger');
const {init: setupStorage} = require('./utils/store');

const {
  name,
  version,
  APP_HOST,
  APP_PORT,
  APP_URL,
  STORAGE_DIR,
} = require('./configs');

const startAt = (new Date()).toUTCString();
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, STORAGE_DIR, 'logs'),
});

const morganTpl = 'combined';
const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use('/favicon.ico', express.static('./favicon.ico'));
app.use(morgan(morganTpl, {
  stream: accessLogStream,
}));

app.get('/', (req, res) => {
  info(`${req.method} ${req.path} --> Default endpoint`);
  return res.json({
    service: name,
    version,
    start_at: startAt,
  });
});

readdirSync('./routers').forEach((f) => {
  const fpath = `./routers/${f}`;
  require(fpath)(app);
});

app.use((req, res) => {
  error(`${req.method} ${req.path} --> 404`);
  return res.status(404).json({
    status: 'error',
    error: '404 Not Found',
    message: `The endpoint \`${req.path}\` does not exist!`,
  });
});

app.use((err, req, res) => {
  error(`${req.METHOD} ${req.path} --> ${String(err)}`);
  return res.status(500).json({
    status: 'error',
    error: 'Internal Server Error',
    message: String(err),
  });
});

const onServerReady = () => {
  info(`${name}@${version} started at "${APP_URL}"`);
  setupStorage();
};

const server = app.listen(APP_PORT, APP_HOST, onServerReady);

module.exports = server;
