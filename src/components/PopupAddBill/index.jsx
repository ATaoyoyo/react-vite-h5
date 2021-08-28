import React, { forwardRef, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { Icon, Input, Keyboard, Popup } from 'zarm'

import CustomIcon from '/@/components/CustomIcon'
import PopupDate from '/@/components/PopupDate'
import './style.less'

const PopupAddBill = forwardRef((props, ref) => {
  const dateRef = useRef()
  const [payType, setPayType] = useState('expense')
  const [show, setShow] = useState(true)
  const [date, setDate] = useState(new Date())
  const [money, setMoney] = useState('')
  const [expenseType, setExpenseType] = useState('canyin')
  const [incomeType, setIncomeType] = useState('gongzi')

  if (ref) {
    ref.current = {
      show: () => setShow(true),
      close: () => setShow(false),
    }
  }

  const handKeyClick = (key) => {
    console.log(key)

    if (key === 'delete') {
      const val = money.slice(0, money.length - 1)
      setMoney(val)
      return
    }

    if (key === 'ok') {
      return
    }


    const state =
      key !== '.' &&
      money.includes('.') &&
      money &&
      money.split('.')[1].length >= 2
    // 当输入的值为 '.' 且 已经存在 '.'，则不让其继续字符串相加。
    if (key === '.' && money.includes('.')) return
    // 小数点后保留两位，当超过两位时，不让其字符串继续相加。
    if (state) return
    const val = money + key
    setMoney(val)
  }

  const handSelectDate = (date) => {
    console.log(date)
    setDate(date)
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
        <div
          className="popup-add-bill__wrapper__close"
          onClick={() => setShow(false)}
        >
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
          <div
            className="popup-add-bill__wrapper__date"
            onClick={() => dateRef.current && dateRef.current.show()}
          >
            <span>{dayjs(date).format('MM-DD')}</span>{' '}
            <Icon className="icon" type="arrow-bottom" />
          </div>

          <PopupDate ref={dateRef} onSelect={handSelectDate} />
        </div>

        <div className="popup-add-bill__wrapper__money">
          <span className="icon">¥</span>
          <span className="num">{money}</span>
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

      <div className="popup-add-bill__wrapper__remark">
        <Input
          className="remark-input"
          type="text"
          rows={4}
          placeholder="请输入备注"
        />
      </div>

      <div className="popup-add-bill__wrapper__keyboard">
        <Keyboard type="price" onKeyClick={(key) => handKeyClick(key)} />
      </div>
    </Popup>
  )
})

export default PopupAddBill
