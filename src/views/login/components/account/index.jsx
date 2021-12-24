import React, {useEffect, useState} from 'react'
import {Input} from 'antd-mobile'

const Account = (props) => {
  const {
    value = '',
    onChange,
    onBlur = () => {
    },
  } = props || {}
  const [account, setAccount] = useState(value)

  const onInputChange = () => {
    let expectValue = value.toString().replace(/\s/g, '')
    if (!Number.isNaN(parseFloat(expectValue))) {
      expectValue = expectValue.replace(/[\d\s]{4}/g, (char) => `${char} `).trim()
      setAccount(expectValue)
      if (typeof onChange === 'function') {
        onChange(expectValue)
      }
    }
  }

  useEffect(() => {
    setAccount(value)
  }, [value])

  return (
    <Input value={account} placeholder='请输入手机号' onChange={onInputChange} onBlur={onBlur}/>
  )
}

export default Account