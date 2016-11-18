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
    devServer: {
        inline: true
    }
}