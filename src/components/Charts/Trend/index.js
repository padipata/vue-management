import Trend from './Trend.vue';
export { Trend };
function install(vue) {
    vue.component('Trend', Trend);
}
export default {
    install: install
};
