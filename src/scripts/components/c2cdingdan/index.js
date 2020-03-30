import React, { Component } from 'react'
import { Table } from 'antd';
import { Xfn } from '../../../utils/axiosfn';
import { timehuansuan } from '../../../utils/time';
import { dataempty } from '../../../utils/dataempty';
export default class C2cdingdan extends Component {
  constructor() {
    super()
    this.state = {
      columns: [
        {
          title: '订单编号',
          dataIndex: 'id',
          width: 188,
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {text}
          </div>,
        },
        {
          title: '类型',
          dataIndex: 'type',
          width: 128,
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word", color: text === "1" ? "#26994E" : "#E53F39" }}>
            {
              text === "1" ? "买入" : "卖出"
            }
          </div>,
        },
        {
          title: '单价(CNY)',
          dataIndex: 'price',
          width: 128,
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {text}
          </div>,
        },
        {
          title: '数量',
          dataIndex: 'volume',
          width: 128,
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {text}
          </div>,
        },
        {
          title: '总额',
          dataIndex: 'amount',
          width: 128,
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {text}
          </div>,
        },
        {
          title: '状态',
          width: 128,
          dataIndex: 'status',
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {text === "0" ? "审核中" : text === '1' ? "已支付" : "已取消"}
          </div>,
        },
        {
          title: '建立时间',
          dataIndex: 'ctime',
          align: "right",
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {timehuansuan(text).date}
            &ensp;
            {timehuansuan(text).dates}
          </div>,
        },
      ],
      asset: "USDT",
      order: [],
      order_box: null,
      isOklength: true,
      current_page: 0
    }
  }
  componentDidMount() {
    this.orderQueryFn({
      next_page: '1',
    })

  }
  // 获取当前用户的订单
  orderQueryFn = (data, type) => {
    if (this.state.isOklength) {
      this.setState({
        isOklength: false
      })
    } else {
      return false
    }
    const {
      asset, order
    } = this.state
    let obj = {
      asset: asset,
      status: this.props.type,
      next_page: data.next_page,
      page_size: "10"
    }
    if (type === '-1') {
      obj.last_pid = order[0].id
    }
    if (type === '1') {
      obj.last_pid = order[order.length - 1].id
    }
    Xfn({
      _u: "c2corder_query",
      _m: "get",
      _p: obj
    }, (res, code) => {
      if (code === 0) {
        var arr = res.data.data.rows
        for (var i in arr) {
          arr[i].key = arr[i] + i + this.state.current_page
        }
        if (type === '1') {
          if (this.state.order !== null) {
            arr = this.state.order.concat(arr);
          }
        }
        this.setState({
          isOklength: true,
          order_box: res.data.data.total,
          current_page: this.state.current_page + 1
        })
        if (res.data.data.rows.length === 0) { return false }
        this.setState({
          order: arr,
        })
      }
    })
  }

  screen = (type) => {

  }
  render() {
    const {
      columns, order, order_box, current_page
    } = this.state
    return (
      <div className="c2c_table_warp">
        <Table columns={columns} pagination={false} dataSource={order} />
        {
          dataempty(order, order_box)
        }
        {/* {
          order_box * 1 > 10 ? <div className="nage_pase_box">
            <div className="nage_pase_bix" onClick={() => this.orderQueryFn({
              next_page: '-1',
            }, '-1')}>{'< 上一页'}</div>
            <div className="nage_pase_bix" onClick={() => this. orderQueryFn({
              next_page: '1',
            }, '1')}>{'下一页 >'}</div>
          </div> : ''
        } */}
        {
          order_box * 1 > 20 && Math.ceil(order_box / 20) !== current_page ? <div className="view_more"
            onClick={() => this.orderQueryFn({
              next_page: '1',
            }, '1')}>
            查看更多
          </div> : ""
        }
      </div>
    )
  }
}
