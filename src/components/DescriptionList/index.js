import DescriptionList from './DescriptionList.vue';
export { DescriptionList };
function install(vue) {
    vue.component('DescriptionList', DescriptionList);
}
export default {
    install: install
};
