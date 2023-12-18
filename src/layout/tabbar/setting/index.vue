<template>
  <!-- 刷新按钮 -->
  <el-button size="small" circle icon="Refresh" @click="refresh"></el-button>
  <!-- 全屏按钮 -->
  <el-button
    size="small"
    circle
    icon="FullScreen"
    @click="fullScreen"
  ></el-button>
  <!-- 设置按钮 -->
  <el-button size="small" circle icon="Setting"></el-button>
  <!-- 用户头像 -->
  <img
    :src="userStore.avatar"
    alt="【avatar】"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
  />
  <!-- el下拉菜单组件 -->
  <el-dropdown>
    <!-- 不加span的话，只渲染首个元素，字符串或图标 -->
    <span>
      <!-- 用户名 -->
      {{ userStore.username }}
      <el-icon>
        <ArrowDown />
      </el-icon>
    </span>
    <!-- 下拉菜单，必须用具名插槽dropdown -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        <el-dropdown-item>Test</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import useLayoutConfigStore from '@/store/modules/config'
import { useRouter, useRoute } from 'vue-router'

// 获取用户相关的仓库、布局配置相关的仓库
let userStore = useUserStore()
let configStore = useLayoutConfigStore()

// 获取路由器实例对象、路由实例对象
let $router = useRouter()
let $route = useRoute()

// 刷新按钮的回调
const refresh = () => {
  configStore.isRefresh = !configStore.isRefresh
}

// 全屏按钮的回调
const fullScreen = () => {
  console.log(document.fullscreenElement) // element存储全屏的值

  // DOM对象的属性，标记是否在全屏模式（true全屏，false非全屏）
  let full = document.fullscreenElement
  // 切换全屏模式，文档根节点的方法requestFullscreen实现全屏
  if (!full) document.documentElement.requestFullscreen()
  else document.exitFullscreen()
}

// 退出登录按钮的回调
const logout = () => {
  // 先发请求给服务器（退出登录接口）再清空用户仓库数据（登出方法）
  userStore.userLogout()
  // 编程式路由跳转，path目标路由，query路由地址传递参数（当前路由地址）
  $router.push({
    path: '/login',
    query: { redirect: $route.path } // 当前路由地址
  })
}
</script>

<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<style scoped></style>
