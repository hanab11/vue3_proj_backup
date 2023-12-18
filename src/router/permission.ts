// 路由鉴权：项目中的路由的权限设置（某个路由什么条件下可访问、不可访问）
import router from '.'
// 引入nprogress、其进度条样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 引入小仓库方法
import useUserStore from '@/store/modules/user'

// 取消nprogress加载圈
nprogress.configure({ showSpinner: false })

// 全局路由守卫，访问任意路由都会触发的钩子

// 全局前置守卫，访问某路由之前
router.beforeEach(async (to, from, next) => {
  // to将访问的路由，from来自的路由，next路由的放行函数
  nprogress.start()
  // 获取用户相关的小仓库
  const userStore = useUserStore()
  const username = userStore.username // 拿到用户名

  // 利用token状态数据来判断用户登录状态（关于token是否过期，在请求拦截器处理）
  if (userStore.token) {
    // 用户登录成功后不可用组件：login
    if (to.path == '/login') {
      next('/')
    } else {
      // 访问其余路由
      // 有用户信息 放行
      if (username) next()
      else {
        // 如果没有用户信息，守卫发请求获取用户信息再放行
        try {
          // 获取用户信息并放行
          await userStore.userInfo()
          next()
        } catch (error) {
          // 获取不到用户信息，原因：token过期、用户手动修改了本地存储token
          // 退出登录并重定向login
          userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 用户未登录可用组件：login，判断目标路由地址，对login放行，其余重定向到login
    // 注意处理，别人发链接，不能只重定向到login，要带上query参数 to.path
    to.path == '/login'
      ? next()
      : next({ path: '/login', query: { redirect: to.path } })
  }
})

// 全局后置守卫，访问某路由之后
router.afterEach((to, from, failure) => {
  nprogress.done()
  document.title = to.meta.title as string
})
