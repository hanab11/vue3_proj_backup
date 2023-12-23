// 定义登录接口所需参数的ts类型
export interface loginFormData {
  username: string
  password: string
}

// 先定义全部数据接口都拥有的ts类型，方便继承
interface responseData {
  code: number
  message: string
  ok: boolean
}

// 定义登录接口返回的数据的ts类型
export interface loginResponseData extends responseData {
  data: string
}

// 定义获取用户信息返回的数据的ts类型
export interface userInfoReponseData extends responseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
