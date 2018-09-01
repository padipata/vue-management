<template>
  <div class="main">
    <login
      :default-active-key="type"
      @tab-change="onTabChange"
      @submit="handleSubmit"
    >
      <template slot="tab">
        <login-tab
          name="account"
          label="账号密码登录"
        >
          <template
            v-if="login && login.status === 'error' && login.type === 'account' && !submitting"
          >
            <message message="账户或密码错误（admin/123456）"/>
          </template>
          <user-name
            prop="userName"
            placeholder="管理员账号"
          />
          <password
            prop="password"
            placeholder="管理员密码"
          />
        </login-tab>
      </template>
      <div>
        <el-checkbox
          v-model="autoLogin"
        >
          自动登录
        </el-checkbox>
        <!--<a :style="{float: 'right'}" href="">忘记密码</a>-->
      </div>
      <login-submit :loading="submitting">登录</login-submit>
    </login>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Checkbox} from 'element-ui'

  import Login, {LoginItem} from 'components/Login'
  import LoginTab from 'components/LoginTab'
  import LoginSubmit from 'components/LoginSubmit'
  import AntIcon from 'components/AntIcon'
  import Message from './Message.vue'

  Vue.use(Checkbox)
  Vue.use(Login)
  Vue.use(LoginTab)
  Vue.use(LoginSubmit)
  Vue.use(AntIcon)

  export default Vue.extend({
    components: {
      Message,
      UserName: LoginItem.UserName,
      Password: LoginItem.Password,
      Mobile: LoginItem.Mobile,
      Captcha: LoginItem.Captcha
    },
    data() {
      return {
        type: 'account',
        autoLogin: true,
        submitting: false
      }
    },
    computed: {
      login(): any {
        return this.$store.state.login
      }
    },
    methods: {
      onTabChange(type: string) {
        this.type = type
      },
      handleSubmit(err: boolean, values: any) {
        const {type} = this
        console.log(values, 'User/Login, handleSubmit, values')
        if (!err) {
          this.submitting = true
          this.$store.dispatch('login/login', {
            type,
            ...values
          }).then((res) => {
            this.submitting = false
          }).catch(() => {
            this.submitting = false
          })
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '~theme/theme.scss';

  .main {
    width: 368px;
    margin: 0 auto;

    .icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: $primary-color;
      }
    }

    .other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .register {
        float: right;
      }
    }
  }
</style>

