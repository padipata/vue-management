import request from 'utils/request';
// 七牛云
export function getQiniu() {
    return request.get('/api/v2/qiniu');
}
// 登录
export function fakeAccountLogin(params) {
    return request.post('/api/v1/admin/login', params);
}
// 植物列表
export function queryRule(params) {
    return request.post('/api/v1/admin/plantList', params);
}
// 编辑植物
export function updataRule(params) {
    return request.put('/api/v1/admin/updatePlant', params);
}
// 删除植物
export function removeRule(params) {
    return request.delete(`/api/v1/admin/deletePlant/${params}`);
}
// 添加植物
export function addRule(params) {
    return request.post('/api/v1/admin/createPlant', Object.assign({}, params));
}
// 用户列表
export function userRule(params) {
    return request.post('/api/v1/admin/userList', params);
}
