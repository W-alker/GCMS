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