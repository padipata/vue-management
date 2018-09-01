import { isUrl } from '../utils/utils';
const anticon = (name) => {
    return `anticon anticon-${name}`;
};
const menuData = [
    {
        name: '植物管理',
        icon: anticon('table'),
        path: 'list',
        children: [
            {
                name: '植物列表',
                path: 'table-list'
            },
            {
                name: '新添植物',
                path: 'add-table'
            }
        ]
    },
    // {
    //   name: '系统设置',
    //   icon: anticon('setting'),
    //   path: 'list5',
    //   children: [
    //     {
    //       name: '会员参数',
    //       path: 'system'
    //     },
    //     {
    //       name: '微信相关设置',
    //       path: 'wx'
    //     }
    //   ]
    // },
    {
        name: '账户',
        icon: anticon('user'),
        path: 'user',
        authority: 'guest',
        children: [
            {
                name: '登录',
                path: 'login'
            },
            {
                name: '注册',
                path: 'register'
            },
            {
                name: '注册结果',
                path: 'register-result'
            }
        ]
    }
];
function formatter(data, parentPath = '/', parentAuthority) {
    return data.map(item => {
        let { path } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = Object.assign({}, item, { path, authority: item.authority || parentAuthority });
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}
export const getMenuData = () => formatter(menuData);
