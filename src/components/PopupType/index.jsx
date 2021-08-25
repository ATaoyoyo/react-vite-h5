import React, { forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Popup, Icon } from 'zarm'
import { get } from '../../utils'

import './style.less'

const PopupType = forwardRef(({ onSelect }, ref) => {
  const [show, setShow] = useState(false)
  const [active, setActive] = useState('all')
  const [expense, setExpense] = useState([])
  const [income, setIncome] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const { data } = await get('/type/list')

      setExpense(data.filter((item) => item.type === '1'))
      setIncome(data.filter((item) => item.type === '2'))
    }
    fetch()
  }, [])

  if (ref) {
    ref.current = {
      show: () => setShow(true),
      close: () => setShow(false),
    }
  }

  const choseType = (item) => {
    setActive(item.id)
    setShow(false)
    onSelect(item)
  }

  const className = (normal, type) => {
    return classNames(normal, {
      active: active === type,
    })
  }

  return (
    <Popup
      visible={show}
      direction="bottom"
      onMaskClick={() => setShow(true)}
      destroy={false}
      mountContainer={() => document.body}
    >
      <h3 className="title">
        请选择类型
        <Icon type="wrong" />
      </h3>

      <div className="type-content">
        <div
          className={className('type-content-all', 'all')}
          onClick={() => choseType({ id: 'all' })}
        >
          全部类型
        </div>
        <div className="type-content-title">支出</div>
        <div className="type-content-list">
          {expense.map((item) => (
            <p
              className={className('type-content-list-item', item.id)}
              onClick={() => choseType(item)}
              key={item.id}
            >
              {item.name}
            </p>
          ))}
        </div>
        <div className="type-content-title">收入</div>
        <div className="type-content-list">
          {income.map((item) => (
            <p
              className={className('type-content-list-item', item.id)}
              onClick={() => choseType(item)}
              key={item.id}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>
    </Popup>
  )
})

PopupType.propTypes = {
  onSelect: PropTypes.func,
}

export default PopupType
