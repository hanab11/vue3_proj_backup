<template>
  <div>
    <!-- 用户头像 -->
    <img
      :src="userStore.avatar"
      alt="【avatar】"
      style="width: 100px; height: 100px; margin: 0 10px; border-radius: 50%"
    />
    <!-- 用户名 -->
    <span>Hello, {{ userStore.username }}</span>

    <h1>我是一级路由home，展示登录成功后的数据</h1>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'

// 获取用户相关的仓库
let userStore = useUserStore()
</script>

<style scoped></style>
