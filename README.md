### 使用
```markdown
//安装包
npm install

//打包
npm run build

//启动服务器
npm run dev
```
具体查看package.json使用

## webpack.config配置
webpack本身是打包js的（不支持css,html,图片），但是如有打包css、html、图片...怎么办？必须要进行相关配置，也是基础CommonJs的规范
### 安装
```markdown
//全局安装
npm install webpack -g
npm install webpack-cli -g

//生成package.json
npm init

//局部安装
npm install webpack  webpack-cli -S
```
### wenpack四个核心概念
- 入口（entry）
- 输出（output）
- loader---------->可以将所有类型转换成webpack能打包的东西（webpack本事只打包js）
- 插件（plugins）--------->打包和优化
   有效的打包或者压缩css,js,html,图片
   一般插件和loader配合使用
```markdown
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
### 打包
webpack app.js --output bundle.js  //如果没有config webpack.config.js文件的打包方式
webpack --config webpack.conf.js  //这种是有webpack.config.js文件的情况下，而且要指定文件的情况下，没指定就查找默认的文件

//如果打包开发环境和生成环境的
压缩： webpack --mode production 
未压缩： webpack --mode development



## 演示
1. [webpack-dev-server（本地服务）](demo01)
2. [css-loader 、less-loader](demo02)
3. [postcss-loader、autoprefixer（自动补充css前缀）](demo03)
4. [file-loader （打包html 、字体图标）](demo04)
5. [ html-webpack-plugin  （js自行插入到html中）](demo05)
6. [html-withimg-loader （解决html里的img路径不对）](demo06)
7. [ extract-text-webpack-plugin  （将 CSS 提取到一个文件中）](demo07)
8. [mini-css-extract-plugin  （将 CSS 提取到一个文件中）](demo08)
9. [引入第三方文件（jquery,boostrap）](demo09)
10. [babel](demo10)
11. [splitChunksPlugin（提交公共js）](demo11)
12. [html-loader （实现资源复用）](demo12)

###  Demo1：webpack-dev-server（本地服务）
```markdown
//安装
npm i webpack-dev-server --save-dev

//webpack.config.js
  devServer:{
    contentBase:"./public",  //本地服务器路径
    //port:"8080", //端口（默认8080）
    inline:true//实时刷新
}

//package.json
"scripts": {
    "start": "webpack --mode development",
    "dev": "webpack-dev-server --open --inline"         
},
```
或者
 "start": "webpack-dev-server --mode development --open",
  "build": "webpack --mode production"

--open 自动打开 --inline 实时刷新

###  Demo2： css-loader 、less-loader
```markdown
npm i  style-loader  css-loader --save-dev
module: {
    rules: [
      { 
        test: /\.css$/, 
        // use: 'css-loader'  //单个时
        use: ['style-loader','css-loader'] //多个loader,从右向左处理
      }
    ]
  }
```
加上 less-loader：
```markdown
npm i  style-loader  css-loader less less-loader --save-dev
module: {
    rules: [
        { 
            test: /\.css$/, 
            // use: 'css-loader'  //单个时
            use: ['style-loader','css-loader'] 
        },
        {
            test: /\.less$/,
            use: [ {
                loader: "style-loader" //3、如果要css嵌套在页面中要用style-loader
                }, {
                loader: "css-loader"  //2、然后交给css处理
                }, {
                loader: "less-loader" //1、先把less转换成css
                }
            ]
        }
    ]
}
```
如果想分离less文件就用extract-text-webpack-plugin（或mini-css-extract-plugin）这个插件
```markdown
module: {
    rules: [
    {
        test:/\.less$/,
        use: extracTextPlugin.extract({
            use:[{
                loader:"css-loader"
                },
                {
                loader:"less-loader"
                }
            ],
            fallback:"style-loader"
        })
    }
   ]
},
plugins:[
	new ExtractTextPlugin('./css/[name].css')
]
```
###  Demo3：postcss-loader、autoprefixer（自动补充css前缀）
```markdown
//安装
npm i postcss-loader autoprefixer --save-dev

//postcss.config.js
module.exports = {
    plugins : [
        require('autoprefixer')({
            browsers : ['last 5 versions']
        })
    ]
}

//webpack.config.js
//在postcss-loader中引入autoprefixer插件
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
}
```


###  Demo4： file-loader （打包html 、字体图标）  
```markdown
npm i  file-loader --save-dev
module: {
    rules: [
      {
        test:/\.(jpg|png|jpeg|gif)$/, //图片处理
        use: 'file-loader?limit=1024&name=./img/[name].[ext]'
        //use: 'file-loader'
       },
       {
        test:/\.(woff|ttf|svg|eot|xttf|woff2)$/,  //字体图标处理
        use: 'file-loader?limit=1024&name=./fonts/[name].[ext]'
       }
    ]
  }
```

###  Demo5： html-webpack-plugin  （js自行插入到html中）
```markdown
//安装
npm i html-webpack-plugin --save-dev

//引入
const HtmlWebpackPlugin=require('html-webpack-plugin');

//配置
plugins:[
  new ExtractTextPlugin('./css/[name].css'),
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
]
```
参考https://segmentfault.com/a/1190000008590102

###  Demo6： html-withimg-loader （解决html里的img路径不对） 
如果入口文件index.js中没有引入css（css中有img），就不会自动打包生成img，于是就获取不到img图片，那么html-withimg-loader就可以打包一份图片路径
```markdown
//安装
npm i html-withimg-loader --save-dev

//配置
module: {
    rules: [
      { 
        test: /\.html$/, 
        use: 'html-withimg-loader'
      }
    ]
  }
```

###  Demo7： extract-text-webpack-plugin  （将 CSS 提取到一个文件中）  
把css单独打包到文件里
```markdown
//安装
npm i extract-text-webpack-plugin@next --save-dev

//引入
const ExtractTextPlugin=require('extract-text-webpack-plugin');

//配置
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
  plugins:[
    new ExtractTextPlugin('./css/[name].css')
  ]
```
###  Demo8： mini-css-extract-plugin  （将 CSS 提取到一个文件中）  
```markdown
//安装
npm i mini-css-extract-plugin css-loader --save-dev

//引入
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//配置
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
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
```

###  Demo9：引入第三方文件（jquery,boostrap）
方法一：  
```markdown
//安装
npm i jquery -S

//引入
import $ from 'jquery'
$('body').css('background','red');
```
方法二：（cdn上的）
```markdown
//index.html
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>

//webpack.config.js
//项目里配置了自动提取node_modules里用到的模块如jquery，也可以在原模板里面通过第三方cdn引入，又是另一种配置了。在 webpack.base.conf.js利配置externals后webpack就不会去打包配置模块
  //externals就是webpack可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问。
  externals: {
    'jquery': 'window.jQuery'
  },
```


###  Demo10： babel   
核心：babel-core
功能：babel-loader   babel-preset-env   babel-preset-react （使用babel编译react）
第一种方法：
```markdown
//安装
npm i babel-core babel-loader   babel-preset-env   babel-preset-react --save-dev

//配置
 { 
     test: /\.(js|jsx)$/,
     use: {
         loader:"babel-loader",
         options:{
             "presets":['env','react']
         }
     },
     exclude:/node_modules/
 },
```
第二种方法：
新建.babelrc
```markdown
//.babelrc 
{
    "presets": [
      "env",
      "react"
    ]
}

//webpack.config.js   只是把上面的options去掉
 { 
     test:  /\.(js|jsx)$/, 
     use: {
     loader:"babel-loader",
     },
     exclude:/node_modules/
 }
```
文档：https://babeljs.io/docs/en/plugins#pluginpresets-options.

###  Demo11： splitChunksPlugin（提交公共js）  
```markdown
splitChunksPlugin 默认配置项 :
{
    "chunks": "all", //all, async, initial 三选一, 插件作用的chunks范围
    "minSize": 0, // 最小尺寸
    "misChunks": 1, //最小chunks
    "maxAsyncRequests": 1, //最大异步请求chunks
    "maxInitialRequests": 1, //最大初始化chunks
    "name": undefined, //split 的 chunks name
    "automaticNameDelimiter": "~", //如果不指定name，自动生成name的分隔符（‘runtime~[name]’）
    "filename": undefined, 
    "cacheGroups": {} //字面意思缓存组，主要配置在这里
}

cacheGroups配置项:
{
    "priority": "缓存优先级权重",
    "name": "split 出来的 chunk 的名字",
    "chunks": "应该用范围",
    "enforce": "未知",
    "minSize": "最小尺寸",
    "minChunks": "最小chunks",
    "maxAsyncRequests": "",
    "maxInitialRequests": "",
    "filename": "最后output的文件名",
    "reuseExistingChunk": "未知"
}
```
```markdown
new webpack.optimize.SplitChunksPlugin({
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        //打包重复出现的代码
        vendor: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0, 
          name: 'vendor'
        },
        //打包第三方类库
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: Infinity
        }
      }
    }),
    new webpack.optimize.RuntimeChunkPlugin({
      name: "manifest"
    }),
```


###  Demo12：html-loader （实现资源复用）
解决jquery的引用，每次都要在页面上输入一遍，可以把它提取出来作为一个公共的部分（头部和尾部），用ejs需要html-loader作为中介
view <br />
├── layout <br />
│   ├── header.html <br />
│   └── footer.html <br />
├── index.html <br />
└── login.html <br />
```markdown
//安装
npm i html-loader --save-dev

//index.html
<%= require('html-loader!./layout/header.html')%>
<%= require('html-loader!./layout/footer.html')%>

//webpack.config.js
// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title){ 
    return { 
        template : './src/view/' + name + '.html', 
        filename : 'view/' + name + '.html', 
        // favicon : './favicon.ico', 
        title : title, 
        inject : true, 
        hash : true, 
        chunks : ['common', name]
     }; 
};

plugins: [
    // html模板的处理 
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')), 
    new HtmlWebpackPlugin(getHtmlConfig('login', '商品列表'))
],
```

持续更新...



