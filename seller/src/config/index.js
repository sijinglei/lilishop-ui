export default {
    /**
     * @description 配置显示在浏览器标签的title
     */
    title: "lilishop",

    /**
     * @description token在Cookie中存储的天数，默认1天
     */
    cookieExpires: 1,
    /**
     * @description 是否使用国际化，默认为false
     *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
     *              用来在菜单中显示文字
     */
    useI18n: true,

    /**
     * @description api请求基础路径
     */
    api_dev: {
        // common: "https://common-api.tjmarket.ca",
        // buyer: "https://buyer-api.tjmarket.ca",
        // seller: "https://store-api.tjmarket.ca",
        // manager: "https://admin-api.tjmarket.ca",
        common: "/com", //http://192.168.0.131:8890
        buyer: "/buy", //http://192.168.0.131:8888
        seller: "/sell", //http://192.168.0.131:8889
        manager: "/trade" //http://192.168.0.131:8887
    },
    api_prod: {
        common: "https://common-api.tjmarket.ca",
        buyer: "https://buyer-api.tjmarket.ca",
        seller: "https://store-api.tjmarket.ca",
        manager: "https://admin-api.tjmarket.ca"
    },
    /**
     *  @description api请求基础路径前缀
     */
    baseUrlPrefix: "/store",
    /**
     * @description 需要加载的插件
     */
    plugin: {
        "error-store": {
            showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
            developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
        }
    }
};