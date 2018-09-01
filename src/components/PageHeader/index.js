import PageHeader from './PageHeader.vue';
export { PageHeader };
function install(vue) {
    vue.component('PageHeader', PageHeader);
}
export default {
    install: install
};
