const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
            .set("views", resolve("src/views"))
            .set("network", resolve("src/network"))
        // .set("base", resolve("baseConfig"))
        // .set("public", resolve("public"));
        config.externals = {
            BMap: 'BMap',
            BMapGL: "BMapGL"
        }
    },
    configureWebpack: {
        externals: {
            BMapGL: "BMapGL"
        }
    },
    //处理sass
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'sass',
            patterns: [
                path.resolve(__dirname, './src/assets/css/*.scss')      //你的.scss文件所在目录
            ]
        }
    },
    /*     devServer: {
            proxy: {
                '/api': {
                    // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
                    target: 'http://127.0.0.1:8100',
                    // 允许跨域
                    changeOrigin: true,
                    ws: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            }
        } */
}




/* module.exports = {
    outputDir: 'dist',  //build输出目录
    lintOnSave: false, //是否开启eslint
    configureWebpack: {
        resolve: {
            extensions: [],
            alias: {
                '@': 'src',
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'views': '@/views',
                'network': '@/network',
            }
        }
    }
} */