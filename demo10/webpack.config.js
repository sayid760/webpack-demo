const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
            test:/\.(js|jsx)$/,
            loader:"babel-loader",
            exclude:/node_modules/
        }
    ]
    },
    plugins: [
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
