// 布局配置相关的小仓库模块
import { defineStore } from 'pinia'

// 创建小仓库ConfigStore，选项式
const useLayoutConfigStore = defineStore('Config', {
  state: () => {
    return {
      isFold: false, // 控制菜单是否折叠
      isRefresh: false // 控制内容展示区是否刷新
    }
  }
})

// 暴露
export default useLayoutConfigStore
