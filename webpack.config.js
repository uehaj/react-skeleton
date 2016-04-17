var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app:   path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

// common setting
const common = {
    entry: PATHS.app,

    resolve: {
        extensions: ['', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: ['babel'],
                include: PATHS.app
            }
        ],
    },

    output: {
        path: PATHS.build,
        filename: 'build.js'
    },

    plugins: [
        new HtmlwebpackPlugin({
            title: 'Project'
        })
    ]

};

// npm start setting
if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',

        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT
        },

        port : 3000,

        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

// npm build setting
if(TARGET === 'build') {
    module.exports = merge(common, {
    });
}
