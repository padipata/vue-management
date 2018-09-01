import ChartCard from './ChartCard.vue';
export { ChartCard };
function install(vue) {
    vue.component('ChartCard', ChartCard);
}
export default {
    install: install
};
