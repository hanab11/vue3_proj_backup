// 定义小仓库用户数据的ts类型
// 引入RouteRecordRaw，路由对象的ts类型
import type { RouteRecordRaw } from 'vue-router'
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}
