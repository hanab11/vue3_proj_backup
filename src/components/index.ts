// 引入需要注册的全局组件
import SvgIcon from './SvgIcon/index.vue'

// 全局组件对象
const globalComponents = { SvgIcon }

export default {
  // 插件必须有install方法
  install(app) {
    // 遍历全局组件对象
    Object.keys(globalComponents).forEach((key: string) => {
      // 注册为全局组件
      app.component(key, globalComponents[key])
    })
  }
}
