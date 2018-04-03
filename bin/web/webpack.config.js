const path = require('path');
const SVGO = require('svgo');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const svgo = new SVGO();
const htmlConfig = new HtmlPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

const copyConfig = new CopyPlugin([{
  context: 'src/assets',
  from: '**/*.!(svg)',
  to: 'assets',
}]);

const svgCopyConfig = new CopyPlugin([{
  context: 'src/assets',
  from: '**/*.svg',
  to: 'assets',
  // eslint-disable-next-line no-shadow
  transform: async (content, path) => {
    const { data } = await svgo.optimize(content, { path });
    return data;
  },
}]);

const env = new webpack.EnvironmentPlugin({
  NODE_ENV: '',
  NODE_DAEMON_API: 'http://localhost:3000',
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('../www'),
    filename: 'web.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },

  plugins: [
    htmlConfig,
    svgCopyConfig,
    copyConfig,
    env,
  ],

  devServer: {
    contentBase: path.join(__dirname, '../www'),
    historyApiFallback: true,
  },

  devtool: process.env.NODE_ENV === 'production' ? 'none' : 'eval-source-map',
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(new UglifyPlugin());
}
