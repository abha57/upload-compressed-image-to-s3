const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');


const srcPath = path.join(__dirname, './src/server');
const commonPath = path.join(__dirname, './src/common');
const distPath = path.join(__dirname, './dist');

module.exports = {
    mode: 'development',
    target: 'node',
    context: srcPath,
    entry: {
        server: srcPath
    },
    output: {
        publicPath: '/',
        filename: '[name].js',
        path: distPath,
    },
    devtool: 'eval-source-map',
    externals: [nodeExternals()],
    node: {
        global: true,
        __dirname: false,
        __filename: false,
        process: true,
        Buffer: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
                test: /\.json$/,
                use: [{
                    loader: 'json-loader',
                }],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
        modules: [
            srcPath,
            commonPath,
            'node_modules',
        ],
        alias: {
            // services: path.resolve(__dirname, '..', 'src/server', 'services'),
            // routes: path.resolve(__dirname, '..', 'src/client', 'routes'),
            // models: path.resolve(__dirname, '..', 'src/client', 'models'),
            // utils: path.resolve(__dirname, '..', 'src/client', 'utils'),
        },
    },
};