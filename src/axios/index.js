import axios from 'axios'
import _ from 'lodash'

export const http = (fn, config = {}) => {
  const options = {
    success: '请求成功！',
    error: '请求成功！',
    ...config,
  }
  return new Promise((resolve) => {
    const request = fn(axios)
    if (!request || !request.then) {
      resolve({
        status: 500,
        data: null,
        code: 500,
        msg: options.error,
      })
    }
    request.then((resp) => {
      const respData = _.cloneDeep(resp) || {}
      const {status} = respData
      let data = {}
      if (respData.data) {
        if (respData.data.data) {
          data = respData.data.data
        } else {
          data = respData.data
        }
      }
      const data2 = data || {}
      if (typeof options.formatData === 'function') {
        data = options.formatData(data)
      }
      resolve({
        status,
        data,
        code: data2.code || data2.suc || status,
        msg: data2.msg || data2.message || options.success,
      })
    }).catch((resp) => {
      const respData = _.cloneDeep(resp) || {}
      const {status} = respData
      let data = {}
      if (respData.data) {
        if (respData.data.data) {
          data = respData.data.data
        } else {
          data = respData.data
        }
      }
      const data2 = data || {}
      resolve({
        status,
        data,
        code: data2.code || data2.suc || status,
        msg: data2.msg || data2.message || resp.msg || options.error,
      })
      throw new Error(resp)
    })
  })
}

export const xxx = () => {
}