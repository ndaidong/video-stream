# video-stream

Example Node.js based video streaming server.


## Requirements

- Node.js >= 10.14

## Setup

```bash
git clone git@github.com:ndaidong/video-stream.git
cd  video-stream

# create dotenv config file
cp sample.env .env

# install
npm i  # yarn
npm start

# production mode
npm run live
```

Ensure that `VIDEO_DIR` points to the folder where you store your videos to stream.


### Endpoints

Default base URL should be `http://0.0.0.0:7777`. From that, there are the following endpoints:

- `GET /videos`: list media files
- `GET /videos/FILE_NAME.EXT`: view file info
- `GET /videos/FILE_NAME.EXT/stream`: get video as stream
- `GET /videos/FILE_NAME.EXT/play`: view this video with a simple web page



## Test

Just a few examples...

```bash
npm test
```
