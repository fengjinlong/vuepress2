## 搭建vue
> package.json
```
{
  "name": "testWebpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "webpack-cli": "^3.3.9"
  },
  "devDependencies": {
    "@babel/plugin-transform-runtime": "^7.6.2",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-polyfill": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-stage-3": "^6.24.1",
    "clean-webpack-plugin": "^3.0.0",
    "cross-env": "^6.0.3",
    "css-loader": "^3.2.0",
    "file-loader": "^4.2.0",
    "happypack": "^5.0.1",
    "html-webpack-plugin": "^3.2.0",
    "node-sass": "^4.13.0",
    "progress-bar-webpack-plugin": "^1.12.1",
    "speed-measure-webpack-plugin": "^1.3.1",
    "style-loader": "^1.0.0",
    "stylus": "^0.54.7",
    "stylus-loader": "^3.0.2",
    "uglifyjs-webpack-plugin": "^2.2.0",
    "vue": "^2.6.10",
    "vue-loader": "^15.7.1",
    "vue-style-loader": "^4.1.2",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.41.2",
    "webpack-build-notifier": "^2.0.0",
    "webpack-dashboard": "^3.2.0",
    "webpack-dev-server": "^3.9.0"
  },
  "scripts": {
    "dev": "cross-env --mode=development webpack-dev-server --hot",
    "build": "cross-env webpack --mode=production  --progress --hide-modules"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```
> webpack.config.js
```
const { resolve } = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
let VueLoaderPlugin = require('vue-loader/lib/plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
// 压缩设置缓存
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 多核

const HappyPack = require('happypack')
const os = require('os')
// 开辟一个线程池
// 拿到系统CPU的最大核数，happypack 将编译工作灌满所有线程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

// 体验
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');


console.log(1)
console.log(process.env)
const config = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
    ],
  },
  mode: process.env.NODE_ENV,
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, 'dist'),
    // chunkFilename: '[name].bundle.js',
    filename: 'bundle.js'
  },
  performance: {

    hints: false

  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    port: 7000,
    historyApiFallback: true
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ],
      },
      // {
      //   test: /(\.jsx|\.js)$/,
      //   use: {
      //     loader: "babel-loader"
      //   },
      //   exclude: /node_modules/
      // },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'happypack/loader?id=js',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      { test: /\.vue$/, loader: 'vue-loader' }

    ]
  },
  devtool: '#eval-source-map',
  plugins: [
    
    new VueLoaderPlugin(),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      // filename: 'index.html',//生成的文件名
      template: './index.html',//指定打包压缩的文件
      minify: {
        removeComments: true,//清除注释
        collapseWhitespace: true//清理空格
      }
    }),
    new CleanWebpackPlugin(),
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      // logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true
    }),
    new ProgressBarPlugin()
  ]
}

module.exports = smp.wrap(config)
```
> main.js
```
import Vue from 'vue';
import App from './App.vue'

const root = document.createElement('div') //创建div节点
document.body.appendChild(root)
new Vue({
  render: h => h(App)
}).$mount(root)
```