import { createApp } from 'vue'
import App from '@/App.vue'

// 引入element-plus插件、样式、国际化
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore 忽略当前文件ts类型的检测，否则有红色提示（打包会失败）
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './style.css' // 本地默认样式 后期删除

// 引入全局组件插件
import globalComponents from './components'
// 引入模板的全局样式
import '@/styles/index.scss'

// 引入svg图标
import 'virtual:svg-icons-register'

// 引入路由器
import router from '@/router'

// 创建应用实例对象
const app = createApp(App)

// 安装element-plus插件
app.use(ElementPlus, { locale: zhCn })
// 安装自定义插件
app.use(globalComponents)
// 安装路由器
app.use(router)

// 挂载
app.mount('#app')

console.log('环境变量', import.meta.env)
