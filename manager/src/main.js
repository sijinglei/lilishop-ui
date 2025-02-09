// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import ViewUI from "view-design";
// import 'view-design/dist/styles/iview.css'
import "./styles/theme.less";

import "core-js/stable";
// import "regenerator-runtime/runtime"
import App from "./App";
import { router } from "./router/index";
import store from "./store";
import i18n from "@/locale";
import vueQr from "vue-qr";
import {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
    importRequest,
    uploadFileRequest
} from "@/libs/axios";
import { setStore, getStore, removeStore } from "@/libs/storage";
import util from "@/libs/util";

import * as filters from "@/utils/filters"; // global filter
import liliDialog from "@/views/lili-dialog";
import { md5 } from "@/utils/md5.js";
Vue.config.devtools = true;
Vue.config.productionTip = false;
const buyerUrlPC = "https://pc.tjmarket.ca"; // 跳转买家端地址 pc端
const buyerUrlWap = "https://m.tjmarket.ca"; // 跳转买家端地址 wap端
Vue.prototype.linkTo = function(goodsId, skuId) {
    // 跳转买家端商品
    window.open(
        `${buyerUrlPC}/goodsDetail?skuId=${skuId}&goodsId=${goodsId}`,
        "_blank"
    );
};
Vue.prototype.wapLinkTo = function(goodsId, skuId) {
    // app端二维码
    return `${buyerUrlWap}/pages/product/goods?id=${skuId}&goodsId=${goodsId}`;
};

Vue.use(ViewUI, {
    i18n: (key, value) => i18n.t(key, value)
});

Vue.component("liliDialog", liliDialog);
Vue.component(vueQr);

// 挂载全局使用的方法
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.importRequest = importRequest;
Vue.prototype.uploadFileRequest = uploadFileRequest;
Vue.prototype.setStore = setStore;
Vue.prototype.getStore = getStore;
Vue.prototype.removeStore = removeStore;
Vue.prototype.md5 = md5;

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    i18n,
    render: h => h(App),
    data: {
        currentPageName: ""
    },
    mounted() {
        // 初始化菜单
        util.initRouter(this);
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit("setOpenedList");
        this.$store.commit("initCachePage");
    }
});