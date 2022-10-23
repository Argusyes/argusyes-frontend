import axios from 'axios'

// 配置 Mock 和 生产环境的 URL
const URL = {
  MOCK: '',
  // PROD: 'https://dev1.bfdx.com:8443/adminBackend/',
  PROD: 'http://tmp.lab.bupt:9999/',
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
    const token = JSON.parse(localStorage.getItem('token-info')).token ?? ''
    const authorization = `Bearer ${token}`
    const xToken = JSON.parse(localStorage.getItem('token-info')).xToken ?? ''
    return requestRaw({
      url,
      params,
      headers: {
        'Authorization': authorization,
        'X-Token': xToken,
      },
    })
  },
  post(url, body) {
    const token = JSON.parse(localStorage.getItem('token-info')).token ?? ''
    const authorization = `Bearer ${token}`
    const xToken = JSON.parse(localStorage.getItem('token-info')).xToken ?? ''
    return requestRaw({
      url,
      method: 'POST',
      data: body,
      headers: {
        'Authorization': authorization,
        'X-Token': xToken,
      },
    })
  },
  delete(url, body) {
    const token = JSON.parse(localStorage.getItem('token-info')).token ?? ''
    const authorization = `Bearer ${token}`
    return requestRaw({
      url,
      method: 'DELETE',
      data: body,
      headers: {
        Authorization: authorization,
      },
    })
  },
  put(url, params, body) {
    const token = JSON.parse(localStorage.getItem('token-info')).token ?? ''
    const authorization = `Bearer ${token}`
    return requestRaw({
      url,
      method: 'PUT',
      params,
      data: body,
      headers: {
        Authorization: authorization,
      },
    })
  },
}

export const api = {
  /* 登录界面 */
  loginPage: {
    login(body) {
      return request.post('/login', body)
    },
  },
  site: {
    logout(body) {
      return request.post('/logout', body)
    },
  },

  /* 服务器管理 */
  serverManagementPage: {
    getList(params) {
      return request.get('/server/list', params)
    },
    getListByServerName(params) {
      return request.get('/server/selectByName', params)
    },
    addListItem(body) {
      return request.post('/server/add', body)
    },
    updateListItem(body) {
      return request.post('/server/update', body)
    },
    deleteListItem(params) {
      return request.get('/server/delete', params)
    },
    startServer(params) {
      return request.get('/server/start', params)
    },
    stopServer(params) {
      return request.get('/server/stop', params)
    },
  },

  /* 代理商管理 */
  agencyManagementPage: {
    getList(params) {
      return request.get('/agency/list', params)
    },
    getListByAgencyName(params) {
      return request.get('/agency/selectByName', params)
    },
    getDetail(params) {
      return request.post('/agency/detail', params)
    },
    addAgency(body) {
      return request.post('/agency/addAgency', body)
    },
    updateAgency(body) {
      return request.post('/agency/updateAgency', body)
    },
    deleteAgency(params) {
      return request.get('/agency/delete', params)
    },
  },

  /* 日志管理 */
  logManagementPage: {
    getLogList(body) {
      return request.post('/logManager/getLog', body)
    },
  },

  /* 子账号管理 */
  subAccountManagementPage: {
    getSubAccountList(body) {
      return request.post('/subAccount/AllSubAccount', body)
    },
    getSubAccountListByUserName(body) {
      return request.post('/subAccount/searchSubAccount', body)
    },
    deleteSubAccount(body) {
      return request.post('/subAccount/deleteSubAccount', body)
    },
    updateSubAccount(body) {
      return request.post('/subAccount/updateSubAccount', body)
    },
    getMasterFunction(body) {
      return request.post('/subAccount/getMasterFunction', body)
    },
  },

  /* 设备查询 */
  equipmentQueryPage: {
    getListByBatch(body) {
      return request.post('/comprehensive/deviceAll', body)
    },
  },

  /* 设备列表 */
  equipmentListPage: {
    //
  },

  /* 设备出入库 */
  equipmentIOPage: {
    //
  },

  /* 录音管理 */
  recordingManagementPage: {
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
