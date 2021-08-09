import React, { useState } from 'react'
import { Button, Cell, Checkbox, Input } from 'zarm'

import CustomIcon from '/@/components/CustomIcon'
import s from './style.module.less'

const Login = () => {
  const [checked, setChecked] = useState(false)
  // 登录
  const handLogin = () => {}

  // 协议
  const handChangeAgreement = () => {
    setChecked(!checked)
  }

  return (
    <div className={s.login}>
      <div className="pane">
        <Cell title="" icon={<CustomIcon type="zhanghao" />}>
          <Input type="text" placeholder="请输入用户名" />
        </Cell>
        <Cell title="" icon={<CustomIcon type="mima" />}>
          <Input type="password" placeholder="请输入密码" />
        </Cell>
        <Cell title="" icon={<CustomIcon type="mima" />}>
          <Input type="text" placeholder="请输入验证码" />
        </Cell>

        <p className="agreement">
          <Checkbox checked={checked} onChange={handChangeAgreement}>
            同意用户隐私协议
          </Checkbox>
        </p>

        <div className="opt">
          <Button className="opt-btn" block theme="primary" onClick={handLogin}>
            登录
          </Button>
          <Button className="opt-btn" block>没有账号？注册一个吧！</Button>
        </div>
      </div>
    </div>
  )
}

export default Login
