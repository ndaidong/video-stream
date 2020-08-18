// config

require('dotenv').config();

const {
  name,
  version,
} = require('../package.json');

const env = process.env || {};

const ENV = env.ENV || 'dev';
const APP_HOST = env.APP_HOST || '0.0.0.0';
const APP_PORT = env.APP_PORT || 9999;
const APP_URL = env.APP_URL || `http://${APP_HOST}:${APP_PORT}`;

module.exports = {
  name,
  version,
  ENV,
  APP_HOST,
  APP_PORT,
  APP_URL,
  STORAGE_DIR: env.STORAGE_DIR || './storage',
  VIDEO_DIR: env.VIDEO_DIR || './storage/videos',
};
