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
      return resolve({
        status: 500,
        data: null,
        code: 500,
        msg: options.error,
      })
    }
    request.then((resp) => {
      const respData = _.cloneDeep(resp) || {}
      const status = respData.status
      let data = respData.data ? (respData.data.data ? respData.data.data : respData.data) : {}
      const _data = data || {}
      typeof options.formatData === 'function' && (data = options.formatData(data))
      resolve({
        status,
        data,
        code: _data.code || _data.suc || status,
        msg: _data.msg || _data.message || options.success,
      })
    }).catch((resp) => {
      const respData = _.cloneDeep(resp) || {}
      const status = respData.status
      let data = respData.data ? (respData.data.data ? respData.data.data : respData.data) : {}
      const _data = data || {}
      resolve({
        status,
        data,
        code: _data.code || _data.suc || status,
        msg: _data.msg || _data.message || resp.msg || options.error,
      })
      console.error(resp)
    })
  })
}