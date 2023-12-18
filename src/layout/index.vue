<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_menu" :class="{ fold: configStore.isFold }">
      <!-- Logo组件 -->
      <Logo :fold="configStore.isFold"></Logo>
      <!-- 菜单展示 -->
      <!-- el滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- el菜单组件，其中每一项是el-menu-item，default-active在刷新后激活到路由指定菜单项 -->
        <el-menu
          background-color="gray"
          text-color="whitesmoke"
          active-text-color="yellow"
          :default-active="$route.path"
          :collapse="configStore.isFold"
          :collapse-transition="false"
        >
          <!-- Menu组件，传入路由数组，动态生成菜单项 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航栏 -->
    <div class="layout_tabbar" :class="{ fold: configStore.isFold }">
      <!-- Tabbar组件 -->
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区 -->
    <div class="layout_main" :class="{ fold: configStore.isFold }">
      <!-- Main组件 -->
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user'
import useLayoutConfigStore from '@/store/modules/config'
//import { useRoute } from 'vue-router' // 模板里可以直接使用$route实例对象

// 获取用户相关的仓库，用props把路由数据传递到子路由
let userStore = useUserStore()
// 获取布局配置相关的仓库
let configStore = useLayoutConfigStore()
</script>

<script lang="ts">
export default {
  name: 'Layout' // 方便开发者工具区别组件
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background: skyblue; // 仅区分，后期删

  .layout_menu {
    color: whitesmoke;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s; // 过渡 展示菜单宽度变化

    // &连接符，串联关系，会作用在同一个标签上 即 .layout_menu.flod
    &.fold {
      width: $base-menu-min-width;
    }

    .scrollbar {
      width: 100%;
      // 实际高度 = logo高度 + 内边距 * 2
      height: calc(100vh - $base-logo-height - $base-logo-padding * 2);

      .el-menu {
        border-right: none; // 无右侧边界
        margin-left: -7px; // 元素相对自身左移，对齐logo
      }
    }
  }

  .layout_tabbar {
    position: fixed; // fixed固定定位，常见于导航栏
    width: calc(100% - $base-menu-width); // calc计算
    height: $base-tabbar-height;
    left: $base-menu-width;
    top: 0px;
    background: whitesmoke; // 仅区分，后期删
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute; // absolute绝对定位
    width: calc(100% - $base-menu-width - $base-main-padding * 2);
    height: calc(100vh - $base-tabbar-height - $base-main-padding * 2);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: $base-main-padding; // 设置内边距，需要在宽高里减掉padding*2，否则会撑出滑动条
    overflow: auto; // 若太高自动延伸
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width - $base-main-padding * 2);
      left: $base-menu-min-width;
    }
  }
}
</style>
