const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    devServer: {
        static: './dist',
        devMiddleware: {
            index: true,
            mimeTypes: { phtml: 'text/html' },
            publicPath: '/dist',
            serverSideRender: false,
            writeToDisk: true,
        },
    },
    plugins: [
        new WriteFilePlugin({
            test: /^(?!.*(hot)).*/,
          }),
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
};