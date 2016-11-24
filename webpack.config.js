const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
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
            'views': path.join(__dirname, 'app/src/components/views'),
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
            test: /\.(ng|html|htm)(\?.*)?$/,
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
        new ExtractTextPlugin("style.css"),
        new CopyWebpackPlugin([{
            from: "node_modules/jquery/dist/jquery.js"
        }, {
            from: "app/src/components/zui/js/zui.js"
        }],{
            ignore: [
                // Doesn't copy any files with a txt extension
                '*.txt',
                '*.md'
            ]
        })

    ],
    externals: {"bundle!jquery": "bundledJQuery"}
}