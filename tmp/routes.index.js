"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var chain = require('ramda/src/chain');

var toReactElement = require('jsonml-to-react-element');

var exist = require('exist.js');

var NProgress = require('nprogress-for-antd');

var NotFound = require('/Users/jacob/Desktop/MyProject/kebisheng/theme/template/NotFound');

var themeConfig = JSON.parse('{"home":"/","sitename":"One","tagline":"The one theme for bisheng","navigation":[{"title":"BiSheng","link":"https://github.com/benjycui/bisheng"}],"footer":"Copyright and so on...","hideBisheng":true,"github":"https://github.com/benjycui/bisheng"}');

function calcPropsPath(dataPath, params) {
  return typeof dataPath === 'function' ? dataPath(params) : Object.keys(params).reduce(function (path, param) {
    return path.replace(":".concat(param), params[param]);
  }, dataPath);
}

function generateUtils(data, props) {
  var plugins = data.plugins.map(function (pluginTupple) {
    return pluginTupple[0](pluginTupple[1], props);
  });
  var converters = chain(function (plugin) {
    return plugin.converters || [];
  }, plugins);
  var utils = {
    get: exist.get,
    toReactComponent: function toReactComponent(jsonml) {
      return toReactElement(jsonml, converters);
    }
  };
  plugins.map(function (plugin) {
    return plugin.utils || {};
  }).forEach(function (u) {
    return Object.assign(utils, u);
  });
  return utils;
}

function defaultCollector(_x) {
  return _defaultCollector.apply(this, arguments);
}

function _defaultCollector() {
  _defaultCollector = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(nextProps) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", nextProps);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _defaultCollector.apply(this, arguments);
}

module.exports = function getRoutes(data) {
  function templateWrapper(template) {
    var dataPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var Template = require("/Users/jacob/Desktop/MyProject/kebisheng/theme/template".concat(template.replace(/^\.\/template/, '')));

    return function (nextState, callback) {
      var propsPath = calcPropsPath(dataPath, nextState.params);
      var pageData = exist.get(data.markdown, propsPath.replace(/^\//, '').split('/'));
      var utils = generateUtils(data, nextState);
      var collector = (Template["default"] || Template).collector || defaultCollector;
      var dynamicPropsKey = nextState.location.pathname;

      var nextProps = _objectSpread(_objectSpread({}, nextState), {}, {
        themeConfig: themeConfig,
        data: data.markdown,
        picked: data.picked,
        pageData: pageData,
        utils: utils
      });

      collector(nextProps).then(function (collectedValue) {
        try {
          var Comp = Template["default"] || Template;
          Comp[dynamicPropsKey] = _objectSpread(_objectSpread({}, nextProps), collectedValue);
          callback(null, Comp);
        } catch (e) {
          console.error(e);
        }
      })["catch"](function (err) {
        var Comp = NotFound["default"] || NotFound;
        Comp[dynamicPropsKey] = nextProps;
        callback(err === 404 ? null : err, Comp);
      });
    };
  }

  var themeRoutes = JSON.parse('[{"path":"/","component":"./template/Archive"},{"path":"/posts/:post","dataPath":"/:post","component":"./template/Post"},{"path":"/tags","component":"./template/TagCloud"}]');
  var routes = Array.isArray(themeRoutes) ? themeRoutes : [themeRoutes];

  function processRoutes(route) {
    if (Array.isArray(route)) {
      return route.map(processRoutes);
    }

    return Object.assign({}, route, {
      onEnter: function onEnter() {
        if (typeof document !== 'undefined') {
          NProgress.start();
        }
      },
      component: undefined,
      getComponent: templateWrapper(route.component, route.dataPath || route.path),
      indexRoute: route.indexRoute && Object.assign({}, route.indexRoute, {
        component: undefined,
        getComponent: templateWrapper(route.indexRoute.component, route.indexRoute.dataPath || route.indexRoute.path)
      }),
      childRoutes: route.childRoutes && route.childRoutes.map(processRoutes)
    });
  }

  var processedRoutes = processRoutes(routes);
  processedRoutes.push({
    path: '*',
    getComponents: templateWrapper('./template/NotFound')
  });
  return processedRoutes;
};