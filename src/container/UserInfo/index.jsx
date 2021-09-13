import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { FilePicker, Button, Toast, Input } from 'zarm'

import Header from '../../components/Header'
import { get, imgUrlTrans, post } from '../../utils'
import { baseUrl } from '../../config'

import './style.less'

const UserInfo = () => {
  const [user, setUser] = useState({})
  const [avatar, setAvatar] = useState('')
  const [signature, setSignature] = useState('')
  const token = localStorage.getItem('TOKEN')

  const history = useHistory()

  useEffect(() => {
    getUserInfo()
  }, [])

  const handChange = (file) => {
    if (file && file.file.size > 200 * 1024) {
      Toast.show('上传头像不得超过 200 KB！！')
      return
    }
    const formData = new FormData()
    formData.append('file', file.file)

    axios({
      method: 'post',
      url: `${baseUrl}/upload`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    })
      .then((res) => {
        setAvatar(imgUrlTrans(res.data.data))
      })
      .catch((e) => console.log(e))
  }

  // 获取用户信息
  const getUserInfo = async () => {
    const { data } = await get('/user/get_userinfo')
    setUser(data)
    setAvatar(imgUrlTrans(data.avatar))
    setSignature(data.signature)
  }

  // 编辑用户信息方法
  const save = async () => {
    const params = { signature, avatar }
    await post('/user/edit_userinfo', params)

    Toast.show('修改成功')
    // 成功后回到个人中心页面
    history.goBack()
  }

  return (
    <div className="user-info">
      <Header title="用户信息" />
      <div className="pane">
        <p>头像</p>
        <div className="avatar">
          <div className="pic">
            <img src={avatar} alt="" />
          </div>
          <div className="info">
            <p className="desc">
              支持 jpg、png、jpeg 格式大小 200KB 以内的图片
            </p>
            <FilePicker onChange={handChange} accept="image/*">
              <Button theme="primary" size="xs">
                点击上传
              </Button>
            </FilePicker>
          </div>
        </div>

        <p>个性签名</p>
        <div className="signature">
          <Input
            rows={3}
            value={signature}
            placeholder="请输入个性签名"
            onChange={(value) => setSignature(value)}
          />
        </div>

        <Button block theme="primary" size="xs" onClick={save}>
          保存
        </Button>
      </div>
    </div>
  )
}

export default UserInfo
