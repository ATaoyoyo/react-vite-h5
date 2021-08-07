import axios from 'axios'
import { Toast } from 'zarm'

const MODE = import.meta.env.MODE

const instance = axios.create({
  baseURL: MODE === 'development' ? '/api' : 'http://api.chennick.wang',
  withCredentials: true,
  headers: {
    'X-Request-With': 'XMLHttpRequest',
    'Authorization': `${ localStorage.getItem('token') || null }`,
    post: { 'Content-Type': 'application/json' }
  },
})

instance.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    Toast.show('服务端异常')
    return new Promise.reject(res)
  }
  if (res.data.code !== 200) {
    if (res.data.message) Toast.show(res.data.message)
    if (res.data.code === 401) {
      window.location.href = '/login'
      return new Promise.reject(res.data)
    }
  }

  return res.data
})


export default instance
