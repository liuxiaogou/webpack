const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
  }
module.exports = {
    devtool:"source-map",  //开启或者关闭 source-map   关闭:none  如果不写这个属性，开发环境默认打开，生产环境默认关闭 
    context:process.cwd(), //上下文路径
    entry:'./src/main.ts', //入口文件  可以使数组或者对象
    output:{
        filename:'index.js',   //多入口文件需要使用占位符 [name].js  , [name][hash:6].js [name][chunkhash].js
        path:resolve('./build'),//__dirnam是返回当前文件的绝对路径， 文件存放目录的拼接，有则替换，没有则生成
       
    },
    mode:'production',//development  生产还是开发者模式
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

    }
}