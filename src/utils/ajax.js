

import axios from "axios";
import { history } from '@/utils/history';
// axios.defaults.baseURL = "https://hupa.7766.org:3013";
let token = "";
axios.defaults.withCredentials = false;
axios.defaults.headers.common["token"] = token //请求头是空
axios.defaults.headers.common["locale"] = 'zh_cn' //请求头是空
axios.defaults.headers.post["'Content-type"] = "application/json:charset=UTF-8"
axios.defaults.headers.post["request-source"] = "web"
function fomartLanguage() {
    switch (localStorage.getItem('language')) {
        case 'en':
            return 'en_us';
        case 'zh':
            return 'zh_cn';
        default:
            return 'zh_cn';
    }
}

axios.interceptors.request.use(function (config) {
    // ajax 请求发送之前
    let userInfo = localStorage.userInfo
    config.headers.common['token'] = userInfo//把token放入到请求头中
    config.headers.common['locale'] = fomartLanguage() || 'zh_cn';
    return config;
}, function (error) {
    // ajax 请求无法发送  
    console.log(error, 'error发送之前')
    return Promise.reject(error);
});

//响应拦截器
axios.interceptors.response.use(function (response) {
    // console.log(response, 'response')
    // if (response.status !== 200) {
    //     history.push("/error")
    // }
    if (response.data.code == '-14004') {
        history.push("/login")
        localStorage.userInfo = ""
        localStorage.userName = ""
    }
    return response;
}, function (error) {
    // history.push("/error")
    return Promise.reject(error);
});

export default axios;