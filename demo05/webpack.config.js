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
    plugins: [
        new HtmlWebpackPlugin({
            template:"./src/index.html", //模板来源文件
            // filename:"a.html"  //生成的模板文件的名字
            minify:{//压缩 去除引号、注释、空属性、空格
                removeAttributeQuotes:true,//去除引号
                removeComments:true,//去除注释
                removeEmptyAttributes:true,//去除空属性
                collapseWhitespace:true//去除空格
              }
          })
    ],
    devServer: {
        contentBase: DIST_PATH,
        compress: true,
        open: true,
        port: 3000
    }
};
