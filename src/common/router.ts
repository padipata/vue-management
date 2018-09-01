import * as pathToRegexp from 'path-to-regexp'
import {getMenuData} from './menu'

function getFlatMenuData(menus: any[]) {
  let keys: any = {}
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = {...item}
      keys = {...keys, ...getFlatMenuData(item.children)}
    } else {
      keys[item.path] = {...item}
    }
  })
  return keys
}

export const getRouterData = () => {
  const routerConfig: any = {
    '/': {
      component: () => import('../layouts/BasicLayout/index.vue')
    },
    '/list/table-list': {
      component: () => import('../views/List/TableList/index.vue')
    },
    '/list/add-table': {
      component: () => import('../views/List/AddTable/index.vue')
    },
    '/form/editor-table': {
      component: () => import('../views/Forms/EditorTable/index.vue')
    },



    '/list2/user-list': {
      component: () => import('../views/List/UserList/index.vue')
    },
    '/exception/403': {
      component: () => import('../views/Exception/403.vue')
    },
    '/exception/404': {
      component: () => import('../views/Exception/404.vue')
    },
    '/exception/500': {
      component: () => import('../views/Exception/500.vue')
    },
    '/user': {
      component: () => import('../layouts/UserLayout/index.vue')
    },
    '/user/login': {
      component: () => import('../views/User/Login/index.vue')
    }
  }

  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData())

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData: any = {}
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path)
    const menuKey = Object.keys(menuData).find(key =>
      pathRegexp.test(key)
    )
    let menuItem: any = {}
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey]
    }
    let router = routerConfig[path]
    const authority = router.authority || menuItem.authority
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: authority,
      meta: {
        authority: authority
      }
    }
    routerData[path] = router
  })
  return routerData
}
