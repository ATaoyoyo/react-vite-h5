import React, { useEffect, useState } from 'react'
import { Icon, Pull } from 'zarm'
import dayjs from 'dayjs'

import BillItem from '/@/components/BillItem'
import { get, REFRESH_STATE, LOAD_STATE } from '/@/utils'
import './style.less'

const Home = () => {
  const [list, setList] = useState([]) // 账单列表
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')) // 当前时间
  const [page, setPage] = useState(1) //分页
  const [totalPage, setTotalPage] = useState() // 分页总数
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal) // 下拉刷新状态
  const [loading, setLoading] = useState(LOAD_STATE.normal) // 上拉刷新状态

  useEffect(() => {
    getBillList()
  }, [page])

  // 请求账单列表
  const getBillList = async () => {
    try {
      const api = `/bill/list?page=${page}&page_size=5&date=${currentTime}`
      const { data } = await get(api)

      page !== 1 ? setList(list.concat(data.list)) : setList(data.list)
      setTotalPage(data.totalPage)
      // 上滑加载状态
      setRefreshing(REFRESH_STATE.success)
      setLoading(LOAD_STATE.success)
    } catch (e) {
      console.log(e)
    }
  }

  // 分页处理
  const refreshData = () => {
    setRefreshing(REFRESH_STATE.loading)
    page !== 1 ? setPage(1) : getBillList()
  }

  const loadData = () => {
    if (page < totalPage) {
      setLoading(LOAD_STATE.loading)
      setPage(page + 1)
    }
  }

  return (
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
        {list.length ? (
          <Pull
            animationDuration={200}
            stayTime={400}
            refresh={{ state: refreshing, handle: refreshData }}
            load={{ state: loading, handle: loadData, distance: 200 }}
          >
            {list.map((item) => (
              <BillItem bill={item} key={item.date} />
            ))}
          </Pull>
        ) : null}
      </div>
    </div>
  )
}

export default Home
