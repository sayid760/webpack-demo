const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        rules: [
          {
            test:/\.css$/,
            use:ExtractTextPlugin.extract({
                fallback:"style-loader",
                use:[{
                    loader:'css-loader',
                    options:{
                      minimize:true
                      //css压缩
                    }
                }],
                publicPath:"../"   //css里面的图片路径都正常
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
