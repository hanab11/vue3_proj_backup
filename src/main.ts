import { createApp } from 'vue'
import App from '@/App.vue'

// 引入element-plus插件、样式、国际化
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 引入全局组件插件
import globalComponents from '@/components'
// 引入模板的全局样式
import '@/styles/index.scss'

// 引入svg图标
import 'virtual:svg-icons-register'

// 引入路由器
import router from '@/router'
// 引入路由守卫，路由鉴权
import '@/router/permission'

// 引入大仓库pinia
import pinia from '@/store'

//

// 创建应用实例对象
const app = createApp(App)

// 安装element-plus插件
app.use(ElementPlus, { locale: zhCn })
// 安装自定义插件
app.use(globalComponents)
// 安装路由器
app.use(router)
// 安装大仓库pinia
app.use(pinia)

// 挂载
app.mount('#app')

console.log('环境变量', import.meta.env)
