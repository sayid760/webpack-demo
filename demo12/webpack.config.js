const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, 'dist');

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title){ 
    return { 
        template : './src/view/' + name + '.html', 
        filename : 'view/' + name + '.html', 
        favicon : './favicon.ico', 
        title : title, 
        inject : true, 
        hash : true, 
        chunks : ['common', name]
     }; 
};


module.exports = {
    mode: 'none',
    entry: {
        "index": ['./src/js/index.js'],
        "login": ['./src/js/index.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: DIST_PATH
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: './src/index.html',
    //         inject: true
    //     })
    // ],
    //项目里配置了自动提取node_modules里用到的模块如jquery，也可以在原模板里面通过第三方cdn引入，又是另一种配置了。在 webpack.base.conf.js利配置externals后webpack就不会去打包配置模块
    //externals就是webpack可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问。
    externals: {
        'jquery': 'window.jQuery'
    },
    plugins: [
        // html模板的处理 
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')), 
        new HtmlWebpackPlugin(getHtmlConfig('login', '商品列表'))
     ],
    devServer: {
        contentBase: DIST_PATH,
        compress: true,
        open: true,
        port: 3000
    }
};
