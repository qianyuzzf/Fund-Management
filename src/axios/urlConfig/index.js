import _ from 'lodash'
import login from '@/axios/urlConfig/login/index'

const urlConfig = {
  ...login,
}

const URL = {}
const proxyPrefix = '/api'
_.forEach(urlConfig, (item, index) => {
  if (item.startsWith('/')) {
    URL[index] = proxyPrefix + item
  } else {
    URL[index] = item
  }
})

export default URL