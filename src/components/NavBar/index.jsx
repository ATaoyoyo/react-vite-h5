import React, { useState } from 'react'
import PropType from 'prop-types'
import { useHistory } from 'react-router-dom'
import { TabBar, Icon } from 'zarm'

import s from './style.modue.less'

const NavBar = ({ showNav }) => {
  const [active, setActive] = useState('/')
  const history = useHistory()

  const changeTab = path => {
    setActive(path)
    history.push(path)
  }


  return <TabBar className={ s.tab } visible={ showNav } activeKey={ active } onChange={ changeTab }>
    <TabBar.Item icon={ <Icon type="date" /> } itemKey="/" title="账单" />
    <TabBar.Item icon={ <Icon type="date" /> } itemKey="/data" title="统计" />
    <TabBar.Item icon={ <Icon type="date" /> } itemKey="/user" title="我的" />
  </TabBar>
}

NavBar.propTypes = {
  showNav: PropType.bool
}

export default NavBar
