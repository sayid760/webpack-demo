const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
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
                 exclude: /(node_modules)/,
                 use: [
                     'style-loader', {
                         loader : 'css-loader',
                         options : {
                             importLoaders : 1
                         },
                     },
                     'postcss-loader'
                 ]
            },
            {
                test:/\.less$/,
                use: ExtractTextPlugin.extract({
                    use:[
                        {
                            loader:"css-loader"
                        },
                        'postcss-loader',
                        {
                            loader:"less-loader"
                        }
                    ],
                    fallback:"style-loader"
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./css/[name].css'),
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
