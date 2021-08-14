import React, { useCallback, useState } from 'react'
import { Button, Cell, Checkbox, Input, Toast } from 'zarm'
import Captcha from 'react-captcha-code/build/es'

import CustomIcon from '/@/components/CustomIcon'
import { post } from '../../utils'
import './style.less'

const Login = () => {
  const [checked, setChecked] = useState(true)
  // 账号
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [captcha, setCaptcha] = useState('')
  // 登录
  const handLogin = async () => {
    const pass = verifyUserInfo()

    if (!pass) return
    try {
      const { data, msg: message } = await post('/user/login', {
        username,
        password,
      })
      Toast.show(message)
      if (data) localStorage.setItem('TOKEN', data.token)
    } catch (e) {
      console.log(e)
    }
  }

  // 注册
  const handRegister = async () => {
    const pass = verifyUserInfo()

    if (!pass) return

    try {
      const { msg } = await post('/user/register', { username, password })
      Toast.show(msg)
    } catch (e) {
      console.log(e)
    }
  }

  // 协议
  const handChangeAgreement = () => {
    setChecked(!checked)
  }

  // 拿到验证码
  const handChange = useCallback((captcha) => {
    setCaptcha(captcha)
  }, [])

  // 验证
  const verifyUserInfo = () => {
    if (!username || !password || !verify) {
      Toast.show('请填写用户名和密码')
      return false
    } else if (captcha !== verify) {
      Toast.show('验证码错误')
      return false
    }

    return true
  }

  return (
    <div className="login">
      <div className="pane">
        <div className="login-bg">
          <img src="/@/assets/img/loginBg.png" alt="" />
        </div>
        <Cell title="" icon={<CustomIcon type="zhanghao" />}>
          <Input
            clearable
            type="text"
            placeholder="请输入用户名"
            onChange={(val) => setUsername(val)}
          />
        </Cell>
        <Cell title="" icon={<CustomIcon type="mima" />}>
          <Input
            clearable
            type="password"
            placeholder="请输入密码"
            onChange={(val) => setPassword(val)}
          />
        </Cell>
        <Cell title="" icon={<CustomIcon type="mima" />}>
          <Input
            clearable
            type="text"
            placeholder="请输入验证码"
            onChange={(val) => setVerify(val)}
          />
          <Captcha charNum={4} onChange={handChange} />
        </Cell>

        <p className="agreement">
          <Checkbox checked={checked} onChange={handChangeAgreement}>
            同意用户隐私协议
          </Checkbox>
        </p>

        <div className="opt">
          <Button
            className="opt-btn"
            shadow
            block
            theme="primary"
            onClick={handLogin}
          >
            登录
          </Button>
          <Button className="opt-btn" shadow block onClick={handRegister}>
            没有账号？立即注册！
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
