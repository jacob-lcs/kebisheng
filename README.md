# 毕昇

[![](https://img.shields.io/travis/benjycui/bisheng.svg?style=flat-square)](https://travis-ci.org/benjycui/bisheng)
[![Build status](https://ci.appveyor.com/api/projects/status/lu5ut8vphqdfbxhi?svg=true)](https://ci.appveyor.com/project/benjycui/bisheng)
[![npm package](https://img.shields.io/npm/v/bisheng.svg?style=flat-square)](https://www.npmjs.org/package/bisheng)
[![NPM downloads](http://img.shields.io/npm/dm/bisheng.svg?style=flat-square)](https://npmjs.org/package/bisheng)
[![Dependency Status](https://david-dm.org/benjycui/bisheng.svg?style=flat-square)](https://david-dm.org/benjycui/bisheng)

中文 | [English](https://github.com/jacob-lcs/kebisheng/blob/master/README-US.md)

> [毕胜](https://en.wikipedia.org/wiki/Bi_Sheng)是中国历史上第一个的可移动式技术的发明家。

`bisheng ` 旨在使用 [React](https://facebook.github.io/react/) 将 [Markdown](https://en.wikipedia.org/wiki/Markdown)（以及其他带有转换器的静态文件）转换为静态网站和博客。

## 用 BiSheng 建立的网站

* [A simple blog](http://benjycui.github.io/bisheng/)
* [Ant Design](http://ant.design)
* [Ant Motion](http://motion.ant.design)
* [Ant Design Mobile](http://mobile.ant.design/)
* [Ant Financial Design Platform](https://design.alipay.com/)
* [React AMap](https://elemefe.github.io/react-amap/articles/start)

您可以使用依赖 BiSheng 建立的出色网站创建PR，以扩展此列表。

## 特性

`bisheng` 基于 [dora](https://github.com/dora-js/dora) & [webpack](https://webpack.github.io/) & [React](https://facebook.github.io/react/) & [react-router](https://github.com/ReactTraining/react-router), 它具有以下功能：

* 支持 [`browserHistory`](https://github.com/ReactTraining/react-router/blob/v3/docs/API.md#browserhistory), 在 [GitHub Pages](https://pages.github.com/) 也是如此
* MarkDown 数据懒加载
* [插件](https://github.com/benjycui/bisheng/blob/master/docs/plugin.md)系统可扩展默认行为
* SEO 的服务器端渲染。
* 支持 [`react-helmet`](https://github.com/nfl/react-helmet) and [`react-document-title`](https://github.com/gaearon/react-document-title)，更好的 SEO.

## 大图

![Big picture of BiSheng](https://raw.githubusercontent.com/benjycui/bisheng/master/big-picture.jpg)

### 文章

* [bisheng-sourceCode-plugin](https://github.com/liangklfangl/bisheng-sourceCode-plugin)

## 使用方法

安装：

```bash
npm install --save-dev bisheng
```

在 [npm scripts](https://docs.npmjs.com/misc/scripts ) 中添加 `start`  命令

```json
{
  "scripts": {
    "start": "bisheng start"
  }
}
```

创建 `bisheng.config.js`, 否则 `bisheng` 将会使用默认配置：

```js
module.exports = {
  source: './posts',
  output: './_site',
  theme: './_theme',
  port: 8000,
};
```

**小帖士：** 请确保 `source` 和 `theme` 文件夹存在，并且 `theme` 文件夹不应该为空。如果你不知道如何开发一个主题，直接使用 [bisheng-theme-one](https://github.com/benjycui/bisheng/tree/master/packages/bisheng-theme-one) 就可以了。[这里](https://github.com/benjycui/bisheng/tree/master/packages/bisheng-example) 是一个简单的 Demo。

现在直接运行 `npm start` 就可以了。

## 文档

### CLI

我们可以全局安装 `bisheng` 作为一个终端命令，通过 `bisheng -h` 获取帮助。但是，我们还是更建议你将 `bisheng` 作为 `devDependencies` 进行安装。

```bash
$ npm install -g bisheng
$ bisheng -h
  Usage: bisheng [command] [options]

  Commands:

    start [options]     to start a server
    build [options]     to build and write static files to `config.output`
    gh-pages [options]  to deploy website to gh-pages
    help [cmd]          display help for [cmd]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

### 配置

`bisheng` 将会读取 `bisheng.config.js` 作为它的配置文件，但是我们可以通过 `--cinfig` 命令来设置配置文件的名字，就像这样：`bisheng --config another.config.js`

`bisheng.config.js` 的内容就像这样。

```js
module.exports = {
  port: 8000,
  source: './posts',
  output: './_site',
  theme: './_theme',
  htmlTemplate: path.join(__dirname, '../template.html'),
  devServerConfig: {},
  webpackConfig(config) {
    return config;
  },
  hash: false,

  entryName: 'index',
  root: '/',
};
```

#### port: Number

> default: 8000

设置启动本地服务的端口号。

#### source: String | Array[String] | Object{ [category]: String | Array[String]}

> default: './posts'

设置 MarkDown 文件的位置。

并且 `source` 中所有的 MarkDown 文件都会被解析成结构化数据，例如：

```bash
posts
└── dir1
  ├── a.md
  └── b.md
```

将会输出一个 MarkDown 数据树。

```js
{
  dir1: {
    a: {...},
    b: {...},
  },
}
```

并且每一个 MarkDown 文件都会被解析成 MarkDown 数据。实际上，MarkDown 数据是 [mark-twain](https://github.com/benjycui/mark-twain) 的返回值，然后他会被插件处理。

#### exclude: RegExp

> default: null

如果你想在 `source` 文件夹中排除一些文件，直接使用 `exclude`，然后毕昇就会不解析符合 `exclude` 的文件。

#### output: String

> default: './_site'

设置 `bisheng` 生成文件 (HTML & CSS & JavaScript) 的位置。

#### theme: String

> default: './_theme'

设置主题目录，他也可以是一个 npm 包的名称。

[**More about theme**](https://github.com/benjycui/bisheng/tree/master/docs/theme.md).

* [bisheng-theme-one](https://github.com/benjycui/bisheng/tree/master/packages/bisheng-theme-one)

#### themeConfig: any

> undefined

你的主题提供的一组配置项，并且你的主题会从  `props.themeConfig` 中读取配置。

> 小贴士: `themeConfig` 将在传递到 props 之前被 `JSON.stringify`， 所以你不能通过`themeConfig`传递函数或者正则表达式。

#### htmlTemplate: String

> default: [`bisheng/lib/template.html`](https://github.com/benjycui/bisheng/blob/master/packages/bisheng/src/template.html)

毕昇根据这个 HTML 模板去生成界面。

**小贴士:** 模板将会被 [nunjucks](https://mozilla.github.io/nunjucks/) 解析, 并且你可以在模板中使用下面的变量：

* [`root`](https://github.com/benjycui/bisheng#root-string)
* [htmlTemplateExtraData](#htmltemplateextradata-object) 的所有属性

#### htmlTemplateExtraData: Object

> default: `{}`

生成 [htmlTemplate](#htmltemplate-string) 的额外数据。

#### devServerConfig: Object

> default: {}

你可以查阅 [webpack-dev-server's documentation](https://webpack.js.org/configuration/dev-server/)

#### postcssConfig: Object

```js
default: {
    plugins: [
      rucksack(),
      autoprefixer({
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
      }),
    ],
  }
```


你可以查阅 [webpack postcss-loader's documentation](https://webpack.js.org/loaders/postcss-loader/#options)

#### webpackConfig: (config) => config

> default: (config) => config

为了修改 webpack 配置, 你可以像 [这样](https://github.com/ant-tool/atool-build#配置扩展) 拓展配置。

#### transformers: Object[]

> [{ test: /\.md$/, use: [MarkdownTransformer](https://github.com/benjycui/bisheng/blob/master/packages/bisheng/src/transformers/markdown.js) }]

用于转换静态文件的转换器列表。

#### entryName: String

> default: 'index'

webpack将生成的文件的名称，比如 `[entryName].js` & `[entryName].css`.

#### root: String

> default: '/'

如果网站将部署在一个域的子目录下 (就像 `http://benjycui.github.io/bisheng-theme-one/`)，我们必须设置它 (例如 `/bisheng-theme-one/`).

## License

MIT