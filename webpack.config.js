const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

var config = {
    context: __dirname + '/src', // `__dirname` is root of project and `/src` is source
    entry: {
        app: './todo.js',
    },
    output: {
        path: __dirname + '/dist', // `/dist` is the destination
        filename: 'dist.js', // bundle created by webpack it will contain all our app logic. we will link to this .js file from our html page.
    },
    module: {
        rules: [
            {
                test: /\.js$/, // rule for .js files
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"] // apply this loader for js files
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', // the order is important. it executes in reverse order !
                    'css-loader' // this will load first !
                ]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './*.html', to: '' },
            { from: './images', to: '' },
            { from: './css', to: '' }
        ]),
    ]
};

module.exports = config;