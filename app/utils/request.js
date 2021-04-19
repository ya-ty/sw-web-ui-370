import axios from 'axios'

const request = axios.create()

export const BASE_URL = process.env.API_URL
request.defaults.baseURL = BASE_URL
request.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'
request.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

export const saveUserData = ({ id, email }) => {
  localStorage.setItem('userId', id)
  localStorage.setItem('userEmail', email)
}

export const clearUserData = () => {
  localStorage.removeItem('userId')
  localStorage.removeItem('userEmail')
}

export const getUserData = () => {
  const id = localStorage.getItem('userId')
  const email = localStorage.getItem('userEmail')
  return { id, email }
}

request.interceptors.request.use(
  request => request,
  error => {
    console.log(error)
  }
)

request.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // TODO Navigate to Login
    }
    return Promise.reject(error)
  }
)

export const post = (url, data, config = {}) => request.post(url, data, config)
export const get = (url, config = {}) => request.get(url, config)
export const put = (url, data, config = {}) => request.put(url, data, config)
export const del = (url, config = {}) => request.delete(url, config)

export const patch = (url, data, config = {}) => request.patch(url, data, config)