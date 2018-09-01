import StandardTable from './StandardTable.vue';
export { StandardTable };
function install(vue) {
    vue.component('StandardTable', StandardTable);
}
export default {
    install: install
};
