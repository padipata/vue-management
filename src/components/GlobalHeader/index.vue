<template>
  <div class="global-header">
    <ant-icon
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      class="trigger"
      @click="toggle"
    />

    <!--v-if="currentUser.name"-->
    <!--个人信息-->
    <div class="right">
      <el-dropdown

        class="action"
        @command="onMenuClick"
      >
        <span class="action account">
          <avatar
            class="avatar"
            size="small"
            :src="logo"
          />
          <span class="name">{{user_name}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>管理员：{{user_name}}</el-dropdown-item>
          <el-dropdown-item
            divided
            command="logout"
          >
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {debounce} from 'lodash'
  import {Loading} from 'element-ui'
  import logo from 'assets/logo.png'

  import Avatar from 'components/Avatar/index.vue'
  import AntIcon from 'components/AntIcon'
  import HeaderSearch from 'components/HeaderSearch/index.vue'
  import NoticeIcon from 'components/NoticeIcon/index.vue'

  Vue.use(Loading)
  Vue.use(AntIcon)

  export default Vue.extend({
    components: {
      Avatar,
      HeaderSearch,
      NoticeIcon
    },
    props: {
      collapsed: {
        type: Boolean
      },
      fetchingNotices: {
        type: Array,
        default() {
          return []
        }
      },
      isMobile: Boolean,
      logo: String
    },
    data() {
      return {
        logo,
        searchValue: '',
        user_name: localStorage.getItem('user')
      }
    },
    methods: {
      onMenuClick(command: string) {
        this.$emit('menu-click', command)
      },
      toggle() {
        const {collapsed} = this
        this.$emit('collapse', !collapsed)
        debounce(this.triggerResizeEvent, 600)()
      },
      triggerResizeEvent() {
        const event = document.createEvent('HTMLEvents')
        event.initEvent('resize', true, false)
        window.dispatchEvent(event)
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '~theme/theme.scss';

  .global-header {
    height: 64px;
    padding: 0 12px 0 0;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    position: relative;
    display: flex;
    justify-content: space-between;

    .trigger {
      font-size: 20px;
      line-height: 64px;
      cursor: pointer;
      transition: all 0.3s;
      padding: 0 24px;
      &:hover {
        background: $primary-1;
      }
    }
    .right {
      height: 100%;
      display: flex;

      .action {
        cursor: pointer;
        padding: 0 12px;
        transition: all 0.3s;
        height: 100%;
        display: flex;
        align-items: center;
        > i {
          font-size: 16px;
          vertical-align: middle;
        }
        &.popover-open,
        &:hover {
          background: $primary-1;
        }
      }
      .search {
        padding: 0;
        margin: 0 12px;
        &:hover {
          background: transparent;
        }
      }
      .notice {
        padding: 0;
      }
      .account {
        .avatar {
          margin: 20px 8px 20px 0;
          color: $primary-color;
          background: rgba(255, 255, 255, 0.85);
          vertical-align: middle;
        }
      }
      .loading-wrapper {
        .loading {
          width: 30px;
          height: 30px;

          /deep/ .el-loading-spinner {
            margin-top: -15px;
            .circular {
              width: 30px;
              height: 30px;
            }
          }
        }
      }
    }
  }
</style>
