/**
  This program and the accompanying materials are made available under the terms of the 
  Eclipse Public License v2.0 which accompanies this distribution, and is available at
  https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright IBM Corporation 2018
**/
const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');
const packageJson = require('./package.json');
var cors = require('cors');

const timestamp = new Date().toISOString().slice(0, 19).replace(new RegExp(':', 'g'), '')
    .replace(new RegExp('-', 'g'), '')
    .replace('T', '.');
const VERSION = packageJson.version;

module.exports = {
    devtool: debug ? 'inline-sourcemap' : false,
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        port: 7777
     },
    entry: path.join(__dirname, 'index.js'),
    plugins: debug ? [] : [
        new webpack.DefinePlugin({
            'process.env.REACT_SYNTAX_HIGHLIGHTER_LIGHT_BUILD': true,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            sourcemap: false,
            compress: {
                screw_ie8: true,
                warnings: false,
            },
        }),
        new WebpackWarPlugin({
            archiveName: `atlas-ui-${VERSION}-${timestamp}.war`,
            additionalElements: [
                { path: 'index.html', destPath: 'index.html' },
            ],
        }),
    ],
    output: {
        path: path.join(__dirname, ''),
        filename: 'app.min.js',
    },
    module: {
       rules: [
          {
             loader: 'babel-loader',
             test: /\.js$/,
             exclude: /node_modules/
          }
       ]
    },
 };