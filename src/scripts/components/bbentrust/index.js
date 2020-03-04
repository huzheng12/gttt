import React, { Component } from 'react'
import { Select, Table,Spin } from 'antd';
// import { Table, Modal, Spin, Select } from 'antd';
import { connect } from "react-redux";
import './index.scss'
import { Xfn } from '../../../utils/axiosfn';
import { FormattedMessage } from 'react-intl';
import { NavLink } from "react-router-dom"

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
      bbasset: 'USDT',
      bbsymbol: 'BTC/USDT',
      bbsymbolArrs:[],
      isOk:true,
      isOksymbol:true,
      imgArr: {
        ioo: require("../../img/nothing_data.png"),
      },
    }
  }
  componentDidMount() {
    console.log('111')
    this.history_data(this.props.type !== '1' ?'bborderquery':"bborderquery_history",{
      bbasset:this.state.bbasset,
      bbsymbol:this.state.bbsymbol
    })
    this.setState({
      columns3: [
        {
          title: '交易对',
          dataIndex: 'symbol',
          render: (text, record) => <div className="zititr" style={{ width: 80, wordWrap: "break-word" }}>

          </div>,
        },
        {
          title: '委托时间',
          dataIndex: 'ctime',
          render: (text, record) => <div className="zititr" style={{ width: 80, wordWrap: "break-word" }}>

          </div>,
        },
        {
          title: '方向',
          dataIndex: 'bid_flag',
          render: (text, record) => <div className="zititr" style={{ width: 80, wordWrap: "break-word" }}>

          </div>,
        },
        {
          title: '成交比例',
          dataIndex: 'trade_ratio',
          render: (text, record) => <div className="zititr" style={{ width: 80, wordWrap: "break-word" }}>

          </div>,
        },
        {
          title: '已成交量｜委托总量',
          dataIndex: 'filled_qty',
          render: (text, record) => <div className="zititr" style={{ width: 80, wordWrap: "break-word" }}>

          </div>,
        },
        {
          title: '成交均价｜委托价',
          dataIndex: 'price',
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
          this.history_data(this.props.type !== '1' ?'bborderquery':"bborderquery_history",{
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
    this.history_data(this.props.type !== '1' ?'bborderquery':"bborderquery_history",{
      bbasset:this.state.bbasset,
      bbsymbol:value
    })
    this.setState({
      bbsymbol:value
    })
  }
  history_data = (url,data) => {

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
  dangqianchipang = (a) => {
    if (localStorage.userInfo) {
      if (a === null) {
        return <Spin style={{ width: '100%', textAlign: "center", lineHeight: "500px" }} />
      } else {
        if (a.length <= 0) {
          return <div className="tablemeishuju">
            <img src={this.state.imgArr.ioo} alt="" />
            <div>
              < FormattedMessage id="You_dont_have_data" defaultMessage={'您暂时还没有相关数据'} />

            </div>
          </div>
        }
      }
    } else {
      return <div className="tablemeishuju">
        <img src={this.state.imgArr.ioo} alt="" />
        <div>
          < FormattedMessage id="You_must" defaultMessage={'您必须'} />
          <NavLink style={{ margin: "0 5px" }} to="/login">< FormattedMessage id="Sign_in" defaultMessage={'登录'} /></NavLink>
          < FormattedMessage id="Only_then_see_information" defaultMessage={'才可以看到此信息'} />
        </div>
      </div>
    }
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
          columns={columns3}
          dataSource={data3} />
              {
          this.dangqianchipang(data3)
        }
      </div>
    )
  }
}


export default Bbentrust