import React, { forwardRef, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { Icon, Input, Keyboard, Popup, Toast } from 'zarm'

import CustomIcon from '/@/components/CustomIcon'
import PopupDate from '/@/components/PopupDate'
import { get, typeMap } from '/@/utils/index'
import './style.less'
import { post } from '../../utils'

const PopupAddBill = forwardRef((props, ref) => {
  const { detail, onReload } = props
  const dateRef = useRef()
  const [payType, setPayType] = useState('expense')
  const [show, setShow] = useState(false)
  const [date, setDate] = useState(new Date())
  const [money, setMoney] = useState('')
  const [expenseType, setExpenseType] = useState([])
  const [incomeType, setIncomeType] = useState([])
  const [billType, setBillType] = useState({})
  const [remark, setRemark] = useState('')

  if (ref) {
    ref.current = {
      show: () => setShow(true),
      close: () => setShow(false),
    }
  }

  useEffect(() => {
    init()
    getData()
  }, [detail])

  const init = () => {
    if (!detail || !detail.id) return
    setPayType(detail.pay_type === '1' ? 'expense' : 'income')
    setBillType({ id: detail.id, name: detail.type_name })
    setRemark(detail.remark)
    setMoney(detail.amount)
    setDate(dayjs(detail.date).format('MM-DD'))
  }

  const getData = async () => {
    const { data } = await get('/type/list')
    const expense = data.filter((item) => item.type === '1')
    const income = data.filter((item) => item.type === '2')
    setExpenseType(expense)
    setIncomeType(income)
    setBillType(expense[0])
  }

  const addBill = async () => {
    if (!money) return Toast.show('请输入具体的金额')
    const params = {
      id: detail.id || null,
      amount: Number(money).toFixed(2),
      type_id: Number(billType.type),
      type_name: billType.name,
      pay_type: payType === 'income' ? '2' : '1',
      date: dayjs(date).format('YYYY-MM-DD HH:mm'), // 日期转时间戳
      remark: remark || '',
    }

    const api = detail.id ? '/bill/update' : '/bill/add'

    const { message, code } = await post(api, params)
    if (code === 200) {
      Toast.show(message)
    }

    if (onReload) onReload()
  }

  const reset = () => {
    setMoney('')
    setBillType(expenseType[0])
    setPayType('expense')
    setRemark('')
    setShow(false)
    setDate(new Date())
  }

  // 金额输入
  const handKeyClick = (key) => {
    if (key === 'delete') {
      const val = money.slice(0, money.length - 1)
      setMoney(val)
      return
    }

    if (key === 'ok') {
      addBill()
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

  // 日期选择
  const handSelectDate = (date) => {
    setDate(date)
  }

  // 支付类型切换
  const handChangeType = (type) => {
    setPayType(type)
    type === 'expense'
      ? setBillType(expenseType[0])
      : setBillType(incomeType[0])
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
              onClick={() => handChangeType('expense')}
              className={classNames('expense', {
                active: payType === 'expense',
              })}
            >
              支出
            </span>
            <span
              onClick={() => handChangeType('income')}
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

        {/*金额*/}
        <div className="popup-add-bill__wrapper__money">
          <span className="icon">¥</span>
          <span className="num">{money}</span>
        </div>

        {/*账单类型*/}
        <div className="popup-add-bill__wrapper__bill-types">
          <ul className="list">
            {(payType === 'expense' ? expenseType : incomeType).map((item) => {
              return (
                <li
                  className={classNames('list-item', {
                    income: payType === 'income',
                    expense: payType === 'expense',
                  })}
                  key={item.id}
                  onClick={() => setBillType(item)}
                >
                  <div
                    className={classNames('icon', {
                      active: billType.id === item.id,
                    })}
                  >
                    <CustomIcon type={typeMap[item.id].icon} />
                  </div>
                  <span className="text">{item.name}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/*备注*/}
      <div className="popup-add-bill__wrapper__remark">
        <Input
          className="remark-input"
          type="text"
          showLength
          rows={2}
          value={remark}
          maxLength={50}
          placeholder="请输入备注..."
          onChange={setRemark}
        />
      </div>

      {/*数字键盘*/}
      <div className="popup-add-bill__wrapper__keyboard">
        <Keyboard type="price" onKeyClick={(key) => handKeyClick(key)} />
      </div>
    </Popup>
  )
})

export default PopupAddBill
