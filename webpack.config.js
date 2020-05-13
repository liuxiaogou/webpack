const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin'); 

//htmlwebpackplugin会在打包结束后，⾃动⽣成⼀个html⽂件，并把打包⽣成的js模块引⼊到该html中,作为插件使用，详情见代码
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// clean-webpack-plugin用户清空之前的打包文件
function resolve (dir) {
    return path.join(__dirname, dir)
  }
module.exports = {
    devtool:"source-map",  //开启或者关闭 source-map   关闭:none  如果不写这个属性，开发环境默认打开，生产环境默认关闭 
    context:process.cwd(), //上下文路径
    entry:'./src/main.ts', //入口文件  可以使数组或者对象
    output:{
        filename:'[hash:6].js',   //多入口文件需要使用占位符 [name].js  , [name][hash:6].js [name][chunkhash].js
        path:resolve('./build'),//__dirnam是返回当前文件的绝对路径， 文件存放目录的拼接，有则替换，没有则生成
       
    },
    mode:'development',//development  生产还是开发者模式
    resolve: { //模块（require/import）解析   
        extensions: ['.wasm', '.mjs', '.json','.ts','.js'], // 自动解析确定的扩展,能够使用户在引入模块时不带扩展： 
        alias:{ //创建 import 或 require 的别名，来确保模块引入变得更简单
            '@': resolve('src') // 引入模块时使用@来代替src  参考官网 https://www.webpackjs.com/configuration/resolve/
        }
    },
    module:{
        rules:[
            {
                test:/\.ts$/,
                use:'ts-loader',
                include:resolve('src'), //匹配特定条件。一般是提供一个字符串或者字符串数组，但这不是强制的。
                exclude:/node_modules/  //排除特定条件。一般是提供一个字符串或字符串数组，但这不是强制的。
            },
           // rule.loader是rule.use[{ loader }]的简写
             { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
              //将编译后的代码映射会原始源代码,方便查看是哪里出的错
              //追踪到错误和警告在源代码中的原始位置
        ]

    },
    plugins:[
         new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            filename:'index.html',
            template:'./index.html'

        }),
        
    ],
    devServer:{
        hot :true,  //是否需要热更新
        // open:true, //是否启动后直接在默认浏览器打开
        // useLocalIp:true,  //本机ip启动服务  打包成功但是 浏览器拒绝访问
        host:'0.0.0.0',   // 主机  默认是 localhost
        port:8090,//端口号 0-65535
        quiet: true //除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    }

}