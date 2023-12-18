// 封装本地存储数据（token）

// 读数据，需要返回值
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

// 写（存）数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

// 清除数据
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
