var webpack = require('webpack');
var path = require('path');
var config_webpath_dev = require('./configs/webpack_dev');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ext2 = require('extract-text-webpack-plugin');
var extractSCSS = new ExtractTextPlugin('build.scss');
var extractCSS = new ExtractTextPlugin('main.css');
var config = {
    devtool: 'eval',
    entry: __dirname + '/app/App.js',
    resolve: {root: [__dirname + "/sass"]},
    output: {
        path: __dirname + '/public',
        filename: "bundle.js"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    target: 'node',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            },
            { test: /\.scss$/i, loader: extractSCSS.extract('style','css!sass')},
            { test: /\.css$/i, loader:extractCSS.extract('style','css')}, 
            {
                test: /\.json$/,
                loader: 'json-loader',
              },
            {test: /\.(png|jpg)$/, loader: 'file-loader'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
        ]
    },
    devServer: {
        contentBase: "./public",
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: config_webpath_dev.domain,
        port: config_webpath_dev.port
    },
}

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
    config.devtool = false;
    config.plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({comments: false}),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        }),
        extractSCSS,
        extractCSS,
        new webpack.DefinePlugin({
          'process.env.BROWSER': JSON.stringify(true),
          'global': {}, // bizarre lodash(?) webpack workaround
          'global.GENTLY': false // superagent client fix
        }),
    ];
}
;

module.exports = config;