import axios from 'axios'

// 配置 Mock 和 生产环境的 URL
const URL = {
  MOCK: '',
  // PROD: 'https://dev1.bfdx.com:8443/adminBackend/',
  PROD: 'http://localhost:9097/',
}

// 创建拦截器，在请求或响应被 then 或 catch 处理前拦截它们，对非 200 的响应抛出错误
const requestCreator = () => {
  const axiosInstance = axios.create({
    baseURL: URL.PROD,
  })
  axiosInstance.interceptors.response.use((response) => {
    if (response.status !== 200)
      throw new Error(response.data.message)
    return response.data
  })

  return axiosInstance
}

const requestRaw = requestCreator()

export const request = {
  get(url, params) {
    return requestRaw({
      url,
      params,
    })
  },
  post(url, body) {
    return requestRaw({
      url,
      method: 'POST',
      data: body,
    })
  },
  delete(url, body) {
    return requestRaw({
      url,
      method: 'DELETE',
      data: body,
    })
  },
  put(url, params, body) {
    return requestRaw({
      url,
      method: 'PUT',
      params,
      data: body,
    })
  },
}

export const api = {
  /* 登录界面 */
  loginPage: {
    login(body) {
      return request.post('/user/login', body)
    },
  },
  registerPage: {
    register(body) {
      return request.post('/user/register', body)
    },
  },
  site: {
    logout(body) {
      return request.post('/logout', body)
    },
  },

  /* 服务器管理 */
  statusPage: {
    //
  },
  statusDetailsPage: {
    //
  },
  hostsPage: {
    //
  },

  // GET
  // getProductList(params) {
  //   return request.get('/productInfo/productList', params)
  // },

  // POST
  // login(body) {
  //   return request.post('/login', body)
  // },

  // DELETE
  // deleteCartRecord(body) {
  //   return request.delete('/cart/deleteCartRecord', body)
  // },

  // PUT
  // updateCart(params) {
  //   return request.put('/cart/updateCart', params)
  // },
}
