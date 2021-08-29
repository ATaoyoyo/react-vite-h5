import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import dayjs from 'dayjs'

import { Cell } from 'zarm'
import { useHistory } from 'react-router-dom'

import { typeMap } from '/@/utils'
import CustomIcon from '../CustomIcon'

import './style.less'

const BillItem = ({ bill }) => {
  const history = useHistory()
  const [income, setIncome] = useState(0) // 收入
  const [expense, setExpense] = useState(0) // 支出

  useEffect(() => {
    const _income = bill.bills
      .filter(({ pay_type }) => pay_type === '2')
      .reduce((cur, item) => {
        cur += Number(item.amount)
        return cur
      }, 0)

    const _expense = bill.bills
      .filter(({ pay_type }) => pay_type === '1')
      .reduce((cur, item) => {
        cur += Number(item.amount)
        return cur
      }, 0)

    setIncome(_income)
    setExpense(_expense)
  }, [bill.bills])

  // 前往账单详情
  const handToDetail = (item) => {
    history.push(`/detail?id=${item.id}`)
  }

  return (
    <div className="bill-item">
      <div className="bill-item-header">
        <span className="bill-item-header-date">{bill.date}</span>
        <div className="bill-item-header-bills">
          <p className="bill-item-header-bills-expense">
            <img src="//s.yezgea02.com/1615953405599/zhi%402x.png" alt="支" />
            <span className="value">¥ {expense.toFixed(2)}</span>
          </p>
          <p className="bill-item-header-bills-income">
            <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
            <span className="value">¥ {income.toFixed(2)}</span>
          </p>
        </div>
      </div>

      {bill &&
        bill.bills.map((item) => (
          <Cell
            key={item.id}
            onClick={() => handToDetail(item)}
            title={
              <>
                <CustomIcon
                  type={item.type_id ? typeMap[item.type_id].icon : 1}
                />
                <span>{item.type_name}</span>
              </>
            }
            description={
              <span className={item.pay_type === '1' ? 'expense' : 'income'}>
                {`${item.pay_type === '1' ? '-' : '+'}`}
                {item.amount}
              </span>
            }
            help={
              <div>
                {dayjs(item.date).format('HH:mm')}
                {item.remark ? ` | ${item.remark}` : ''}
              </div>
            }
          />
        ))}
    </div>
  )
}

BillItem.propTypes = {
  bill: PropTypes.object,
}

export default BillItem
