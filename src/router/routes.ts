// 对外暴露配置路由（常量路由），全部用户都可以访问到的路由
export const constantRoute = [
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'), // 路由组件懒加载
    name: 'login' // 需要命名路由，做权限
  },
  {
    // 登录成功后，展示数据的路由
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'home'
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404'
  },
  {
    // 任意路由
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any'
  }
]
