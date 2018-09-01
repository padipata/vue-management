var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from 'vue';
import { Form, FormItem, Button, Row, Col } from 'element-ui';
import Component from 'vue-class-component';
import { Inject } from 'vue-property-decorator';
import map from './map';
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
function generator(context) {
    let LoginItem = class LoginItem extends Vue {
        constructor() {
            super(...arguments);
            this.count = 0;
        }
        created() {
            this.login.updateForm(this.prop);
        }
        mounted() {
            const parent = this.$parent;
            const parentName = parent && parent.name ? parent.name : '';
            this.login.updateActive(this.prop, parentName);
        }
        onInput(value) {
            this.login.updateForm(this.prop, value);
        }
        render(h) {
            const { defaultProps, defaultRules, type, component } = context;
            return h('el-form-item', {
                props: {
                    rules: defaultRules,
                    prop: this.prop
                }
            }, [
                h(component, {
                    props: Object.assign({}, defaultProps, this.$attrs),
                    on: {
                        input: this.onInput
                    }
                })
            ]);
        }
    };
    __decorate([
        Inject('login')
    ], LoginItem.prototype, "login", void 0);
    LoginItem = __decorate([
        Component({
            props: {
                prop: {
                    type: String,
                    default: ''
                }
            }
        })
    ], LoginItem);
    return LoginItem;
}
const LoginItem = {};
Object.keys(map).forEach(item => {
    LoginItem[item] = generator({
        defaultProps: map[item].props,
        defaultRules: map[item].rules,
        type: item,
        component: map[item].component
    });
});
export default LoginItem;
