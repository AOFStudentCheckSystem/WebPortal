const path = require('path')
const webpack = require('webpack')

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
            'components': path.join(__dirname, 'app/src/components'),
            'src': path.join(__dirname, 'app/src')
        },
        extensions: ['','.js','.ng','.css','.json','.html'],
        fallback: [path.join(__dirname, 'app/node_modules')]
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.html$/,
            loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
        }]
    },
    devServer: {
        contentBase: 'dist',
        hot: true
    }
}