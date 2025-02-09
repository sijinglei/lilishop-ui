// 统一请求路径前缀在libs/axios.js中修改
import {
    commonUrl,
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
    importRequest,
    getRequestWithNoToken,
    putRequestWithNoForm,
    postRequestWithNoForm,
    managerUrl
} from "@/libs/axios";
// import config from "@/config";

// let commonUrl =
//     process.env.NODE_ENV === "development" ?
//     config.api_dev.common :
//     config.api_prod.common;

// 文件上传接口
export const uploadFile = commonUrl + "/common/upload/file";
// Websocket
export const ws = managerUrl + "/ws";

// 获取首页查询数据
export const homeStatistics = params => {
    return getRequest("/statistics/index", params);
};

// 获取首页tpo10商品
export const hotGoods = params => {
    return getRequest("/statistics/index/goodsStatistics", params);
};
// 获取首页tpo10店铺
export const hotShops = params => {
    return getRequest("/statistics/index/storeStatistics", params);
};

// 通知提示信息
export const getNoticePage = params => {
    return getRequest("/statistics/index/notice", params);
};

// 登陆
export const login = params => {
    return getRequestWithNoToken(`/user/login`, params);
};
// 刷新token
export const handleRefreshToken = token => {
    return getRequestWithNoToken(`/user/refresh/${token}`);
};
// 获取用户登录信息
export const userInfo = params => {
    return getRequest("/user/info", params);
};
// 注册
export const regist = params => {
    return postRequest("/user/regist", params);
};
// 初始化验证码
export const initCaptcha = params => {
    return getRequestWithNoToken("/common/captcha/init", params);
};
// 发送登录短信验证码
export const sendLoginSms = (mobile, params) => {
    return getRequest(`/common/captcha/sendLoginSms/${mobile}`, params);
};
// 发送注册短信验证码
export const sendRegistSms = (mobile, params) => {
    return getRequest(`/common/captcha/sendRegistSms/${mobile}`, params);
};
// 发送重置密码短信验证码
export const sendResetSms = (mobile, params) => {
    return getRequest(`/common/captcha/sendResetSms/${mobile}`, params);
};
// 发送修改绑定手机短信验证码
export const sendEditMobileSms = (mobile, params) => {
    return getRequest(`/common/captcha/sendEditMobileSms/${mobile}`, params);
};
// 通过手机重置密码
export const resetByMobile = params => {
    return postRequest("/user/resetByMobile", params);
};

// IP天气信息
export const ipInfo = params => {
    return getRequest("/common/ip/info", params);
};
// 个人中心编辑
export const userInfoEdit = params => {
    return putRequest("/user/edit", params);
};
// 个人中心修改密码
export const changePass = params => {
    return putRequest("/user/editPassword", params);
};
// 个人中心修改手机
export const changeMobile = params => {
    return postRequest("/user/changeMobile", params);
};
// 获取用户数据 多条件
export const getUserListData = params => {
    return getRequest("/user", params);
};
// 通过用户名搜索
export const searchUserByName = (username, params) => {
    return getRequest("/user/searchByName/" + username, params);
};
// 获取全部用户数据
export const getAllUserData = params => {
    return getRequest("/user/getAll", params);
};

// 添加用户
export const addUser = params => {
    return postRequest("/user", params);
};
// 编辑管理员自身
export const editUser = params => {
    return putRequest("/user/edit", params);
};
// 编辑用户
export const editOtherUser = params => {
    return putRequest("/user/admin/edit", params);
};
// 启用用户
export const enableUser = (id, params) => {
    return putRequest(`/user/enable/${id}`, params);
};
// 删除用户
export const deleteUser = (ids, params) => {
    return deleteRequest(`/user/${ids}`, params);
};
// 导入用户
export const importUserData = params => {
    return importRequest("/user/importData", params);
};
/****************************** 部门 */
// 通过部门获取全部角色数据
export const getUserByDepartmentId = (id, params) => {
    return getRequest(`/departmentRole/${id}`, params);
};

// 通过部门修改绑定角色
export const updateDepartmentRole = (id, params) => {
    return putRequestWithNoForm(`/departmentRole/${id}`, params);
};

// 获取一级部门
export const initDepartment = params => {
    return getRequest("/department", params);
};
// 加载部门子级数据
export const loadDepartment = id => {
    return getRequest(`/department/${id}`);
};
// 添加部门
export const addDepartment = params => {
    return postRequest("/department", params);
};
// 编辑部门
export const editDepartment = (ids, params) => {
    return putRequest(`/department/${ids} `, params);
};
// 删除部门
export const deleteDepartment = (ids, params) => {
    return deleteRequest(`/department/${ids}`, params);
};
// 搜索部门
export const searchDepartment = params => {
    return getRequest("/department/search", params);
};

/****************************** 部门结束 */

// 获取全部角色数据
export const getAllRoleList = params => {
    return getRequest("/role", params);
};
// 分页获取角色数据
export const getRoleList = params => {
    return getRequest("/role", params);
};

// 添加角色
export const addRole = params => {
    return postRequest("/role", params);
};

// 编辑角色
export const editRole = params => {
    return putRequest(`/role/${params.roleId}`, params);
};

// 查看某角色拥有的菜单
export const selectRoleMenu = params => {
    return getRequest(`/roleMenu/${params}`);
};

// 保存角色菜单
export const saveRoleMenu = (id, params) => {
    return postRequestWithNoForm(`/roleMenu/${id}`, params);
};

// 分配角色权限
export const editRolePerm = params => {
    return postRequest("/role/editRolePerm", params);
};
// 分配角色数据权限
export const editRoleDep = params => {
    return postRequest("/role/editRoleDep", params);
};
// 删除角色
export const deleteRole = (ids, params) => {
    return deleteRequest(`/role/${ids}`, params);
};

/****************************** 角色结束 */

/****************************** 权限 */
// 获取全部权限数据
export const getAllPermissionList = params => {
    return getRequest("/menu/tree", params);
};

// 获取全部权限数据
export const getCurrentPermissionList = params => {
    return getRequest("/menu/memberMenu", params);
};

// 添加权限
export const addPermission = params => {
    return postRequest("/menu", params);
};

// 编辑权限
export const editPermission = params => {
    return putRequest(`/menu/${params.id}`, params);
};
// 删除权限
export const deletePermission = (ids, params) => {
    return deleteRequest(`/menu/${ids}`, params);
};
// 搜索权限
export const searchPermission = params => {
    return getRequest("/menu", params);
};

/****************************** 权限结束 */

// 分页获取日志数据
export const getLogListData = params => {
    return getRequest("/log/getAllByPage", params);
};
// 删除日志
export const deleteLog = (ids, params) => {
    return deleteRequest(`/log/${ids}`, params);
};
// 清空日志
export const deleteAllLog = params => {
    return deleteRequest("/log", params);
};

// 分页获取消息数据
export const getMessageData = params => {
    return getRequest("/message/getByCondition", params);
};
// 获取单个消息详情
export const getMessageDataById = (id, params) => {
    return getRequest(`/message/get/${id}`, params);
};
// 发送消息
export const addMessage = params => {
    return postRequest("/messageSend/send", params);
};
// 编辑消息
export const editMessage = params => {
    return postRequest("/message/edit", params);
};
// 删除消息
export const deleteMessage = (ids, params) => {
    return deleteRequest(`/message/delByIds/${ids}`, params);
};
// 编辑发送消息
export const editMessageSend = params => {
    return putRequest("/messageSend/update", params);
};
// 删除发送消息
export const deleteMessageSend = (ids, params) => {
    return deleteRequest(`/manager/messageSend/delByIds/${ids}`, params);
};

// 分页获取文件数据
export const getFileListData = params => {
    return getRequest("/file", params);
};

// 重命名文件
export const renameFile = params => {
    return postRequest("/file/rename", params);
};
// 删除文件
export const deleteFile = (ids, params) => {
    return deleteRequest(`/file/delete/${ids}`, params);
};
// 下载文件
export const aliDownloadFile = (fKey, params) => {
    return getRequest(`/file/ali/download/${fKey}`, params);
};

// base64上传
export const base64Upload = params => {
    return postRequest("/upload/file", params);
};

// 系统设置
export const getSetting = key => {
    return getRequest(`/system/setting/get/${key}`);
};
// 更新系统配置
export const setSetting = (key, params) => {
    return putRequestWithNoForm(`/system/setting/put/${key}`, params);
};

// 分页查询敏感词

export const getSensitiveWordsPage = params => {
    return getRequest(`/sensitiveWords`, params);
};

// 分页查询敏感词
export const insertSensitiveWords = params => {
    return postRequest(`/sensitiveWords`, params);
};

// 修改
export const updateSensitiveWords = (id, params) => {
    return putRequest(`/sensitiveWords/${id}`, params);
};

// 删除敏感词
export const delSensitive = ids => {
    return deleteRequest(`/sensitiveWords/delByIds/${ids}`);
};

// 添加商品计量单位
export const addGoodsUnit = params => {
    return postRequest(`/goods/goodsUnit`, params);
};
// 分页获取商品计量单位
export const getGoodsUnitPage = params => {
    return getRequest(`/goods/goodsUnit`, params);
};
// 编辑商品计量单位
export const updateGoodsUnit = (id, params) => {
    return putRequest(`/goods/goodsUnit/${id}`, params);
};
// 删除商品计量单位
export const delGoodsUnit = ids => {
    return deleteRequest(`/goods/goodsUnit/delete/${ids}`);
};

// 同步高德行政地区数据
export const asyncRegion = () => {
    return postRequest(`/region/sync`);
};

// 批量id删除
export const delRegion = ids => {
    return deleteRequest(`/region/${ids}`);
};

// 更新地区
export const updateRegion = (id, params) => {
    return putRequest(`/region/${id}`, params);
};
// 添加地区
export const addRegion = params => {
    return postRequest(`/region`, params);
};

// 通过id获取子地区
export const getChildRegion = id => {
    return getRequest(`/region/item/${id}`);
};

// 重置用户密码
export const resetPassword = params => {
    return postRequest(`/user/resetPassword/${params}"`);
};

// 初始化商品索引
export const createIndex = () => {
    return getRequest(`/elasticsearch`);
};

// 初始化商品索引
export const getProgress = () => {
    return getRequest(`/elasticsearch/progress`);
};

// 分页查询自定义分词
export const getCustomWordsPage = params => {
    return getRequest(`/manager/custom-words`, params);
};

// 添加自定义分词
export const insertCustomWords = params => {
    return postRequest(`/manager/custom-words`, params);
};

// 修改自定义分词
export const updateCustomWords = params => {
    return putRequest(`/manager/custom-words`, params);
};

// 删除自定义分词
export const delCustom = id => {
    return deleteRequest(`/manager/custom-words/${id}`);
};

// 设置热搜词
export const setHotWords = params => {
    return postRequest(`/hotwords`, params);
};

// 获取热搜词
export const getHotWords = () => {
    return getRequest(`/hotwords`);
};