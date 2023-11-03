// 定义登录接口所需参数的ts类型
export interface loginFormData {
  username: string
  password: string
}

interface dataType {
  token: string
}
// 定义服务器返回登录接口的数据的ts类型
export interface loginResponseData {
  code: number
  data: dataType
}

interface checkUser {
  userInfo: {
    userId: number
    avatar: string
    username: string
    password: string
    desc: string
    roles: string[]
    buttons: string[]
    routes: string[]
    token: string
  }
}
// 定义服务器返回用户信息的数据的ts类型
export interface userInfoReponseData {
  code: number
  data: checkUser
}
