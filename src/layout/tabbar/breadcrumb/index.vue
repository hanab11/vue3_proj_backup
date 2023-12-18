<template>
  <!-- 折叠按钮 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <!-- 动态图标组件 -->
    <component :is="configStore.isFold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!-- el面包屑组件，其中每一项是el-breadcrumb-item，separator-icon图标分隔符，to属性让父路由可点击路由跳转 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 遍历匹配数据，$route.matched根据路由表得到匹配数据 -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="!item.meta.hidden"
      :to="item.path"
    >
      <!-- 展示匹配的图标 -->
      <el-icon class="icon_container">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 展示匹配的标题 -->
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutConfigStore from '@/store/modules/config'
//import { useRoute } from 'vue-router' // 模板里可以直接使用$route实例对象

// 获取布局配置相关的仓库
let configStore = useLayoutConfigStore()

// 点击折叠按钮的回调
const changeIcon = () => {
  configStore.isFold = !configStore.isFold // 切换
}
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb'
}
</script>

<style scoped lang="scss">
.icon_container {
  vertical-align: top; // 把元素的顶部与行中最高元素的顶部对齐（垂直对齐）
}
</style>
