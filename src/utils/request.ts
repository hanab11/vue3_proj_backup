// 对axios二次封装，使用请求响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

// axios.create方法创建axios实例，可写一些其他的配置
const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径上会携带/api
  timeout: 5000 // 超时时间
})

// 请求拦截器，处理业务：开始进度条、请求头携带公共参数...
axiosRequest.interceptors.request.use((config) => {
  console.log('请求拦截', config)
  // 获取用户相关的仓库
  const userStore = useUserStore()

  // 请求头携带token
  if (userStore.token) config.headers.token = userStore.token

  return config // 需要返回配置对象
})

// 响应拦截器，处理业务：进度条结束、简化服务器返回的数据、处理http网络错误...
axiosRequest.interceptors.response.use(
  (response) => {
    console.log('响应拦截', response)
    // 成功回调，简化数据
    return response.data // 返回数据
  },
  (error) => {
    // 失败回调，处理网络错误
    let msg = '' // msg存储状态，交给ElMessage
    const status = error.response.status // 分析状态码
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg
    })

    return Promise.reject(error) // 需要返回失败的promise对象
  }
)

// 对外暴露
export default axiosRequest
