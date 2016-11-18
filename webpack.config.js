const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        build: path.join(__dirname, 'app/src/app.js')
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'controllers': path.join(__dirname, 'app/src/components/controllers'),
            'templates': path.join(__dirname, 'app/src/components/templates'),
            'src': path.join(__dirname, 'app/src')
        },
        extensions: ['', '.js', '.ng', '.css', '.json', '.html'],
        fallback: [path.join(__dirname, 'app/node_modules')]
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.html$/,
            loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    devServer: {
        contentBase: './dist',
        inline: true,
        host: '0.0.0.0'
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: 'app/src/index.html'
        })
    ]
}