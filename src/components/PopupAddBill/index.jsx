import React, { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Icon, Popup } from 'zarm'

import CustomIcon from '/@/components/CustomIcon'
import './style.less'

const PopupAddBill = forwardRef((props, ref) => {
  const [payType, setPayType] = useState('expense')
  const [show, setShow] = useState(true)
  const [money, setMoney] = useState()
  const [expenseType, setExpenseType] = useState('canyin')
  const [incomeType, setIncomeType] = useState('gongzi')

  if (ref) {
    ref.current = {
      show: () => setShow(true),
      close: () => setShow(false),
    }
  }

  return (
    <Popup
      className="popup-add-bill"
      visible={show}
      direction="bottom"
      onMaskClick={() => setShow(false)}
      mountContainer={() => document.body}
    >
      <div className="popup-add-bill__wrapper">
        <div className="popup-add-bill__wrapper__close">
          <Icon type="wrong" />
        </div>

        <div className="popup-add-bill__wrapper__pay-type">
          <div className="popup-add-bill__wrapper__pay-types">
            <span
              onClick={() => setPayType('expense')}
              className={classNames('expense', {
                active: payType === 'expense',
              })}
            >
              支出
            </span>
            <span
              onClick={() => setPayType('income')}
              className={classNames('income', { active: payType === 'income' })}
            >
              收入
            </span>
          </div>
          <div className="popup-add-bill__wrapper__date">
            <span>08-26</span> <Icon className="icon" type="arrow-bottom" />
          </div>
        </div>

        <div className="popup-add-bill__wrapper__money">
          <span className="icon">¥</span>
          <span className="num">7182938</span>
        </div>

        <div className="popup-add-bill__wrapper__bill-types">
          <ul className="list">
            <li className="list-item">
              <div className="icon">
                <CustomIcon type="canyin" />
              </div>
              <span className="text">餐饮</span>
            </li>
          </ul>
        </div>
      </div>
    </Popup>
  )
})

export default PopupAddBill
