import axios from 'axios'
// import router from '@/router'
// import store from '@/store'
import { setCookie, getCookie } from '@/utils/auth'
import { Notification } from 'element-ui'
const qs = require('qs')
const tokenName = 'foresttk'
const refreshTokenName = 'forestrt'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
const errorHandle = config => {
  const refreshToken = getCookie(refreshTokenName) ? getCookie(refreshTokenName) : ''
  if (refreshToken) {
    return axios
      .post('/api/oauth/access_token', {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
      .then(res => {
        if (res && res.data) {
          handleToken(res.data)
          return instance.request(config)
        } else {
          handleUnsuccess('用户凭证更新失败 请重新登录', 'refreshError')
          return null
        }
      })
      .catch(err => {
        // debug
        console.log(err)
        handleUnsuccess('用户凭证更新失败 请重新登录', 'refreshError')
        return null
      })
  } else {
    handleUnsuccess('用户凭证更新失败 请重新登录', 'refreshError')
    return null
  }
}

const instance = axios.create({
  timeout: 1000 * 60
})
// common

instance.defaults.headers.post['Content-Type'] =
  'application/json;charset=UTF-8'

instance.interceptors.request.use(
  config => {
    const token = getCookie(tokenName)
    token && (config.headers.Authorization = token)
    // // 总结：使用List<Long>和Long[]是没有区别的，区别在于@RequestParam中是否加[]

    // qs.stringify({ids: [1, 2, 3]}, {arrayFormat: ‘indices‘})

    // //形式： ids[0]=1&aids[1]=2&ids[2]=3 @RequestParam无法接收

    // qs.stringify({ids: [1, 2, 3]}, {arrayFormat: ‘brackets‘})

    // //形式：ids[]=1&ids[]=2&ids[]=3 要加[]

    // qs.stringify({ids: [1, 2, 3]}, {arrayFormat: ‘repeat‘})

    // //形式： ids=1&ids=2&ids=3 不能加[]

    // get方法传递数组 序列化参数
    if (config.method === 'get') {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, {
          arrayFormat: 'repeat'
        })
      }
    }
    config.timeout = 1000 * 60 * 3
    // 下载 zip 文件流 配置 返回格式
    if (config.url.includes('exportShpByForest')) {
      config.responseType = 'blob'
      config.timeout = 1000 * 60 * 3
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200) {
      if (res?.data?.success) {
        // return res.data
        return res
      } else if (res.config.url.includes('login')) {
        handleToken(res.data)
        // return res.data
        return res
      } else if (res.config.url.includes('exportShpByForest')) {
        return handleExportFile(res)
      } else {
        handleUnsuccess(res.data.message, '200then')
        return null
      }
    } else {
      handleUnsuccess(res, 'not200then')
      return null
    }
  },
  // 请求失败
  error => {
    const {
      response, config
    } = error
    if (response) {
      if (!response.config.url.includes('login') && response.status === 401) {
        return errorHandle(config)
      } else if (response.config.url.includes('login')) {
        handleUnsuccess(response.config, 'loginError')
        return null
      } else {
        handleUnsuccess(response, 'not200then')
        return null
      }
    } else {
      handleUnsuccess(response, 'error2')
      return null
    }
  }
)

export default instance

function handleUnsuccess (data, type) {
  switch (type) {
    case '200then':
      Notification.error({
        title: '接口失败',
        message: data
      })
      break
    case 'not200then':
      Notification.error({
        title: `接口失败${data.status}`,
        message: '接口不存在！'
      })
      break
    case 'loginError':
      Notification.error({
        title: '登录失败',
        message: '请正确输入您的账户密码！'
      })
      break
    case 'refreshError':
      //    store.dispatch('user/logout').then(res=>{
      //     router.push('/login')
      // })
      Notification.error({
        title: '用户凭证失效',
        message: '请重新登录！'
      })
      break
  }
}

function handleToken (data) {
  setCookie(tokenName, data.token_type + ' ' + data.access_token, data.expires_in * 1000)
  setCookie(refreshTokenName, data.refresh_token, 7 * 24 * 3600 * 1000)
}

function handleExportFile (res) {
  return new Promise(resolve => {
    const {
      data
    } = res
    if (data.type === 'application/json') {
      const file = new FileReader()
      file.readAsText(data, 'utf-8')
      file.onload = () => {
        const json = JSON.parse(file.result)
        Notification.error({
          title: '导出失败',
          message: json.message
        })
      }
      resolve({
        data: {
          success: true,
          data: true
        }
      })
    } else {
      const blob = new Blob([data], {
        type: 'application/zip'
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a') // 创建a标签
      link.style.display = 'none'
      link.href = url
      link.download = '林地信息.zip'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      resolve({
        data: {
          success: true,
          data: true
        }
      })
    }
  })
}
