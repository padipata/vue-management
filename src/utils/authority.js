// 使用 localStorage 来存储用户登录权限信息。
export function getAuthority() {
    return localStorage.getItem('token') || 'admin';
}
export function setAuthority(authority) {
    return localStorage.setItem('token', authority);
}
