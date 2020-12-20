'use strict';

const MinifyPlugin = require('babel-minify-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Webpack = require('webpack');

const isDev =
  process.env.ASPNETCORE_ENVIRONMENT === 'Development' ||
  process.env.NODE_ENV === 'development';

const cssLoader = {
  loader: 'css-loader',
  options: {
    import: true,
    url: false,
    sourceMap: isDev,
  },
};

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin(),
    new MinifyPlugin(
      {},
      {
        test: /\.js$/,
      }
    ),
  ],
  output: {
    path: __dirname + '/dist', //打包后的文件存放的地方
    filename: '[name].js', //打包后输出文件的文件名
  },
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          cssLoader,
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: isDev ? [] : ['cssnano'],
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          'ts-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.css', '.js', 'less'],
  },
  devtool: isDev ? 'eval-source-map' : false,
  mode: isDev ? 'development' : 'production',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  externals: {
    jquery: 'jQuery',
  },
};
