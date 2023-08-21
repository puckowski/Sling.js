const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
var path = require('path');

var config = {
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
    },
    context: __dirname + '/src',
    entry: path.join(path.join(__dirname, 'src'), 'todo.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                ecma: undefined,
                warnings: false,
                parse: {},
                compress: {},
                mangle: true,
                module: false,
                output: null,
                toplevel: false,
                nameCache: null,
                ie8: false,
                keep_classnames: undefined,
                keep_fnames: false,
                safari10: false
            },
            extractComments: true,
        })],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './*.html', to: '' },
                { from: './images', to: 'images' },
                { from: './css', to: '' },
                { from: './js', to: '', noErrorOnMissing: true }
            ]
        }),
    ],
    mode: 'development'
};

module.exports = config;
