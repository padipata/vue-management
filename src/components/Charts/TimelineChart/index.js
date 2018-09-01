import TimelineChart from './TimelineChart.vue';
export { TimelineChart };
function install(vue) {
    vue.component('TimelineChart', TimelineChart);
}
export default {
    install: install
};
