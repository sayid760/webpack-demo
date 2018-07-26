# webpack.config配置
webpack本身是打包js的（不支持css,html,图片），但是如有打包css、html、图片...怎么办？必须要进行相关配置，也是基础CommonJs的规范
## 安装
```javascript
//全局安装
npm install webpack -g
npm install webpack-cli -g

//生成package.json
npm init

//局部安装
npm install webpack  webpack-cli -S
```
## wenpack四个核心概念
- 入口（entry）
- 输出（output）
- loader---------->可以将所有类型转换成webpack能打包的东西（webpack本事只打包js）
- 插件（plugins）--------->打包和优化
   有效的打包或者压缩css,js,html,图片
   一般插件和loader配合使用
```javascript
module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'); //__diename是目录，“dist”是打包放置的文件名，意思是把目录和文件名链接起来
    }
}
```
## 打包
webpack app.js --output bundle.js  //如果没有config webpack.config.js文件的打包方式
webpack --config webpack.conf.js  //这种是有webpack.config.js文件的情况下，而且要指定文件的情况下，没指定就查找默认的文件

//如果打包开发环境和生成环境的
压缩： webpack --mode production 
未压缩： webpack --mode development
