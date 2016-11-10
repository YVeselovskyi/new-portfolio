const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './public/assets/js/main.js',
    output: { path: __dirname + '/public/assets/js/bundle' , filename: 'bundle.js' },
    module: {
        loaders: [{
            test: /.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }]
    },
};