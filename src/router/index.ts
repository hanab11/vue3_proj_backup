// 模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
// 创建路由器
const router = createRouter({
  // 路由模式hash
  history: createWebHashHistory(),
  routes: constantRoute,

  // 切换路由滚动行为，eg：让页面回到顶部、保持原位
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})
// 暴露
export default router
