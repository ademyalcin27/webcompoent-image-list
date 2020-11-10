
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const libraryName = 'todo';
const outputFile = `${libraryName}.min.js`;


module.exports = {
  entry: {
    index: './src/index.js',
    favorites: './src/favorites.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.style.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: ['/\.style.scss$/', /assets/],
        use: [
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 20000, // Convert images < 8kb to base64 strings
            name: 'img/[hash]-[name].[ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      chunk: ['index'],
      inject: true,
      excludeChunks: ['favorites'],
      template: path.resolve(__dirname, 'index.html'),
    }),
    new HTMLWebpackPlugin({
      filename: 'my-favorites.html',
      chunk: ['favorites'],
      excludeChunks: ['index'],
      inject: true,
      template: path.resolve(__dirname, 'my-favorites.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};