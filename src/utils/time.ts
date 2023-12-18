// 封装当前时间、时间消息

// 返回当前时间：凌晨|早上|中午|下午|晚上
export const getTime = () => {
  let time = ''
  // 通过内置构造函数Date获取小时
  const hours = new Date().getHours()
  if (hours <= 5) time = '凌晨'
  else if (hours <= 11) time = '早上'
  else if (hours <= 13) time = '中午'
  else if (hours <= 18) time = '下午'
  else time = '晚上'

  return time
}

// 根据当前时间，加工消息，凌晨特殊提示
export const timeMsg = () => {
  let msg = ''
  getTime() === '凌晨'
    ? (msg = 'Zzzz，夜深了，晚安~')
    : (msg = 'Hi，' + getTime() + '好~')

  return msg
}
