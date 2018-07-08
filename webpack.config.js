const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => {
  let prodMode = argv.mode === 'production';

  return {
    mode: prodMode ? argv.mode : 'development',

    entry: {
      index: './src/index.js',
      font: './src/font.js'
    },

    devtool: prodMode ? 'source-map' : 'inline-source-map',

    plugins: (() => {
      let devPlugins = [
        new CleanWebpackPlugin(['docs']),
        new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon: './src/image/favicon.ico'
        }),
        new MiniCssExtractPlugin({
          filename: '[name].css',
        }),
      ];

      let prodPlugins = [
        new UglifyJsPlugin({
          sourceMap: true,
          uglifyOptions: {
            compress: {
              drop_console: true
            }
          }
        }),
        new OptimizeCssAssetsPlugin({}),
      ];

      return prodMode ? devPlugins.concat(prodPlugins) : devPlugins;
    })(),

    output: {
      filename: '[name].bundle.js',
      path    : path.resolve(__dirname, 'docs')
    },

    module: {
      rules: [
        {
          test: /\.html$/,
          use : ['html-loader']
        }, {
          test: /\.css$/,
          use : [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ]
        }, {
          test: /\.js$/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }]
        }, {
          test: /\.scss$/,
          use : [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }, {
          test: /\.(ttf|eot|woff|svg|png|jpg|gif)$/,
          use : [{
            loader : 'file-loader',
            options: {
              name      : '[name].[ext]',
              outputPath: function (file) {
                if (/\.(ttf|eot|woff)$/.test(file)) {
                  return 'resources/fonts/' + file;
                }

                if (/\.(svg|png|jpg|gif)$/.test(file)) {
                  return 'resources/images/' + file;
                }

                return 'resources/' + file;
              }
            }
          }]
        }
      ]
    }
  }
};

