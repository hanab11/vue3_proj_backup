<script setup lang="ts">
import { onMounted } from 'vue'
import { reqLogin } from '@/api/user'

// 挂载时，发送统一管理、封装好的axios请求（API）
onMounted(() => {
  reqLogin({ username: 'admin', password: '111111' }).then((response) => {
    console.log('登录响应', response)
  })
})
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss"></style>
