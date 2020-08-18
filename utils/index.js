// utils

const {execSync} = require('child_process');
const {extname, normalize, join, parse} = require('path');

const {
  statSync,
  existsSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} = require('fs');

const isFile = (f) => {
  const stats = statSync(f);
  return !stats.isDirectory();
};

const isDirectory = (f) => {
  const stats = statSync(f);
  return stats.isDirectory();
};

const isHtmlFile = (f) => {
  return ['.html', '.htm'].includes(extname(f));
};

const isAbsoluteURL = (file = '') => {
  const f = String(file);
  return f.startsWith('http') || f.startsWith('//');
};

const makeFilePath = (...args) => {
  return normalize(join(...args));
};

const getBaseDir = (relPath) => {
  return parse(relPath).dir || '';
};

const getFileName = (relPath) => {
  return parse(relPath).base;
};

const readFile = (f) => {
  return existsSync(f) ? readFileSync(f, 'utf8') : '';
};

const writeFile = (f, content) => {
  return writeFileSync(f, content, 'utf8');
};

module.exports = {
  statSync,
  execSync,
  existsSync,
  readdirSync,
  normalize,
  isFile,
  isDirectory,
  isHtmlFile,
  isAbsoluteURL,
  makeFilePath,
  getBaseDir,
  getFileName,
  readFile,
  writeFile,
};
