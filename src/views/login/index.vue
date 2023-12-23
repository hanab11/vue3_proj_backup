<template>
  <div class="login_container">
    <el-row>
      <!-- 一行两列，EL里栅格共占24个单位，xs是宽度小于768时  -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 登录的表单 :model会将表单项存到指定对象上 :rules校验规则 ref获取组件对象 -->
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="elLoginForm"
        >
          <h1>Hello</h1>
          <h2>欢迎</h2>
          <!-- 用户名，el-form-item即每个表单项，其中prop是指派具体的规则 -->
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button
              class="login_btn"
              :loading="isLoading"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { timeMsg } from '@/utils/time'
// 引入用户相关仓库
import useUserStore from '@/store/modules/user'

// 获取路由器、路由的实例对象
let $router = useRouter()
let $route = useRoute()
// 获取用户相关的仓库
let userStore = useUserStore()

// 收集表单账密
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })
// 控制按钮样式-loading
let isLoading = ref(false)
// 获取el-form组件实例对象，注：起名不要用elForm，容易冲突！！！
let elLoginForm = ref() // ref获取DOM元素必须在onMounted生命周期，@click回调里也可

// 登录按钮回调
const login = async () => {
  // 分析，点击按钮以后做的事（校验，发请求，跳转，消息提示，交互样式）

  // 保证全部表单校验通过，才发请求（await只接收promise成功的结果，失败就中断）
  let result = await elLoginForm.value.validate() // el-form组件validate方法，校验，接收回调或者返回promise
  console.log('await只接收', result)

  // 开始加载动画
  isLoading.value = true

  /* try catch写法 */
  try {
    // 保证登陆成功
    await userStore.userLogin(loginForm) // 发登录请求

    // 注：判断包括if、三元表达式、逻辑或与...等
    // 判断登录时，路由路径是否有query参数，如果有就往query参数跳转，没有就跳转'/'（已重定向主页）
    let redirect = $route.query.redirect
    $router.push({ path: (redirect as string) || '/' }) // 二选一跳转，可用逻辑或||

    // 成功提示
    ElNotification({
      type: 'success',
      title: `${timeMsg()}`,
      message: '登陆成功' // 暂时写死
    })
  } catch (error) {
    // 停止加载
    isLoading.value = false
    // 失败提示
    ElNotification({
      type: 'error',
      message: (error as Error).message // 类型断言：as手动指定类型，Error是ts默认的类型
    })
  }

  /* promise.then写法 */
  /* userStore.userLogin(loginForm).then(
    // 成功回调
    (response) => {
      $router.push('/home')
      ElNotification({
        type: 'success',
        message: response
      })
    },
    // 失败回调
    (error) => {
      isLoading.value = false
      ElNotification({
        type: 'error',
        message: (error as Error).message
      })
    }
  ) */
}

/* 自定义校验规则（方法），以下属性是传入参数
rule 校验对象，_占位
value 表单元素的文本内容
callback 放行函数，符合条件直接callback，不符合callback需要传参 Error错误提示信息
 */
const validatorUsername = (_: any, value: any, callback: any) => {
  value.length >= 5 ? callback() : callback(new Error('账号长度至少5位'))
}
const validatorPassword = (_: any, value: any, callback: any) => {
  value.length >= 6 ? callback() : callback(new Error('密码长度至少6位'))
}

/* 表单校验规则，以下属性是默认规则
required 代表这个字段必须
min 文本长度至少多少位、max 文本长度最多多少位
message 错误的提示信息
trigger 触发校验表单的时机：change 文本发生变化触发校验、blur 失去焦点的时候触发校验
validator 校验器，需配合自定义规则
 */
const rules = {
  username: [
    /* {required: true, min: 5, message: '账号长度至少5位', trigger: 'change'} */
    {
      trigger: 'change',
      validator: validatorUsername
    }
  ],
  password: [
    /* {required: true, min: 6, message: '密码长度至少6位', trigger: 'change'} */
    {
      trigger: 'change',
      validator: validatorPassword
    }
  ]
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh; // 视口样式，单位vh
  background: url('@/assets/images/background.jpg') no-repeat; // 背景图不重复
  background-size: cover; // 覆盖

  .login_form {
    position: relative; // 相对定位
    width: 75%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 60px; // 内边距

    h1 {
      font-size: 40px;
      color: white;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px; // 上下 左右 外边距
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
