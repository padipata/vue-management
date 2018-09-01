import Description from '../DescriptionList/Description.vue';
export { Description };
function install(vue) {
    vue.component('Description', Description);
}
export default {
    install: install
};
