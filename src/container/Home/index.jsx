import React, { useEffect, useRef, useState } from 'react'
import { Icon, Pull } from 'zarm'
import dayjs from 'dayjs'

import BillItem from '/@/components/BillItem'
import PopupType from '/@/components/PopupType'
import PopupDate from '/@/components/PopupDate'
import { get, REFRESH_STATE, LOAD_STATE } from '/@/utils'
import './style.less'

const Home = () => {
  const typeRef = useRef()
  const monthRef = useRef()
  const [list, setList] = useState([]) // 账单列表
  const [totalExpense, setTotalExpense] = useState(0) // 总支出
  const [totalIncome, setTotalIncome] = useState(0) // 总收入
  const [currentSelect, setCurrentSelect] = useState({}) // 当前筛选类型
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')) // 当前时间
  const [page, setPage] = useState(1) //分页
  const [totalPage, setTotalPage] = useState() // 分页总数
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal) // 下拉刷新状态
  const [loading, setLoading] = useState(LOAD_STATE.normal) // 上拉刷新状态

  useEffect(() => {
    getBillList()
  }, [page, currentSelect, currentTime])

  // 请求账单列表
  const getBillList = async () => {
    try {
      const api = `/bill/list?page=${page}&page_size=5&date=${currentTime}`
      const { data } = await get(api)

      page !== 1 ? setList(list.concat(data.list)) : setList(data.list)
      setTotalPage(data.totalPage)
      setTotalExpense(data.totalExpense)
      setTotalIncome(data.totalIncome)
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

  const select = (item) => {
    setRefreshing(REFRESH_STATE.loading)
    // 触发刷新列表，将分页重制为 1
    setPage(1)
    setCurrentSelect(item)
  }

  const selectMonth = (item) => {
    setRefreshing(REFRESH_STATE.loading)
    setPage(1)
    setCurrentTime(item)
  }

  const toggle = () => {
    typeRef.current && typeRef.current.show()
  }

  // 选择月份弹窗
  const monthToggle = () => {
    monthRef.current && monthRef.current.show()
  }

  return (
    <div className="home">
      <div className="home-header">
        <div className="home-header-data-wrap">
          <span className="home-header-data-wrap-expense">
            总支出： <b>¥ {totalExpense}</b>
          </span>
          <span className="home-header-data-wrap-income">
            总收入： <b>¥ {totalIncome}</b>
          </span>
        </div>

        <div className="home-header-type-wrap">
          <div className="home-header-type-wrap-type">
            <span className="label" onClick={toggle}>
              <span>{currentSelect.name || '全部类型'}</span>
              <Icon type="arrow-bottom" />
            </span>
          </div>
          <div className="home-header-type-wrap-time">
            <span className="time" onClick={monthToggle}>
              <span>{currentTime}</span>
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
            refresh={{ state: refreshing, handler: refreshData }}
            load={{ state: loading, handler: loadData, distance: 200 }}
          >
            {list.map((item) => (
              <BillItem bill={item} key={item.date} />
            ))}
          </Pull>
        ) : null}
      </div>
      <PopupType ref={typeRef} onSelect={select} />
      <PopupDate ref={monthRef} mode="month" onSelect={selectMonth} />
    </div>
  )
}

export default Home
