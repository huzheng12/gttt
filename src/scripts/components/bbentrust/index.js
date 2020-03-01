import React, { Component } from 'react'
import { Select, Table } from 'antd';
// import { Table, Modal, Spin, Select } from 'antd';
import { connect } from "react-redux";
import './index.scss'
import { Xfn } from '../../../utils/axiosfn';
const { Option } = Select;






@connect(
  state => {
    return {
      bbassetArr: state.bbdata.bbassetArr,
      bbasset: state.bbdata.bbasset,
      bbsymbolArr: state.bbdata.bbsymbolArr,
      bb_switch_ok: state.bbdata.bb_switch_ok,
    }
  }
)

class Bbentrust extends Component {
  constructor() {
    super()
    this.state = {
      data3: [],
      columns3: [],
      bbasset: '',
      bbsymbol: '',
      bbsymbolArrs:[],
      isOk:true,
      isOksymbol:true,
    }
  }
  componentDidMount() {
    this.setState({
      columns3: [
        {
          title: '交易对',
          dataIndex: 'ctime1',
          render: (text, record) => <div className="zititr" style={{ width: 80, wordWrap: "break-word" }}>

          </div>,
        },
        {
          title: '委托时间',
          dataIndex: 'ctime2',
          render: (text, record) => <div className="zititr" style={{ width: 80, wordWrap: "break-word" }}>

          </div>,
        },
        {
          title: '方向',
          dataIndex: 'ctime3',
          render: (text, record) => <div className="zititr" style={{ width: 80, wordWrap: "break-word" }}>

          </div>,
        },
        {
          title: '成交比例',
          dataIndex: 'ctime4',
          render: (text, record) => <div className="zititr" style={{ width: 80, wordWrap: "break-word" }}>

          </div>,
        },
        {
          title: '已成交量｜委托总量',
          dataIndex: 'ctime5',
          render: (text, record) => <div className="zititr" style={{ width: 80, wordWrap: "break-word" }}>

          </div>,
        },
        {
          title: '成交均价｜委托价',
          dataIndex: 'ctime6',
          render: (text, record) => <div className="zititr" style={{ width: 80, wordWrap: "break-word" }}>

          </div>,
        },
        {
          title: this.props.type === '1' ? '手续费' : '操作',
          dataIndex: 'ctime7',
          render: (text, record) => <div className="zititr" style={{ width: 80, wordWrap: "break-word" }}>

          </div>,
        },
      ], 
      
    })
  }
  componentDidUpdate(){
    if(this.props.bbassetArr.length>0&&this.state.isOk){
      Xfn({
        _u: "bbsymbolquery",
        _m: "get",
        _p: {
          asset: this.props.bbassetArr[0].asset
        }
      }, (res, code) => {
        if (code === 0) {
          this.setState({
            bbsymbolArrs:res.data.data.rows,
            bbsymbol:res.data.data.rows.length>0&&res.data.data.rows[0].symbol
          })
        }
      })
      this.setState({
        bbasset: this.props.bbassetArr[0].asset,
        isOk:false
      })
    }


  }
  handleChange = (value) => {
    Xfn({
      _u: "bbsymbolquery",
      _m: "get",
      _p: {
        asset: value
      }
    }, (res, code) => {
      if (code === 0) {
        if(res.data.data.rows.length>0){
          this.history_data('bborderquery',{
            bbasset:value,
            bbsymbol:res.data.data.rows[0].symbol
          })
        }
        this.setState({
          bbsymbolArrs:res.data.data.rows,
          bbsymbol:res.data.data.rows.length>0&&res.data.data.rows[0].symbol
        })
      }
    })
    this.setState({
      bbasset:value
    })
  }
  handleChanges=(value)=>{
    this.history_data('bborderquery',{
      bbasset:this.state.bbasset,
      bbsymbol:value
    })
    this.setState({
      bbsymbol:value
    })
  }
  history_data = (url,data) => {
    // bborderquery
    // bborderquery_history
    console.log(url)
    Xfn({
      _u: url,
      _m: 'get',
      _p: {
        asset: data.bbasset,// 资产 USD,必填,
        symbol: data.bbsymbol, //交易对,非必填,
        // bid_flag: '1', //1.买入,0.卖出,非必填,
        last_order_id: data.last_order_id?data.last_order_id:'', //当前页最后一张委托的id, 非必填,
        next_page: "1", //翻页标记,-1 上一页 , 1.下一页 必填,,
        page_size: "20", //页行数 ,必填
      }
    }, (res, code) => {
      if (code === 0) {
        this.setState({
          data3: res.data.data.rows?res.data.data.rows:[]
        })
      }
    })
  }
  render() {
    const {
      data3, columns3, bbasset,bbsymbol,bbsymbolArrs
    } = this.state
    const {
      bbassetArr
    } = this.props
    return (
      <div className="bbentrust_warp">
        <div className="title_nav">
          <div className="one_box">
            <span className="sanpanbox">
              类别
            </span>
            <Select value={bbasset} style={{ width: 110 }} onChange={this.handleChange}>
              {
                bbassetArr.map((item, index) => {
                  return <Option key={item + index} value={item.asset}>{item.asset}</Option>
                })
              }

            </Select>
          </div>
          <div className="two_box">
            <span className="sanpanbox">
              交易对
            </span>
            <Select value={bbsymbol} style={{ width: 110 }} onChange={this.handleChanges}>
              {
               bbsymbolArrs&&bbsymbolArrs.map((item,index)=>{
                  return  <Option key={item + index} value={item.symbol}>{item.symbol}</Option>
                })
              }
            </Select>
          </div>
        </div>
        <Table pagination={false}
          // showHeader={data3 && data3.length > 0 ? true : false}
          columns={columns3}
          dataSource={data3} />
      </div>
    )
  }
}


export default Bbentrust