import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Cell } from 'zarm'

import { get } from '../../utils'
import './style.less'

const User = () => {
  const [userInfo, setUserInfo] = useState({})

  const history = useHistory()

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    try {
      const { data } = await get('/user/get_userinfo')
      setUserInfo(data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="user">
      <div className="user__pane">
        <div className="nick">
          <p className="name">
            <span>昵称：</span>
            <span>{userInfo.username}</span>
          </p>
          <p className="text">{userInfo.signature}</p>
        </div>
        <div className="avatar">
          <img src={userInfo.avatar} alt="" />
        </div>
      </div>
      <div className="user__info">
        <div className="pane">
          <Cell
            hasArrow
            title="用户信息修改"
            onClick={() => history.push('/userinfo')}
            icon={
              <img
                style={{ width: 20, verticalAlign: '-7px' }}
                src="//s.yezgea02.com/1615974766264/gxqm.png"
                alt=""
              />
            }
          />
          <Cell
            hasArrow
            title="重制密码"
            onClick={() => history.push('/account')}
            icon={
              <img
                style={{ width: 20, verticalAlign: '-7px' }}
                src="//s.yezgea02.com/1615974766264/zhaq.png"
                alt=""
              />
            }
          />
          <Cell
            hasArrow
            title="关于我们"
            onClick={() => history.push('/about')}
            icon={
              <img
                style={{ width: 20, verticalAlign: '-7px' }}
                src="//s.yezgea02.com/1615975178434/lianxi.png"
                alt=""
              />
            }
          />
        </div>
      </div>
    </div>
  )
}

export default User
