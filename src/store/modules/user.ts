// 用户相关的小仓库模块
import { defineStore } from 'pinia'
// 引入接口：请求登录、请求用户信息
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
// 引入用户数据的ts类型
import type { loginFormData } from '@/api/user/type'
import type { UserState } from './types/type'
// 引入本地存储数据的工具方法
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入路由（常量路由）
import { constantRoute } from '@/router/routes'

// 创建小仓库User，选项式
const useUserStore = defineStore('User', {
  // 状态数据，要求使用函数返回值（给返回值标注ts类型，即箭头函数小括号后标注）
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户唯一标识，每次刷新读取本地存储，保证持久化
      menuRoutes: constantRoute, // 存储生成菜单所需要的路由数组
      username: '', // 用户名
      avatar: '' // 用户头像
    }
  },
  // 异步+业务逻辑（只关心异步返回的结果，再根据result返回成功or失败promise，不去管后续行为）
  actions: {
    // 用户登录方法，因为reqLogin需要传参，用userLogin接收参数data，ts类型loginFormData
    async userLogin(data: loginFormData) {
      const result = await reqLogin(data) // 注：result自动推断ts类型，异步请求返回promise对象，使用async await
      //console.log(result) // 打印result:{code, message, data, ok} 注：data成功是token，失败是提示信息

      // 登录成功 200 -> 获得 token，并存储到state
      // 登录失败 201 -> 获得 失败信息
      if (result.code === 200) {
        this.token = result.data as string
        // 由于pinia/vuex并非持久化，所以必须本地存储一份持久化token（cookie也可以做）
        SET_TOKEN(result.data as string)

        // 保证当前async函数，返回成功的promise，暂时写死
        return 'OK'
      } else {
        // 返回失败的promise，用reject方法，传入参数最好是error实例对象（等价error = new Error()）
        return Promise.reject(new Error(result.data))
      }
    },

    // 用户信息方法，获取用户信息需要带着token请求，在请求头里封装
    async userInfo() {
      const result = await reqUserInfo() // 注：result自动推断ts类型，异步请求，等待响应结果

      // 判断成功，获得用户信息存储到state
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 用户登出方法
    async userLogout() {
      const result = await reqLogout() // 退出登录接口，异步请求（通知服务器本地用户唯一标识失效）

      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN() // 清除本地存储的token
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    }
  },
  // 计算属性
  getters: {}
})

// 暴露小仓库方法
export default useUserStore
