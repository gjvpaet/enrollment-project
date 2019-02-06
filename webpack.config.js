const path = require('path');
const webpack = require('webpack');

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
    context: __dirname,
    devtool: debug ? 'inline-sourcemap' : false,
    entry: {
        app: ['babel-polyfill', './src/app.js']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'env', 'stage-0'],
                    plugins: [
                        'react-html-attrs',
                        'transform-decorators-legacy',
                        'transform-class-properties',
                        'transform-async-to-generator'
                    ]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    output: {
        path: `${__dirname}/public`,
        filename: '[name].min.js'
    },
    plugins: debug
        ? []
        : [
              new webpack.optimize.OccurrenceOrderPlugin(),
              new webpack.DefinePlugin({
                  'process.env': {
                      NODE_ENV: JSON.stringify('production')
                  }
              }),
              new webpack.optimize.UglifyJsPlugin({
                  compress: {
                      warnings: false,
                      unused: false
                  },
                  comments: false,
                  mangle: false,
                  sourceMap: false
              })
          ]
};
