import Field from './Field.vue';
export { Field };
function install(vue) {
    vue.component('Field', Field);
}
export default {
    install: install
};
