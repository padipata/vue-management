import Vue from 'vue'
import {Input} from 'element-ui'
import AntIcon from '../AntIcon'

Vue.use(Input)
Vue.use(AntIcon)

const anticon = (name: string) => {
  return `anticon anticon-${name}`
}

const map: any = {
  UserName: {
    component: 'el-input',
    props: {
      size: 'large',
      // prefix: <Icon type="user" className={styles.prefixIcon} />,
      prefixIcon: anticon('user'),
      placeholder: '管理员账号'
    },
    rules: [
      {
        required: true,
        message: '请输入管理员账号!'
      }
    ]
  },
  Password: {
    component: 'el-input',
    props: {
      size: 'large',
      // prefix: <Icon type="lock" className={styles.prefixIcon} />,
      prefixIcon: anticon('lock'),
      type: 'password',
      placeholder: '管理员密码'
    },
    rules: [
      {
        required: true,
        message: '请输入管理员密码!'
      }
    ]
  }
}

export default map
