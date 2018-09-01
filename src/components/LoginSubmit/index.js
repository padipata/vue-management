import LoginSubmit from '../Login/LoginSubmit.vue';
export { LoginSubmit };
function install(vue) {
    vue.component('LoginSubmit', LoginSubmit);
}
export default {
    install: install
};
