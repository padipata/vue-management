import Bar from './Bar.vue';
export { Bar };
function install(vue) {
    vue.component('Bar', Bar);
}
export default {
    install: install
};
