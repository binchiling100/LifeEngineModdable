const path = require('path');
const webpack = require("webpack");

module.exports = {
    entry: './src/index.js',
    optimization: {
        minimize: false,
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/js/'),
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
        })
    ]
};