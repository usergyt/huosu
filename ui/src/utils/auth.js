/*
 * @Author: usergyt userguyatao@163.com
 * @Date: 2022-10-09 13:35:56
 * @LastEditors: usergyt userguyatao@163.com
 * @LastEditTime: 2022-11-18 23:05:50
 * @FilePath: /huosu/ui/src/utils/auth.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export async function setToken(token) {
  return await Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
