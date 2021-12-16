const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devServer: {
        static: './dist',
        devMiddleware: {
            index: true,
            mimeTypes: { phtml: 'text/html' },
            publicPath: '/publicPathForDevServe',
            serverSideRender: true,
            writeToDisk: true,
        },
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
};