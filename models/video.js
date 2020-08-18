// models / video

const {resolve} = require('url');

const mime = require('mime');

const {
  readdirSync,
  existsSync,
  statSync,
  makeFilePath,
} = require('../utils');

const {
  APP_URL,
  VIDEO_DIR,
} = require('../configs');

const validExts = ['.mp4', '.mkv', '.ogg', '.avi', '.webm'];

const getVideoPath = (fname) => {
  return makeFilePath(VIDEO_DIR, fname);
};

const isValidVideoFile = (fpath) => {
  return existsSync(fpath);
};

const getVideoList = () => {
  return readdirSync(VIDEO_DIR).filter((fname) => {
    return validExts.some((ext) => {
      return fname.endsWith(ext);
    });
  }).map((fname) => {
    return {
      filename: fname,
      infoUrl: resolve(APP_URL, `/videos/${fname}`),
      streamUrl: resolve(APP_URL, `/videos/${fname}/stream`),
      playerUrl: resolve(APP_URL, `/videos/${fname}/play`),
    };
  });
};

const getFileInfo = (fname, fpath) => {
  const fileType = mime.getType(fpath);
  const {
    mtime: lastModified,
    atime: lastAccessed,
    ctime: lastStatusChanged,
    size: sizeInBytes,
  } = statSync(fpath);
  return {
    fileType,
    filePath: fpath,
    lastModified,
    lastAccessed,
    lastStatusChanged,
    sizeInBytes,
    streamUrl: resolve(APP_URL, `/videos/${fname}/stream`),
    playerUrl: resolve(APP_URL, `/videos/${fname}/play`),
  };
};

const getVideoDetail = (fname) => {
  const fpath = makeFilePath(VIDEO_DIR, fname);
  return isValidVideoFile(fpath) ? getFileInfo(fname, fpath) : 'File does not exist!';
};

module.exports = {
  getVideoList,
  getVideoDetail,
  getVideoPath,
  isValidVideoFile,
};
