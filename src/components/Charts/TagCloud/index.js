import TagCloud from './TagCloud.vue';
export { TagCloud };
function install(vue) {
    vue.component('TagCloud', TagCloud);
}
export default {
    install: install
};
