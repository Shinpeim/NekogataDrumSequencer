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
            { test: /\.vue$/, loader: 'vue-loader'},
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader",
            }
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        }
    }
};

if ( process.env.PRODUCTION ) {
   config.plugins.push(
       new webpack.optimize.UglifyJsPlugin({
           compress: {
               drop_console: true,
           }
       })
   );
}

module.exports = config;
