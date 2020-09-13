const markTwain = require('mark-twain');
const { toUriPath } = require('../utils/escape-win-path');

module.exports = function (filename, fileContent) {
  const markdown = markTwain(fileContent);
  console.log('生成的 markdown 为：', markdown);
  markdown.meta.filename = toUriPath(filename);
  return markdown;
};
