import axios from 'axios'



const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net/'  // 请求的基础路径
  })


  //请求拦截器
  request.interceptors.request.use(
    // 任何所有请求会经过这里
    // config 是当前请求相关的配置信息对象
    // config 是可以修改的
    function (config) {
      const user = JSON.parse(window.localStorage.getItem('user'))
  
      // 如果有登录用户信息，则统一设置 token
      if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
      }
  
      // 然后我们就可以在允许请求出去之前定制统一业务功能处理
      // 例如：统一的设置 token
  
      // 当这里 return config 之后请求在会真正的发出去
      return config
    },
    // 请求失败，会经过这里
    function (error) {
      return Promise.reject(error)
    }
  )
  
  export default request  