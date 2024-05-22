const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: path.resolve(__dirname, 'client/src/js/index.js'),
      install: path.resolve(__dirname, 'client/src/js/install.js')
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'client/dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'client/index.html'),
        title: 'J.A.T.E'
      }),
      new InjectManifest({
        swSrc: path.resolve(__dirname, 'client/src-sw.js'),
        swDest: 'service-worker.js',
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor',
        background_color: '#272822',
        theme_color: '#31a9e1',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve(__dirname, 'client/src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
