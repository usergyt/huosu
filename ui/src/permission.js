/*
 * @Author: guyatao guyatao@hashdata.cn
 * @Date: 2022-10-09 13:35:56
 * @LastEditors: usergyt userguyatao@163.com
 * @LastEditTime: 2022-11-18 21:44:42
 * @FilePath: /huosu/ui/src/permission.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken, setToken } from '@/utils/auth'

import { isRelogin } from '@/utils/request'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  let code = ''
  if (to.query.redirect || to.query.code) {
    if (to.query.code) {
      code = to.query.code
    } else {
      code = to.query.redirect.split('code=')[1].split('&')[0]
    }
  }
  if (getToken() || code) {
    to.meta.title && store.dispatch('settings/setTitle', to.meta.title)
    /* has token*/
    // if (to.path === '/login') {
    //   next({ path: '/' })
    //   NProgress.done()
    // }
    // 重新授权code
    if (code) {
      const sellerId = await store.dispatch('AuthLogin', code)

      await store.dispatch('Login', sellerId)
    }

    if (store.getters.roles.length === 0) {
      isRelogin.show = true
      // 判断当前用户是否已拉取完user_info信息
      store.dispatch('GetInfo').then(() => {
        isRelogin.show = false
        store.dispatch('GenerateRoutes').then(accessRoutes => {
          // 根据roles权限生成可访问的路由表
          router.addRoutes(accessRoutes) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          // next({ path: '/' })
        })
      }).catch(err => {
        store.dispatch('LogOut').then(() => {
          Message.error(err)

          next({ path: '/' })
        })
      })
    } else {
      next()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      // location.href = `${process.env.VUE_AUTHORIZE}?response_type=code&client_id=${process.env.VUE_APP_CLIENT_ID}&redirect_uri=${process.env.VUE_APP_REDIRECT_URI}`
      location.href = `${process.env.VUE_APP_AUTHORIZE}?response_type=code&app_id=${process.env.VUE_APP_ID}&redirect_uri=${process.env.VUE_APP_REDIRECT_URI}&scope=${process.env.VUE_APP_SCOPE}`

      // next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
