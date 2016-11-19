const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
            'styles': path.join(__dirname, 'app/src/styles'),
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
        },
        {
            test: /bootstrap\/dist\/js\/umd\//,
            loader: 'imports-loader?jQuery=jquery'
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'imgs/[name].[hash:7].[ext]'
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'fonts/[name].[hash:7].[ext]'
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
        }),
        new ExtractTextPlugin("style.css")
    ],
    externals: {"bundle!jquery": "bundledJQuery"}
}