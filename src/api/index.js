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
    const jwt = localStorage.getItem('jwt')
    return requestRaw({
      url,
      params,
      headers: {
        'A-Token': jwt,
      },
    })
  },
  post(url, body) {
    const jwt = localStorage.getItem('jwt')
    return requestRaw({
      url,
      method: 'POST',
      data: body,
      headers: {
        'A-Token': jwt,
      },
    })
  },
  delete(url, body) {
    const jwt = localStorage.getItem('jwt')
    return requestRaw({
      url,
      method: 'DELETE',
      data: body,
      headers: {
        'A-Token': jwt,
      },
    })
  },
  put(url, body) {
    const jwt = localStorage.getItem('jwt')
    return requestRaw({
      url,
      method: 'PUT',
      data: body,
      headers: {
        'A-Token': jwt,
      },
    })
  },
}

export const api = {
  /* 登录界面 */
  loginPage: {
    login(body) {
      return request.post('/user/login', body)
    },
    register(body) {
      return request.post('/user/register', body)
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
    addHosts(body) {
      return request.post('/user/addSSH', body)
    },
    deleteHosts(body) {
      return request.delete('/user/deleteSSH', body)
    },
    updateHosts(body) {
      return request.put('/user/updateSSH', body)
    },
    getHostList(params) {
      return request.get('/user/selectSSH', params)
    },
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
