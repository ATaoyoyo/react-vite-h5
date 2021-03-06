import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { NavBar, Icon } from 'zarm'

import './style.less'

const Header = ({ title = '' }) => {
  const history = useHistory()

  return (
    <div className="header-wrapper">
      <NavBar
        className="header-wrapper-nav"
        title={title}
        left={
          <Icon
            type="arrow-left"
            theme="primary"
            onClick={() => history.goBack()}
          />
        }
      />
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

export default Header
