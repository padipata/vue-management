import Exception from './Exception.vue';
function install(vue) {
    vue.component('Exception', Exception);
}
export { Exception };
export default {
    install: install
};
