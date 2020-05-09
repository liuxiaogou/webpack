const path = require('path');
module.exports = {
    context:process.cwd(),
    entry:'./src/main.ts',
    output:{
        filename:'index.js',
        path:path.resolve(__dirname,'./build'),
       
    },
    mode:'development',
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json','.ts']
    },
    module:{
        rules:[
            {
                test:/\.ts$/,
                use:'ts-loader',
                exclude:/node_modules/
            }
        ]

    }
}