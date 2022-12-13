/*
 * @Author: guyatao guyatao@hashdata.cn
 * @Date: 2022-10-19 16:25:48
 * @LastEditors: usergyt userguyatao@163.com
 * @LastEditTime: 2022-12-12 21:37:50
 * @FilePath: /huosu/ui/src/api/system/goods.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'
// 采集请求
export function collectList(data) {
  return request({
    url: '/system/goods/collect',
    method: 'Post',
    data: data
  })
}

export function categoryList(data) {
  return request({
    url: '/system/goods/categoryList',
    method: 'get',
    params: data
  })
}
export function expressList(data) {
  return request({
    url: '/system/goods/expressList',
    method: 'get',
    params: data
  })
}
// 查询采集列表
export function taskList(query) {
  return request({
    url: '/system/goods/tasklist',
    method: 'get',
    params: query
  })
}
// 提交采集
export function submitTask(data) {
  console.log(data, '===')
  return request({
    url: '/system/goods/submit',
    method: 'Post',
    data: data
  })
}

// 删除采集记录
export function delTask(goodsId) {
  return request({
    url: '/system/goods/' + goodsId,
    method: 'delete'
  })
}

// 查询参数详细
export function getGoods(configId) {
  return request({
    url: '/system/goods/' + configId,
    method: 'get'
  })
}

// 根据参数键名查询参数值
export function getConfigKey(configKey) {
  return request({
    url: '/system/goods/configKey/' + configKey,
    method: 'get'
  })
}

// 新增参数配置
export function addGoods(data) {
  return request({
    url: '/system/goods',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateGoods(data) {
  return request({
    url: '/system/goods',
    method: 'put',
    data: data
  })
}

// 删除参数配置
export function delConfig(configId) {
  return request({
    url: '/system/goods/' + configId,
    method: 'delete'
  })
}

// 刷新参数缓存
export function refreshCache() {
  return request({
    url: '/system/goods/refreshCache',
    method: 'delete'
  })
}
