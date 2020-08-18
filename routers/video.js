// routers --> api

const {
  list,
  view,
  stream,
  play,
} = require('../handlers/video');

const init = (app) => {
  app.get('/videos/:file/play', play);
  app.get('/videos/:file/stream', stream);
  app.get('/videos/:file', view);
  app.get('/videos', list);
};

module.exports = init;
