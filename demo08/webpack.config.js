const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = {
    mode: 'none',
    entry: {
       index: './src/js/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: DIST_PATH
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
          }
        ]
      },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            chunkFilename: "[id].css"
          }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true
        })
    ],
    devServer: {
        contentBase: DIST_PATH,
        compress: true,
        open: true,
        port: 3000
    }
};
