import axios from 'axios';
const service = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 30 * 1000,
    headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
    }
});
service.interceptors.response.use(response => {
    service.defaults.headers.authorization = localStorage.getItem('token');
    return response;
}, (error) => {
    console.log('fetch', error.config.url, error.config.params, 'error. error:', error);
    let { status } = error.response;
    console.log(error.response, 'error.response');
    // token过期，需要重新登录
    if (status === 401) {
        localStorage.setItem('token', ''); // 因为token无效而需要的重定向必须要先清空！！！
        localStorage.setItem('user', ''); // 因为token无效而需要的重定向必须要先清空！！！
        window.location.reload();
    }
    return Promise.reject(error);
});
export default service;
