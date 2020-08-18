// handlers --> cameras

const {createReadStream} = require('fs');

const mime = require('mime');

const {
  getVideoList,
  getVideoDetail,
  getVideoPath,
  isValidVideoFile,
} = require('../models/video');

const {
  readFile,
  statSync,
} = require('../utils');

const list = (req, res) => {
  return res.json({
    videos: getVideoList(),
  });
};

const view = (req, res) => {
  const {file} = req.params;
  return res.json({file, info: getVideoDetail(file)});
};

const responseStream = (req, res, fpath) => {
  const mtype = mime.getType(fpath);
  const stat = statSync(fpath);
  const fsize = stat.size;
  const {range = ''} = req.headers;
  if (!range) {
    return res.status(416).send('Range Not Satisfiable');
  }
  const parts = range.replace(/bytes=/, '').split('-');
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fsize - 1;

  if (start >= fsize) {
    return res.status(416).send('Range Not Satisfiable');
  }

  const chunksize = (end - start) + 1;
  const file = createReadStream(fpath, {start, end});
  const head = {
    'Content-Range': `bytes ${start}-${end}/${fsize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunksize,
    'Content-Type': mtype,
  };

  res.writeHead(206, head);
  file.pipe(res);
};

const responseHTML = (req, res, file) => {
  const {streamUrl} = getVideoDetail(file);
  const html = readFile('./index.htm')
    .replace('{VIDEO_FILE}', file)
    .replace('{STREAM_URL}', streamUrl);
  return res.send(html);
};

const stream = (req, res) => {
  const {file} = req.params;
  const fpath = getVideoPath(file);
  return !isValidVideoFile(fpath) ? res.status(204).send('No Content') :
    responseStream(req, res, fpath);
};

const play = (req, res) => {
  const {file} = req.params;
  const fpath = getVideoPath(file);
  return !isValidVideoFile(fpath) ? res.status(404).send('File Not Found') :
    responseHTML(req, res, file);
};

module.exports = {
  list,
  view,
  stream,
  play,
};
