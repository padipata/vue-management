import MiniProgress from './MiniProgress.vue';
export { MiniProgress };
function install(vue) {
    vue.component('MiniProgress', MiniProgress);
}
export default {
    install: install
};
