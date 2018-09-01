import Gauge from './Gauge.vue';
export { Gauge };
function install(vue) {
    vue.component('Gauge', Gauge);
}
export default {
    install: install
};
