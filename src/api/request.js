import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

const baseURL = process.env.NODE_ENV === 'development' ? '/host' : '/'
console.log('process.env: ', process.env)

const instance = axios.create({
  baseURL,
  timeout: 30000
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
  console.log('请求 config: ', config, qs.stringify(config.data), config.data)
  if (config.method === 'get') {
    config.params = config.data
  }
  if (config.method !== 'get' && config.qs) {
    config.data = qs.stringify(config.data)
  }
  // 在发送请求之前做些什么
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

instance.interceptors.response.use(config => {
  console.log('响应config: ', config)
  // 对响应数据做点什么
  return config
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance