import _ from 'lodash'

/**
 * 对一个对象数组深度遍历，仅对子节点筛选出需要的内容，不会更改原数组，返回一个数组
 * @param {object[]} arr
 * @param {function} fn
 * @param {string} key
 * @returns {array}
 */
export const deepLeafFilter = (arr, fn, key = 'children') => {
  const result = []
  _.forEach(arr, (item) => {
    const {[key]: children, ...row} = item || {}
    if (children && children.length > 0) {
      const leftArr = deepLeafFilter(children, fn, key)
      if (leftArr.length > 0) {
        row[key] = leftArr
        result.push(row)
      }
    } else {
      if (typeof fn === 'function' && fn(item)) {
        result.push(row)
      }
    }
  })
  return result
}

/**
 * 获取入参数据类型
 * @param {any} target
 * @returns {string} 小写数据类型
 */
export const getType = (target) => {
  const type = Object.prototype.toString.call(target)
  return type.replace(/^\[object\s(\w+)]$/g, '$1').toLowerCase()
}

/**
 * 将入参转换为 Array<value, label> 数组
 * @param {object} object
 * @returns array
 */
export const convertToArray = (object) => {
  let result = []
  const type = getType(object)
  if (type === 'object') {
    for (const key in object) {
      result.push({
        key,
        value: key,
        label: object[key],
      })
    }
  } else if (type === 'array') {
    result = _.map(object, (item, index) => {
      const type2 = getType(item)
      const row = {index}
      if (type2 === 'object') {
        row.value = index
        row.label = item
      } else {
        row.value = item
        row.label = item
      }
      return row
    })
  }
  return result
}

/**
 * 对一个对象数组深度遍历,会更改原数组
 * @param {object[]} array
 * @param {function} fn
 * @param {string} key
 * @param {number} deep
 */
export const deepEach = (array, fn, key = 'children', deep = 0) => {
  deep++
  _.forEach(array, (item, index) => {
    const children = item[key]
    if (children && children.length > 0) {
      deepEach(children, fn, key, deep)
    }
    return fn(item, index, deep)
  })
}