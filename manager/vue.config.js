const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const resolve = dir => {
    return path.join(__dirname, dir);
};
/**
 * 在项目开发的时候将生产环境以及开发环境进行判断
 * 将生产环境中的路径用cdn来进行优化处理
 * 将开发环境中替换为本地的内容，方便处理bug以及开启vueDev
 * 我们可以根据环境变量进行相应的处理，只有在产品的时候，才让插件去自动注入相应的资源文件到html页面
 */
const enableProduction = process.env.NODE_ENV === "production"; // 是否生产环境

let externals = {
    vue: "Vue",
    axios: "axios",
    "vue-router": "VueRouter",
    vuex: "Vuex",
    "view-design": "iview",
    "vue-lazyload": "VueLazyload",
    "js-cookie": "Cookies",
    wangeditor: "wangEditor",
    "sockjs-client": "SockJS",
    vuedraggable: "vuedraggable",
    "@antv/g2": "G2",
    dplayer: "DPlayer"
};

// 使用CDN的内容
let cdn = {
    css: ["https://cdn.jsdelivr.net/npm/view-design@4.1.1/dist/styles/iview.css"],
    js: [
        // vue must at first!
        "https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js",
        "https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js",
        "https://cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js",
        "https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js",
        "https://cdn.jsdelivr.net/npm/view-design@4.1.1/dist/iview.min.js",
        "https://cdn.jsdelivr.net/npm/vue-lazyload@1.3.3/vue-lazyload.min.js",
        "https://cdn.jsdelivr.net/npm/js-cookie@2.2.1/src/js.cookie.min.js",
        "https://cdn.jsdelivr.net/npm/dplayer@1.25.0/dist/DPlayer.min.js",
        "https://cdn.jsdelivr.net/npm/wangeditor@latest/dist/wangEditor.min.js",
        "https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js",
        "https://cdn.jsdelivr.net/npm/vuedraggable@2.23.2/dist/vuedraggable.umd.min.js",
        "https://gw.alipayobjects.com/os/lib/antv/g2/4.1.24/dist/g2.min.js"
    ]
};

// 删除注释
let jsPlugin = [
    new UglifyJsPlugin({
        uglifyOptions: {
            // 删除注释
            output: {
                comments: false
            },
            compress: {
                drop_console: true, // 删除所有调式带有console的
                drop_debugger: true,
                pure_funcs: ["console.log"] // 删除console.log
            }
        }
    })
];

// 判断是否需要加载CDN，线上删除注释
cdn = enableProduction ? cdn : { css: [], js: [] };
externals = enableProduction ? externals : {};
jsPlugin = enableProduction ? jsPlugin : [];
module.exports = {
    css: {
        loaderOptions: {
            // 向 CSS 相关的 loader 传递选项
            less: {
                lessOptions: {
                    javascriptEnabled: true
                }
            }
        }
    },
    devServer: {
        port: 10003,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            "/trade": {
                target: "https://admin-api.tjmarket.ca", //线上地址
                // target: "http://192.168.0.131:8887", // erge
                changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: { "^/trade": "/" } //这里重写路径
            },
            "/com": {
                target: "https://common-api.tjmarket.ca", //线上地址
                // target: "http://192.168.0.131:8890", // erge
                changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: { "^/com": "/" } //这里重写路径
            }
        }
    },

    // 打包时不生成.map文件 避免看到源码
    productionSourceMap: false,

    // 部署优化
    configureWebpack: {
        // 使用CDN
        externals: externals,
        // GZIP压缩
        plugins: [
            new CompressionPlugin({
                test: /\.js$|\.html$|\.css/, // 匹配文件
                threshold: 10240 // 对超过10k文件压缩
            })
        ],
        optimization: {
            runtimeChunk: "single",
            minimizer: jsPlugin,
            splitChunks: {
                chunks: "all",
                maxInitialRequests: Infinity,
                minSize: 20000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                            )[1];
                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `npm.${packageName.replace("@", "")}`;
                        }
                    }
                }
            }
        }
    },
    // 将cdn的资源挂载到插件上
    chainWebpack(config) {
        //  @ 对应 src目录
        config.resolve.alias.set("@", resolve("src"));
        config.plugin("html").tap(args => {
            args[0].cdn = cdn;
            return args;
        });
    },

    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "scss",
            patterns: [path.resolve(__dirname, "./src/styles/common.scss")]
        }
    }
};