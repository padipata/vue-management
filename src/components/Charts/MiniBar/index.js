import MiniBar from './MiniBar.vue';
export { MiniBar };
function install(vue) {
    vue.component('MiniBar', MiniBar);
}
export default {
    install: install
};
