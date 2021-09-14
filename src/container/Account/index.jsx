import React from 'react'
import { Cell, Input, Button, Toast } from 'zarm'
import { createForm } from 'rc-form'

import Header from '../../components/Header'
import { post } from '../../utils'

import './style.less'

const Account = (props) => {
  // Account 通过 createForm 高阶组件包裹之后，可以在 props 中获取到 form 属性
  const { getFieldProps, getFieldError } = props.form

  const handSave = () => {
    props.form.validateFields(async (error, value) => {
      if (error) return

      if (value.newPass1 !== value.newPass2) {
        Toast.show('两次密码不一致！')
        return
      }

      await post('/user/modify_pass', {
        old_pass: value.oldPass,
        new_pass: value.newPass1,
        new_pass2: value.newPass2,
      })
      Toast.show('修改成功')
    })
  }

  return (
    <div className="account">
      <Header title="修改密码" />
      <div className="account__pane">
        <Cell title="原密码">
          <Input
            clearable
            type="password"
            placeholder="请输入原密码"
            {...getFieldProps('oldPass', { rules: [{ required: true }] })}
          />
        </Cell>
        <Cell title="新密码">
          <Input
            clearable
            type="password"
            placeholder="请输入原密码"
            {...getFieldProps('newPass1', { rules: [{ required: true }] })}
          />
        </Cell>
        <Cell title="确认密码">
          <Input
            clearable
            type="password"
            placeholder="请输入原密码"
            {...getFieldProps('newPass2', { rules: [{ required: true }] })}
          />
        </Cell>
      </div>

      <div className="account__save">
        <Button block size="sm" theme="primary" onClick={handSave}>
          保存
        </Button>
      </div>
    </div>
  )
}

export default createForm()(Account)
