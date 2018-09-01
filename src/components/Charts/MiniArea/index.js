import MiniArea from './MiniArea.vue';
export { MiniArea };
function install(vue) {
    vue.component('MiniArea', MiniArea);
}
export default {
    install: install
};
