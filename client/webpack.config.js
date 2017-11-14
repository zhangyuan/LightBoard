const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV !== "production"
});

let config = {
  entry: {
    vendors: ['axios', 'vue', 'vue-router', 'vuex', 'normalize.css'],
    main: './src/javascripts/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_bundle.js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    proxy: {
      '/api/': {
        target: 'http://localhost:3000'
      }
    }
  },

  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, "src"),
      loader: "babel-loader"
    },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        }],
      }, {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {}
        }]
      }, {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }, {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader",
            options: {
              minimize: true
            }
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendors",
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
      minify: {collapseWhitespace: true, conservativeCollapse: true}
    }),
    extractSass,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`,
        SERVER_NAME: `"${process.env.SERVER_NAME || '0.0.0.0'}"`
      }
    })
  ]
};

if(process.env.NODE_ENV === 'production') {
  config.plugins.push(new UglifyJSPlugin());
}

module.exports = config;

