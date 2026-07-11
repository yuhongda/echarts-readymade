import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: `https://hacker-news.firebaseio.com/v0/`
})

axiosInstance.defaults.timeout = 120000
axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

axios.interceptors.request.use(
  (req) => {
    if (req?.headers) {
      const headers = req.headers as Record<string, any>
      headers.common = headers.common || {}
      Object.assign(headers.common, {
        XMLHttpRequest: 'X-Requested-With',
        refererClone: window.location.href
      })
    }
    return req
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (res) => {
    if (res.status !== 200) {
      return Promise.reject(res)
    }
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default function (config: any) {
  if (config.errorTitle) {
    if (!config.transformResponse) {
      config.transformResponse = []
    }
    Array.isArray(config.transformResponse) &&
      config.transformResponse.push((data: any) => ({
        ...JSON.parse(data),
        errorTitle: config.errorTitle
      }))
  }

  return axiosInstance(config).catch(function (res) {
    return res
  })
}
