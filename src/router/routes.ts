// 对外暴露配置路由（常量路由），全部用户都可以访问到的路由
export const constantRoute = [
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'), // 路由组件懒加载
    name: 'Login', // 需要命名路由，做权限
    meta: {
      title: '登录', // 菜单标题
      icon: 'Promotion', // 菜单图标，支持element-plus全部图标
      hidden: true // 菜单标题是否隐藏，true是隐藏，false是默认显示（这个属性默认显示时可省略）
    }
  },
  // 登录成功后，展示数据的路由（实际上套了个布局组件）
  {
    path: '/',
    redirect: '/home', // 重定向，为了默认展示首页
    component: () => import('@/layout/index.vue'),
    name: 'Layout',
    meta: {
      title: '布局',
      icon: 'Minus',
      hidden: true
    },
    // 想要在布局里展示路由数据，菜单路由必须写在Layout路由的children里
    children: [
      // 首页（为了在内容展示区展示）
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home', // name属性不能重名，否则导致routerview失效、白屏
        meta: {
          title: '首页',
          icon: 'HomeFilled'
        }
      }
    ]
  },
  // 首页（为了在一级菜单展示，以不折叠的形式）
  {
    // ！生成菜单时，没有考虑子路由个数为1的特殊情况（布局-首页），而是统一使用折叠菜单
    path: '/home',
    meta: {
      title: '首页',
      icon: 'HomeFilled'
    }
  },
  // 数据可视化大屏
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据可视化大屏',
      icon: 'Platform'
    }
  },
  // 权限管理
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      icon: 'Lock'
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'User'
        }
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'UserFilled'
        }
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          icon: 'Monitor'
        }
      }
    ]
  },
  // 商品管理
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'Goods'
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull'
        }
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled'
        }
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'Calendar'
        }
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'Orange'
        }
      }
    ]
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      icon: 'DocumentDelete',
      hidden: true
    }
  },
  // 任意路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      icon: 'Star',
      hidden: true
    }
  }
]
