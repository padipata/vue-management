import NumberInfo from './NumberInfo.vue';
export { NumberInfo };
function install(vue) {
    vue.component('NumberInfo', NumberInfo);
}
export default {
    install: install
};
