const devMode = process.env.NODE_ENV === 'production';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',

  entry: './src/index.js',

  devtool: 'inline-source-map',

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CleanWebpackPlugin(['docs']),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  output: {
    filename: 'bundle.js',
    path    : path.resolve(__dirname, 'docs')
  },

  module: {
    rules: [{
      test: /\.html$/,
      use: [
        'html-loader'
      ]
    }, {
      test: /\.css$/,
      use : [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        { loader: 'css-loader'},
        {loader: 'postcss-loader'}
      ]
    }, {
      test: /\.scss$/,
      use : [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader'
        },
        'sass-loader'
      ]
    }, {
      test: /\.(ttf|svg|png|jpg)$/,
      use: [
        {
          loader: 'file-loader', options: {
            name: '[name].[ext]',
            outputPath: function (file) {
              if (/\.ttf$/.test(file)) {
                return 'resources/fonts/' + file;
              }

              if (/\.(svg|png|jpg)$/.test(file)) {
                return 'resources/images/' + file;
              }

              return 'resources/' + file;
            }
          }
        }
      ]
    }],

  }
};

