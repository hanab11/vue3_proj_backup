<template>
  <!-- 遍历路由数组 -->
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 分析逻辑：先看是否展示，再按有无子路由区分 -->
    <template v-if="!item.meta.hidden">
      <!-- 无子路由，用普通菜单 -->
      <el-menu-item v-if="!item.children" :index="item.path" @click="pushRoute">
        <el-icon>
          <!-- component标签，实现动态绑定组件 -->
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- 用法B：这里用具名插槽title，为了在大菜单折叠时有内容提示，此时不可放图标（仅限无子路由的一级菜单） -->
        <template #title>
          <!-- el-menu的collapse保留图标、隐藏标题、更改大菜单折叠时样式，需要对标题用span标签 -->
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>

      <!-- 有子路由，用折叠菜单 -->
      <el-sub-menu v-if="item.children" :index="item.path">
        <!-- 用法A：折叠菜单标题，必须用具名插槽title，插槽v-slot简写为# -->
        <template #title>
          <!-- 折叠菜单无需内容提示，此时可放图标在插槽里（仅限有子路由的一级菜单） -->
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 把子路由数组传入自身Menu组件 -->
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
// 引入自身组件，实现递归（把N+1级路由数组当做N级的，再执行一次组件的逻辑代码）
import Menu from './index.vue'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'

// 获取父组件传递的路由数组（理解：传入不同的数据，自身也可以是自身的父组件，这里用props方便递归）
defineProps(['menuList'])

// 获取路由器实例对象
let $router = useRouter()

// 菜单项点击回调
const pushRoute = (vc: any) => {
  ElNotification({ type: 'info', message: `正在访问${vc.index}` }) // 路径提示
  $router.push(vc.index) // 编程式路由跳转
}
</script>

<script lang="ts">
export default {
  name: 'Menu@'
}
</script>

<style scoped></style>
