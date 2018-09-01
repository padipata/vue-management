import LoginTab from '../Login/LoginTab.vue';
export { LoginTab };
function install(vue) {
    vue.component('LoginTab', LoginTab);
}
export default {
    install: install
};
