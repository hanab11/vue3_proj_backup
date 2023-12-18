// 引入全局组件
import SvgIcon from './SvgIcon/index.vue'
// 引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局组件对象
const globalComponents: any = { SvgIcon }

export default {
  // 插件必须有install方法
  install(app: any) {
    // 遍历全局组件对象
    Object.keys(globalComponents).forEach((key: string) => {
      // 注册为全局组件
      app.component(key, globalComponents[key])
    })

    // 将element-plus提供图标组件注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}
