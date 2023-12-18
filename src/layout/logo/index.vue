<template>
  <div class="logo_container" v-if="setting.logoIsShow">
    <img :src="setting.logoPath" alt="【logo】" />
    <!-- white-space: nowrap 不换行防止文字抖动，折叠时隐藏全部文字 -->
    <p v-show="!fold" style="white-space: nowrap">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'

defineProps(['fold'])
</script>

<script lang="ts">
export default {
  name: 'Logo'
}
</script>

<style scoped lang="scss">
.logo_container {
  width: 100%;
  height: $base-logo-height; // 容器高度（不包括内边距）
  display: flex; // 弹性容器
  align-items: center; // 垂直居中对齐，以容器高度为准（text-align水平居中对齐）
  padding: $base-logo-padding;
  margin-left: -5px; // 元素相对自身左移

  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px; // 元素自身外边距（left需配定位使用）
    //overflow: hidden; // 折叠时隐藏溢出文字（添加过渡动画后，存在文字抖动的问题，用v-show解决）
  }
}
</style>
