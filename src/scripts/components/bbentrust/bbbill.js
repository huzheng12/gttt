import React, { Component } from 'react'
import { Select, Table, Spin,Radio,DatePicker } from 'antd';
// import { Table, Modal, Spin, Select } from 'antd';
import { connect } from "react-redux";
import './index.scss'
import { Xfn } from '../../../utils/axiosfn';
import { FormattedMessage } from 'react-intl';
import { NavLink } from "react-router-dom"
import { timehuansuan } from '../../../utils/time';
import moment from 'moment';
moment.locale('zh-cn');

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

@connect(
  state => {
    return {
      bbassetArr: state.bbdata.bbassetArr,
      bbasset: state.bbdata.bbasset,
      bbsymbolArr: state.bbdata.bbsymbolArr,
      bb_switch_ok: state.bbdata.bb_switch_ok,
      bbaymbol: state.bbdata.bbaymbol,
    }
  }
)

class Bbbill extends Component {
  constructor() {
    super()
    this.state = {
      data3: null,
      data3A: [],
      columns3: [],
      bbasset: 'BTC',
      bbsymbol: 'BTC/USDT',
      bbsymbolArrs: [],
      isOk: true,
      isOksymbol: true,
      imgArr: {
        ioo: require("../../img/nothing_data.png"),
        a1: require("../../img/treaty_up.png"),
        a2: require("../../img/treaty_down.png"),
      },
      isofk: true,
      danxuanriqi:'1',
      quanbu:true,
      quanbushujuzimu:"全部类型",
      trade_type:'0',
      bbassetArr:[],
      startValue:null,
      endValue:null,

    }
  }
  componentDidMount() {
    Xfn({
      _u:'bbbillcoin_history',
      _m:'get',
      _p:{

      }
    },(res,code)=>{
      if(code===0){
        this.setState({
          bbassetArr:res.data.data.rows,
          bbasset:res.data.data.rows[0].coin
        })
        this.history_data({
          bbasset: res.data.data.rows[0].coin,
        })
      }
    })
   
    this.setState({
      columns3: [
        {
          title: '交易对',
          dataIndex: 'symbol',
          render: (text, record) => <div className="zititr" style={{ width: 80, wordWrap: "break-word" }}>
            {
              text
            }
          </div>,
        },
        {
          title: '委托时间',
          dataIndex: 'ctime',
          render: (text, record) => <div className="zititr" style={{ width: 80, wordWrap: "break-word" }}>
            <p>
              {timehuansuan(text).date}
            </p>
            <p>
              {timehuansuan(text).dates}
            </p>
          </div>,
        },
        {
          title: '方向',
          dataIndex: 'bid_flag',
          render: (text, record) => <div className="zititr" style={{ color: text === '1' ? '#339F58' : '#E53F39', width: 80, wordWrap: "break-word" }}>
            {text === '1' ? "买入" : "卖出"}
          </div>,
        },
        {
          title: '成交比例',
          dataIndex: 'trade_ratio',
          render: (text, record) => <div className="zititr" style={{ width: 80, wordWrap: "break-word" }}>
            {
              String(text * 100).replace(/^(.*\..{2}).*$/, "$1") + '%'

            }
          </div>,
        },
        {
          title: '已成交量｜委托总量',
          dataIndex: 'filled_qty',
          render: (text, record) => <div className="zititr" style={{  wordWrap: "break-word" }}>
            {record.filled_qty + ' | ' + record.qty}
          </div>,
        },
        {
          title: '成交均价｜委托价',
          dataIndex: 'price',
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {record.avg_price + ' | ' + record.price}
          </div>,
        },
        {
          title: this.props.type === '1' ? '手续费' : '操作',
          dataIndex: 'fee',
          align:'right',
          render: (text, record) => <div className="zititr" style={{wordWrap: "break-word" }}>
            {this.props.type !== '1' ? <div className="spl2" onClick={() => this.Cancel_order(record)} style={{ color: "#2f6fed", cursor: 'pointer' }}>
              撤单
         </div> : <div>{text}</div>}
          </div>,
        },
      ],
      startValue: moment().add(-2, 'days'),
      endValue: moment()
    })
  }


  handleChange = (value) => {
    this.history_data({
      bbasset: value,
    })
    this.setState({
      bbasset: value,
      isofk:true
    })
  }
  handleChanges = (value) => {
    this.history_data({
      bbasset: this.state.bbasset,
    })
    this.setState({
      bbsymbol: value,
      isofk:true
    })
  }
  Cancel_order = (data) => {
    Xfn({
      _u: "bbordercancel",
      _m: "post",
      _p: {
        order_id: data.id,// 委托id,必填
        asset: data.asset,// 资产 USD,必填
        symbol: data.symbol,// 交易对,必填
        bid_flag: data.bid_flag,// 1.买入,0.卖出,必填
      }
    }, (res, code) => {
      this.history_data( {
        bbasset: this.state.bbasset,
      })
    },'撤单成功')
  }
  history_data = (data) => {
    // startValue:null,
    //   endValue:null,
    if (data.type !== 1) {
      this.setState({
        data3:null
      })
    }
    var timeend = null
    var timestart = null
    if (this.state.danxuanriqi == "2") {
      let endValue = this.state.endValue
      let startValue = this.state.startValue
      if (data && data.endValue) {
        endValue = data.end_date
      }
      if (data && data.startValue) {
        startValue = data.start_date
      }
      let t1 = timehuansuan(moment(endValue).valueOf()).objtime
      let t2 = timehuansuan(moment(startValue).valueOf()).objtime
      timeend = new Date(t1.n, t1.y, t1.r, 0, 0, 0, 0).getTime().toString()
      timestart = new Date(t2.n, t2.y, t2.r, 0, 0, 0, 0).getTime().toString()
    }
    Xfn({
      _u: 'bbbill_history',
      _m: 'get',
      _p: {
        asset: data.bbasset,// 资产 USD,必填,
        trade_type:data.trade_type?data.trade_type:this.state.trade_type,
        history_type:this.state.danxuanriqi,
        start_date:timestart,
        end_date:timeend,
        last_order_id: data.last_order_id ? data.last_order_id : '', //当前页最后一张委托的id, 非必填,
        next_page: "1", //翻页标记,-1 上一页 , 1.下一页 必填,,
        page_size: "20", //页行数 ,必填
      }
    }, (res, code) => {
      if (code === 0) {
        var arr = res.data.data.rows?res.data.data.rows:[]
        for (var i in arr) {
          arr[i].key = arr[i] + i+data.last_order_id
        }
        if (data.type === 1) {
          arr = this.state.data3.concat(arr);
          if (res.data.data.rows && res.data.data.rows.length === 0) {
            this.setState({
              isofk: false
            })
          } else {
            this.setState({
              data3: arr,
              data3A: res.data.data,
              isofk: true
            })
          }
        } else {
          this.setState({
            data3: res.data.data.rows ? res.data.data.rows : [],
            data3A: res.data.data
          })
        }

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


  riqi3=(date)=>{
    this.setState({ danxuanriqi: date.target.value })
    if (date.target.value == "1") {
      this.setState({
        startValue: moment().add(-2, 'days'),
        endValue: moment()
      })
    } else {
      this.setState({
        startValue: moment().subtract(3, 'months'),
        endValue: moment().add(-2, 'days')
      })
    }
    setTimeout(() => {
      this.history_data({
        bbasset:this.state.bbasset
      })
    }, 100)
   
  }

  dianjiquanbu = () => {
    if (this.state.quanbu) {
      this.setState({ quanbu: false })
      if (this.state.quanbu) {
        var that = this
        var para = document.createElement("div");
        para.id = "bud"
        var element = document.getElementById("root");
        element.appendChild(para);
        var bud = document.getElementById("bud");
        bud.onclick = () => {
          that.setState({
            quanbu: true
          })
          element.removeChild(bud);
        }
      }
    } else {
      var element = document.getElementById("root");
      var bud = document.getElementById("bud");
      this.setState({ quanbu: true })
      element.removeChild(bud);
    }
  }

  quanbuleixing=(type)=>{
    var qua
    switch (type) {
      case "0": qua ='全部类型'; break;
      case "1": qua = '买入'; break;
      case "2": qua = '卖出'; break;
      case "3": qua = '转出至资金账户'; break;
      case "4": qua = '转出至永续合约'; break;
      case "5": qua = '资金账户转入'; break;
      case "6": qua = '永续合约转入'; break;
      default:
        break;
    }
    this.setState({
      trade_type: type,
      quanbushujuzimu: qua,
    })
    this.history_data({
      trade_type: type,   bbasset:this.state.bbasset
     })
  }
  disabledDate = (current) => {
    return current && current > moment().endOf('day');
  }
  disabledDate1 = (current) => {
    return current && current > moment().endOf('day');
  }
  riqi1 = (value) => {
    this.onChange('startValue', value)
    this.history_data({
      start_date: value,   bbasset:this.state.bbasset
    })
  }

  riqi2 = (value) => {
    this.onChange('endValue', value)
    this.history_data({
     end_date: value,   bbasset:this.state.bbasset
    })

  }
  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };
  render() {
    const {
      data3, columns3, bbasset, bbsymbol, bbsymbolArrs, data3A, isofk,danxuanriqi,quanbushujuzimu,imgArr,quanbu,bbassetArr,startValue,endValue
    } = this.state

    return (
      <div className="bbentrust_warp">
        <div className="title_nav">
          <div className="one_box">
            <span className="sanpanbox">
              币种
            </span>
            <Select value={bbasset} style={{ width: 110 }} onChange={this.handleChange}>
              {
                bbassetArr.map((item, index) => {
                  return <Option key={item + index} value={item.coin}>{item.coin}</Option>
                })
              }
            </Select>
          </div>
          <div className="two_box" style={{width:161}} onClick={this.dianjiquanbu}>
          <span className="sanpanbox">
              类别
            </span>
          <div className="inputsll">
              {quanbushujuzimu}
              <img src={quanbu ? imgArr.a1 : imgArr.a2} alt="" />
              <div className="inpusll-wawrp" style={{ display: quanbu ? "none" : "flex" }} >
                <div className="wawrp-li">
                  <p>< FormattedMessage id="whole" defaultMessage={'全部'} /></p>
                  <li onClick={() => this.quanbuleixing("0")}>< FormattedMessage id="LoadiAll_typesng" defaultMessage={'全部类型'} /></li>
                </div>
                <div className="wawrp-li">
                  <p>交易</p>
                  <li onClick={() => this.quanbuleixing("1")}>买入</li>
                  <li onClick={() => this.quanbuleixing("2")}>卖出</li>
                </div>
                <div className="wawrp-li">
                  <p>转出</p>
                  <li onClick={() => this.quanbuleixing('3')}>转出至资金账户</li>
                  <li onClick={() => this.quanbuleixing('4')}>转出至永续合约</li>
                </div>
                <div className="wawrp-li">
                  <p>转入</p>
                  <li onClick={() => this.quanbuleixing("5")}>资金账户转入</li>
                  <li onClick={() => this.quanbuleixing('6')}>永续合约转入</li>
                </div>
              </div>
            </div>
          </div>
          <div className="two_box">
          <Radio.Group value={danxuanriqi} buttonStyle="solid" onChange={this.riqi3}>
              <Radio.Button value="1">< FormattedMessage id="The_last_two_days" defaultMessage={'最近两天'} /></Radio.Button>
              <Radio.Button value="2">< FormattedMessage id="Two_days_to_three_months" defaultMessage={'两天至三个月'} /></Radio.Button>
            </Radio.Group>
          </div>
          <div className="two_box">
          {
              (() => {
                if (startValue) {
                  return < DatePicker
                    disabled={danxuanriqi == "1" ? true : false}
                    disabledDate={this.disabledDate1}
                    value={startValue}
                    format={dateFormat}
                    onChange={this.riqi1}
                  />
                }
              })()
            }
          </div>
          <div className="two_box">
          {
              (() => {
                if (endValue) {
                  return <DatePicker
                    disabled={danxuanriqi == "1" ? true : false}
                    disabledDate={this.disabledDate}
                    value={endValue}
                    format={dateFormat}
                    onChange={this.riqi2} />
                }
              })()
            }
          </div>
        </div>
        <Table pagination={false}
          columns={columns3}
          showHeader={data3 && data3.length > 0 ? true : false}
          dataSource={data3} />
        {
          this.dangqianchipang(data3)
        }
        {
          (()=>{
            if(data3==null){
              return
            }
            if(data3.length>0){
              if(data3.length<10){
                return <div className="wugengd">
                无更多数据
                </div>
              }
             return isofk ? <div className="dibujiazai" onClick={() => {
                this.history_data( {
                  bbasset: bbasset,
                  type: 1,
                  last_order_id:data3[data3.length-1].id
                })
              }}>
                加载更多
            </div> : <div className="wugengd">
            无更多数据
            </div>
            }
          })()

        }
      </div>
    )
  }
}


export default Bbbill