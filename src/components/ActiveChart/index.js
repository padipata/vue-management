import ActiveChart from './ActiveChart.vue';
export { ActiveChart };
function install(vue) {
    vue.component('ActiveChart', ActiveChart);
}
export default {
    install: install
};
