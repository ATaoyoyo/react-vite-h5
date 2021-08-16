import React, { useState } from 'react'
import { Icon } from 'zarm'

import BillItem from '/@/components/BillItem'

import './style.less'

const Home = () => {
  const bills = [
    {
      bills: [
        {
          amount: '25.00',
          date: '1623390740000',
          id: 911,
          pay_type: 1,
          remark: '',
          type_id: 1,
          type_name: '餐饮',
        },
      ],
      date: '2021-06-11',
    },
  ]
  const [list, setList] = useState(bills)

  return (
    <div>
      <div className="home">
        <div className="home-header">
          <div className="home-header-data-wrap">
            <span className="home-header-data-wrap-expense">
              总支出： <b>¥ 200.00</b>
            </span>
            <span className="home-header-data-wrap-income">
              总收入： <b>¥ 200.00</b>
            </span>
          </div>

          <div className="home-header-type-wrap">
            <div className="home-header-type-wrap-type">
              <span className="label">
                <span>全部类型</span>
                <Icon type="arrow-bottom" />
              </span>
            </div>
            <div className="home-header-type-wrap-time">
              <span className="time">
                <span>2020-06</span>
                <Icon type="arrow-bottom" />
              </span>
            </div>
          </div>
        </div>

        <div className="home-content">
          {list.map((item) => (
            <BillItem bill={item} key={item.date} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
