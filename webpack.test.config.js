var path = require('path');
var webpack = require('webpack');

const config = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    devtool: 'source-map',
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        ]
    },
    plugins: [
       new webpack.optimize.UglifyJsPlugin({
           compress: {
               drop_console: true,
           }
       })
    ],
};

module.exports = config;
