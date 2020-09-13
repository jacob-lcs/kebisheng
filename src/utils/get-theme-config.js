const path = require('path');

const pluginHighlight = path.join(__dirname, '..', 'bisheng-plugin-highlight');

function isRelative(filepath) {
  return filepath.charAt(0) === '.';
}

function toAbsolutePath(plugin) {
  return isRelative(plugin) ? path.join(process.cwd(), plugin) : plugin;
}

module.exports = function getThemeConfig(configFile) {
  // eslint-disable-next-line import/no-dynamic-require
  const customizedConfig = require(configFile);
  const config = { plugins: [], ...customizedConfig };
  config.plugins = [pluginHighlight].concat(config.plugins.map(toAbsolutePath));

  return config;
};
