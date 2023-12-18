<template>
  <!-- router-view展示的是路由组件 -->
  <router-view v-slot="{ Component }">
    <!-- 用transition标签，给组件实例加上过渡动画 -->
    <transition name="fade">
      <!-- 用component标签，动态获取组件实例，渲染的是layout路由组件的子路由 -->
      <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import useLayoutConfigStore from '@/store/modules/config'

// 获取布局配置相关的仓库
let configStore = useLayoutConfigStore()

// 标记组件是否销毁重建，用v-if销毁重建（false销毁，true重建）
// ！涉及到 挂载完毕后的页面渲染，要ref响应式数据
let flag = ref(true)

// 监视仓库的状态数据，第一个参数监听目标可以写成箭头函数形式，第二个参数回调
watch(
  () => configStore.isRefresh,
  () => {
    // 点击刷新按钮，需要先销毁
    flag.value = false
    // 等待页面渲染完毕，再重建，完成刷新流程
    nextTick(() => {
      flag.value = true
    })
  }
)
</script>

<script lang="ts">
export default {
  name: 'Main@'
}
</script>

<style scoped lang="scss">
// 只需要进入的动画
.fade-enter-active {
  transition: 0.5s;
}
// 从哪来，离开哪去，用同一组样式
.fade-enter-from {
  opacity: 0;
  transform: scale(0); // 改变 大小
}
// 来到哪，从哪离开，用同一组样式
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
