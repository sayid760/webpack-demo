const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = {
    mode: 'none',
    entry: {
        index: './src/js/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: DIST_PATH
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use: ['style-loader','css-loader']
               },
            {
                test:/\.(jpg|png|jpeg|gif)$/, //图片处理
                use: 'file-loader?limit=1024&name=./img/[name].[ext]'
                //use: 'file-loader'
            },
            {
                test:/\.(woff|ttf|svg|eot|xttf|woff2)$/,  //字体图标处理
                use: 'file-loader?limit=1024&name=./fonts/[name].[ext]'
            },
            { 
                test: /\.html$/, 
                use: 'html-withimg-loader'
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
