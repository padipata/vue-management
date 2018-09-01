import router from 'router';
import { fakeAccountLogin } from 'services/api';
import { setAuthority } from 'utils/authority';
import { reloadAuthorized } from 'utils/Authorized';
const state = {
    status: undefined,
    type: undefined
};
const mutations = {
    changeLoginStatus(state, payload) {
        console.log(payload, 'payloadpayloadpayload');
        payload = payload || {};
        setAuthority(payload.token);
    }
};
const actions = {
    // 管理员登录
    async login(context, payload) {
        let info = {};
        info.user_name = payload.userName;
        info.password = payload.password;
        console.log(info, 'http://park.yipage.cn/api/v1/admin/login');
        const response = await fakeAccountLogin(info);
        const data = response ? response.data : {};
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', info.user_name);
        context.commit('changeLoginStatus', data);
        // Login successfully
        reloadAuthorized();
        router.push('/');
        return data;
    },
    // 退出登录
    async logout(context) {
        try {
            // get location pathname
            const urlParams = new URL(window.location.href);
            const pathname = router.currentRoute.path;
            // add the parameters in the url
            urlParams.searchParams.set('redirect', pathname);
            window.history.replaceState(null, 'login', urlParams.href);
        }
        finally {
            context.commit('changeLoginStatus', {
                token: ''
            });
            localStorage.setItem('user', '');
            reloadAuthorized();
            router.push('/user/login');
        }
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
