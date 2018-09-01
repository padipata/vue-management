import CountDown from './CountDown.vue';
export { CountDown };
function install(vue) {
    vue.component('CountDown', CountDown);
}
export default {
    install: install
};
