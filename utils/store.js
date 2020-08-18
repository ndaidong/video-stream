// utils --> store

const {existsSync, execSync} = require('./index');

const {
  STORAGE_DIR,
  VIDEO_DIR,
} = require('../configs');

const createIfNot = (dirpath) => {
  if (!existsSync(dirpath)) {
    execSync(`mkdir -p ${dirpath}`);
  }
};

const init = () => {
  return [
    STORAGE_DIR,
    VIDEO_DIR,
  ].map(createIfNot);
};

module.exports = {
  init,
};
