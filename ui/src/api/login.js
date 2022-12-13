/*
 * @Author: usergyt userguyatao@163.com
 * @Date: 2022-10-09 13:35:54
 * @LastEditors: usergyt userguyatao@163.com
 * @LastEditTime: 2022-11-17 03:17:58
 * @FilePath: /huosu/ui/src/api/login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

// 登录方法
// export function login(username, password, code, uuid) {
//   const data = {
//     username,
//     password,
//     code,
//     uuid
//   }
//   return request({
//     url: '/login',
//     headers: {
//       isToken: false
//     },
//     method: 'post',
//     data: data
//   })
// }
export function login(sellerId) {
  const data = {
    sellerId,
    username: sellerId.toString(),
    password: sellerId.toString()
  }
  return request({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}
// 授权登录
export function authLogin(code) {
  const data = {
    code
  }
  return request({
    url: '/authLogin',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}
