import Divider from './Divider.vue';
export { Divider };
function install(vue) {
    vue.component('Divider', Divider);
}
export default {
    install: install
};
