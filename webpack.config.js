const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: './src/homework2.ts',
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./dist/index.html"
        })
    ]
};
