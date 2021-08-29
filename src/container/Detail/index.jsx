import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import classNames from 'classnames'
import dayjs from 'dayjs'
import qs from 'query-string'

import Header from '/@/components/Header'
import CustomIcon from '/@/components/CustomIcon'
import { get, post, typeMap } from '/@/utils'

import './style.less'
import { Modal, Toast } from 'zarm'
import PopupAddBill from '../../components/PopupAddBill';

const Detail = () => {
  const location = useLocation()
  const history = useHistory()
  const billRef = useRef()
  const { id } = qs.parse(location.search)

  const [detail, setDetail] = useState({})

  useEffect(() => {
    getDetail()
  }, [])
  // 获取详情
  const getDetail = async () => {
    const { data } = await get('/bill/detail?id=' + id)
    setDetail(data)
  }

  // 删除
  const deleteBill = async () => {
    const { code, message } = await post('/bill/delete', { id })
    code === 200 ? Toast.show('删除成功') : Toast.show(message)
    history.goBack()
  }

  // 编辑
  const editBill = async () => {}

  // 删除点击
  const handDelete = () => {
    Modal.confirm({
      title: '删除',
      content: '确定删除该账单？',
      onOk: () => deleteBill(),
    })
  }

  // 编辑点击
  const handEdit = () => {
    billRef && billRef.current.show()
  }

  return (
    <div className="detail">
      <Header title="账单详情" />
      <div className="detail__card">
        <div className="detail__card__type">
          <span
            className={classNames({
              expense: detail.pay_type === '1',
              income: detail.pay_type === '2',
            })}
          >
            <CustomIcon
              className="icon"
              type={detail.type_id ? typeMap[detail.type_id].icon : 1}
            />
          </span>
          <span className="name">{detail.type_name || ''}</span>
        </div>

        <p className="detail__card__money">
          <span
            className={classNames({
              expense: detail.pay_type === '1',
              income: detail.pay_type === '2',
            })}
          >
            {detail.pay_type === '1' ? '-' : '+'}
            {detail.amount}
          </span>
        </p>

        <div className="detail__card__info">
          <p className="date">
            <span className="label">记录时间</span>
            <span className="value">
              {dayjs(detail.date).format('YYYY-MM-DD HH:mm')}
            </span>
          </p>
          <p className="remark">
            <span className="label">备注</span>
            <span className="value">{detail.remark || '什么都没写哦～'}</span>
          </p>
        </div>

        <div className="detail__card__opt">
          <span onClick={handDelete}>
            <CustomIcon type="shanchu" />
            删除
          </span>
          <span onClick={handEdit}>
            <CustomIcon type="tianjia" />
            编辑
          </span>
        </div>
      </div>

      <PopupAddBill ref={billRef} detail={detail} onReload={getDetail} />
    </div>
  )
}

export default Detail
