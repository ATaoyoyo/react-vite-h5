import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { Icon, Progress } from 'zarm'

import PopupDate from '/@/components/PopupDate'
import CustomIcon from '/@/components/CustomIcon'

import { get, typeMap } from '../../utils'

import './style.less'

let chart = null // 图表实例

const Data = () => {
  const dateRef = useRef()

  const [payType, setPayType] = useState('expense')
  const [month, setMonth] = useState(dayjs().format('YYYY-MM'))
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)
  const [expense, setExpense] = useState([])
  const [income, setIncome] = useState([])

  useEffect(() => {
    getData()

    return () => chart.dispose()
  }, [month])

  const getData = async () => {
    try {
      const { data } = await get('/bill/data?date=' + month)
      const { totalData, totalExpense, totalIncome } = data
      const expenseData = totalData
        .filter((item) => item.pay_type === '1')
        .sort((a, b) => b.number - a.number)
      const incomeData = totalData
        .filter((item) => item.pay_type === '2')
        .sort((a, b) => b.number - a.number)
      setTotalExpense(totalExpense)
      setTotalIncome(totalIncome)
      setExpense(expenseData)
      setIncome(incomeData)
      initChart(payType === 'expense' ? expenseData : incomeData)
    } catch (e) {
      console.log(e)
    }
  }

  const initChart = (data) => {
    if (!window.echarts) return
    chart = echarts.init(document.getElementById('chart'))
    chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        data: data.map((item) => item.type_name),
      },
      series: [
        {
          name: '支出',
          type: 'pie',
          radius: '55%',
          data: data.map((item) => {
            return {
              value: item.number,
              name: item.type_name,
            }
          }),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    })
  }

  // 日期选择
  const handSelectMonth = (item) => {
    setMonth(item)
  }

  // 收支切换
  const handChangeType = (type) => {
    setPayType(type)
    initChart(type === 'expense' ? expense : income)
  }

  return (
    <div className="data">
      <div className="data__total-expense">
        <div className="date" onClick={() => dateRef && dateRef.current.show()}>
          <span>{month}</span>
          <span className="line"> | </span>
          <Icon type="date" />
        </div>
        <p className="text">共支出</p>
        <p className="amount">¥{totalExpense}</p>
        <p className="income">共收入¥{totalIncome}</p>
      </div>

      <div className="data__amount-detail">
        <div className="data__amount-detail__header">
          <span className="text">收支构成</span>
          <div className="opt">
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
              className={classNames('income', {
                active: payType === 'income',
              })}
            >
              收入
            </span>
          </div>
        </div>

        <div className="data__amount-detail__content">
          <ul>
            {(payType === 'expense' ? expense : income).map((item, index) => {
              return (
                <li key={index}>
                  <span
                    className={classNames('icon', {
                      expense: payType === 'expense',
                      income: payType === 'income',
                    })}
                  >
                    <CustomIcon
                      type={item.type_id ? typeMap[item.type_id].icon : 1}
                    />
                  </span>
                  <span className="name">{item.type_name}</span>
                  <span className="amount">¥{item.number}</span>
                  <div className="progress">
                    <Progress
                      shape="line"
                      theme="primary"
                      percent={Number(
                        (
                          (item.number /
                            Number(
                              payType === 'expense' ? totalExpense : totalIncome
                            )) *
                          100
                        ).toFixed(2)
                      )}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div id="chart" />

      <PopupDate ref={dateRef} mode="month" onSelect={handSelectMonth} />
    </div>
  )
}

export default Data
