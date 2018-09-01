import Pie from './Pie.vue';
export { Pie };
function install(vue) {
    vue.component('Pie', Pie);
}
export default {
    install: install
};
