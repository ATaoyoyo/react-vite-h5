import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
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
      .filter(({ pay_type }) => pay_type === 2)
      .reduce((cur, item) => {
        cur += Number(item.amount)
        return cur
      }, 0)

    const _expense = bill.bills
      .filter(({ pay_type }) => pay_type === 1)
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
        <span className="bill-item-header-date">2021-08-16</span>
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
              <span className={item.type_id === 1 ? 'expense' : 'income'}>
                {`${item.type_id === 1 ? '-' : '+'}`}
                {item.amount}
              </span>
            }
            help={
              <div>
                {dayjs(Number(item.date)).format('HH:mm')}
                {item.remark ? `| ${item.remark}` : ''}
              </div>
            }
          />
        ))}

      {/*<div className="bill-item-pane">*/}
      {/*  <div className="bill-item-pane-type">*/}
      {/*    <span className="bill-item-pane-type-name">*/}
      {/*      <CustomIcon type="canyin" />*/}
      {/*      <span>奖金</span>*/}
      {/*    </span>*/}
      {/*    <span className="bill-item-pane-type-money">*/}
      {/*      <CustomIcon />*/}
      {/*      <span>+5800.00</span>*/}
      {/*    </span>*/}
      {/*  </div>*/}
      {/*  <p className="bill-item-pane-time">22:00</p>*/}
      {/*</div>*/}
    </div>
  )
}

BillItem.propTypes = {
  bill: PropTypes.object,
}

export default BillItem
