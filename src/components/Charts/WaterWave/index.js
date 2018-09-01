import WaterWave from './WaterWave.vue';
export { WaterWave };
function install(vue) {
    vue.component('WaterWave', WaterWave);
}
export default {
    install: install
};
