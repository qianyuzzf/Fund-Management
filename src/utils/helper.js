import store from '@/store/helper'
import axios from '@/axios/helper'
import configs from '@/configs/helper'
import * as common from '@/utils/common'

const helper = {
  $store: store,
  $configs: configs,
  $axios: axios,
  $common: common,
}

export default helper