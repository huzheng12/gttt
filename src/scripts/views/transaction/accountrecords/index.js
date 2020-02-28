import React, { Component } from 'react';
import './index.scss'
import { NavLink } from "react-router-dom"
import { Table, Select, Radio, DatePicker, Spin } from 'antd';
import { timehuansuan } from '@/utils/time'
import moment from 'moment';
import 'moment/locale/zh-cn';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import lang from '@/utils/language';
import { Xfn } from '../../../../utils/axiosfn';
import store from '../../../store';
import { assetfn } from '../../../action';
moment.locale('zh-cn');
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';
const bodys = document.getElementsByTagName("body")[0]
let times = null
@connect(
  state => {
    return {
      time: state.data.times,
      heyuename: state.data.heyuename,
      asset: state.data.asset,
      asset_switch: state.data.asset_switch,
      heyuenameSlipt: state.data.heyuenameSlipt,
    }
  }
)
class AccountRecords extends Component {
  constructor() {
    super()
    this.state = {
      quanbushujuzimu: < FormattedMessage id="LoadiAll_typesng" defaultMessage={'全部类型'} />,
      timeObj: "",
      time2: "",
      timeObjs: "",
      time2s: "",
      imgArr: {
        io: require("../../../img/treaty_modify.png"),
        a1: require('../../../img/treaty_up.png'),
        a2: require('../../../img/treaty_down.png'),
        io: require("../../../img/treaty_modify.png"),
        ioo: require("../../../img/nothing_data.png"),
      },
      danxuanriqi: "1",
      quanbu: true,
      pair: null,
      lishilength: "",
      data3: null,
      columns3: [
        {
          title: < FormattedMessage id="time" defaultMessage={'时间'} />,
          dataIndex: 'time',

          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word", width: 70, }}>
            <p>
              {timehuansuan(text).date}
            </p>
            <p>
              {timehuansuan(text).dates}          </p>
          </div>,
        },
        {
          title: < FormattedMessage id="Type_of_transaction" defaultMessage={'交易类型'} />,
          dataIndex: 'trade_type',

          render: (text, record) => <div style={{ width: 60, wordWrap: "break-word" }}>
            {
              (() => {
                switch (text) {
                  case "0":
                    return < FormattedMessage id="whole" defaultMessage={'全部'} />;
                  case "1":
                    return < FormattedMessage id="Qiang_Ping_duo" defaultMessage={'强平平多'} />;
                  case "2": return < FormattedMessage id="Strong_flat_air" defaultMessage={'强平平空'} />;
                  case "3": return < FormattedMessage id="To_change_into" defaultMessage={'转入'} />;
                  case "4": return < FormattedMessage id="Turn_out" defaultMessage={'转出'} />;
                  case "5": return < FormattedMessage id="Manual_Addition" defaultMessage={'手动追加'} />;
                  case "6": return < FormattedMessage id="Manual_reduction" defaultMessage={'手动减少'} />;
                  case "7": return < FormattedMessage id="Automatic_Addition" defaultMessage={'自动追加'} />;
                  case "8": return < FormattedMessage id="Open_many" defaultMessage={'开多'} />;
                  case "9": return < FormattedMessage id="Open_space" defaultMessage={'开空'} />;
                  case "10": return < FormattedMessage id="Ping_Duo" defaultMessage={'平多'} />;
                  case "11": return < FormattedMessage id="Level_air" defaultMessage={'平空'} />;
                  case "12": return < FormattedMessage id="Automatic_margin_increase" defaultMessage={'用户调低杠杆自动追加保证金'} />;
                  case "13": return < FormattedMessage id="All_Qiang_Ping" defaultMessage={'全部强平'} />;
                  case "14": return < FormattedMessage id="All_Rolls" defaultMessage={'全部划转'} />;
                  case "15": return < FormattedMessage id="All_transactions" defaultMessage={'全部交易'} />;
                  default:
                    return < FormattedMessage id="whole" defaultMessage={'全部'} />;
                }
              })()
            }
          </div>,
        },
        {
          title: < FormattedMessage id="Number_of_transactions" defaultMessage={'成交数量'} />,
          dataIndex: 'trade_amt',
          render: (text, record) => <div style={{ width: 60, wordWrap: "break-word" }}>
            {text ? text : '--'}
          </div>,
        },
        {
          title: < FormattedMessage id="Entrusted_Quantity" defaultMessage={'委托数量'} />,
          dataIndex: 'order_amt',

          render: (text, record) => <div style={{ width: 60, wordWrap: "break-word" }}>
            {text ? text : '--'}
          </div>,
        },
        {
          title: < FormattedMessage id="Unclosed_Quantity" defaultMessage={'未成交数量'} />,
          dataIndex: 'no_trade_amt',
          render: (text, record) => <div style={{ width: 70, wordWrap: "break-word" }}>
            {text ? text : '--'}
          </div>,
        },
        {
          title: < FormattedMessage id="Amount_of_money" defaultMessage={'金额'} />,
          dataIndex: 'volume',
          align: "left",
          render: (text, record) => <div
            className={text * 1 == 0 ? "coloroo" : ""}
            style={{
              width: 80, wordWrap: "break-word",
              color: text * 1 > 0 ? "#26994E" : text * 1 < 0 ? "#E53F39" : "#333333"
            }}>
            {
              !text ? '--' : text <= 0 ? String(text).replace(/^(.*\..{6}).*$/, "$1") + this.state.pair.split("_")[0] : String("+" + text).replace(/^(.*\..{6}).*$/, "$1") + this.state.pair.split("_")[0]
            }
          </div>,
        },
        {
          title: < FormattedMessage id="Transaction_Price" defaultMessage={'成交价格'} />,
          dataIndex: 'trade_price',
          align: "left",

          render: (text, record) => <div style={{ width: 60, wordWrap: "break-word" }}>
            {text ? String(text).replace(/^(.*\..{4}).*$/, "$1") : "--"}
          </div>,
        },
        {
          title: < FormattedMessage id="Commission_rate" defaultMessage={'佣金费率'} />,
          dataIndex: 'fee_ratio',
          align: "left",
          render: (text, record) => <div style={{ width: 60, wordWrap: "break-word" }}>
            {String(text * 100).replace(/^(.*\..{6}).*$/, "$1")}%
          </div>,
        },
        {
          title: < FormattedMessage id="Service_Charge" defaultMessage={'手续费'} />,
          dataIndex: 'fee',
          align: "left",
          render: (text, record) => <div style={{ wordWrap: "break-word", color: text >= 0 ? "rgb(38, 153, 78)" : 'rgb(229, 63, 57)' }}>
            {text <= 0 ? String(text == "null" || text == null ? 0 : text).replace(/^(.*\..{6}).*$/, "$1") : String(text == "null" || text == null ? 0 : "+" + text).replace(/^(.*\..{6}).*$/, "$1")}
            {
              this.state.pair.split("_")[0]
            }
          </div>,
        },
        {
          title: < FormattedMessage id="Types_of_Entrustment" defaultMessage={'委托种类'} />,
          dataIndex: 'order_type',
          render: (text, record) => <div style={{ wordWrap: "break-word" }}>
            {
              (() => {
                switch (text) {
                  case "1":
                    return < FormattedMessage id="Fixed_price" defaultMessage={'限价'} />;
                  default:
                    return "--";
                }
              })()
            }
          </div>,
        },
        {
          title: < FormattedMessage id="Entrusted_Price" defaultMessage={'委托价格'} />,
          dataIndex: 'order_price',
          render: (text, record) => <div style={{ wordWrap: "break-word" }}>
            {text ? text : '--'}
          </div>,
        },
        {
          title: < FormattedMessage id="Remarks" defaultMessage={'备注'} />,
          dataIndex: 'remark',
          render: (text, record) => <div style={{ wordWrap: "break-word" }}>
            {text ? text : '--'}
          </div>,
        },
        {
          title: < FormattedMessage id="Delegate_ID" defaultMessage={'委托ID'} />,
          dataIndex: 'order_id',
          align: "right",
          render: (text, record) => <div style={{ wordWrap: "break-word" }}>
            {text ? (text * 1).toString(32) : '--'}
          </div>,
        },
      ],
      trade_type: "0",
      history_type: "1",
      current_page: 1,
      page_size: "20",
      startValue: null,
      endValue: null,
      pairArr: [],
      page_size_odl: 0,
      page_size_odlFlg: true
    }
  }
  historylength = () => {
    if (!this.state.page_size_odlFlg) {
      return false
    }

    this.setState({
      current_page: this.state.current_page + 1,
      page_size_odlFlg: false
    })
    this.aixosjlksdjf(this.state.current_page + 1)
  }
  symbolqiehuan = () => {
    if (this.props.asset === null) return false
    if (times !== null) {
      clearInterval(times)
      times = null
    }
    Xfn({
      _u: "pairQuery",
      _m: "get",
      _p: {
        asset: this.props.asset
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          pairArr: res.data.data.rows,
          page_size_odl: res.data.data.total,
          pair: res.data.data.rows[0].symbol,
        })
        this.aixosjlksdjf("1", {
          pair: res.data.data.rows[0].symbol
        })
      }
    })
  }
  componentDidMount() {
    times = setInterval(() => {
      this.symbolqiehuan()
    }, 100);

    if (this.props.type!=='bb'&&localStorage.theme) {
      this.setState({
        zhuti: localStorage.theme
      })
      bodys.className = "theme-" + localStorage.theme
    } else {
      this.setState({
        zhuti: "light"
      })
      bodys.className = "theme-light"
    }
    this.setState({
      startValue: moment().add(-2, 'days'),
      endValue: moment()
    })

  }
  aixosjlksdjf = (a, obj) => {

    if (!this.props.asset) { return false }
    var timeend = null
    var timestart = null
    if (this.state.danxuanriqi == "2") {
      let endValue = this.state.endValue
      let startValue = this.state.startValue
      if (obj && obj.endValue) {
        endValue = obj.endValue
      }
      if (obj && obj.startValue) {
        startValue = obj.startValue
      }
      let t1 = timehuansuan(moment(endValue).valueOf()).objtime
      let t2 = timehuansuan(moment(startValue).valueOf()).objtime
      timeend = new Date(t1.n, t1.y, t1.r, 0, 0, 0, 0).getTime().toString()
      timestart = new Date(t2.n, t2.y, t2.r, 0, 0, 0, 0).getTime().toString()
    }
    Xfn({
      _u: "billheyuezhanghu",
      _m: "get",
      _p: {
        asset: this.props.asset,
        symbol: obj && obj.pair ? obj.pair : this.state.pair,
        trade_type: this.state.trade_type,
        history_type: this.state.danxuanriqi,
        current_page: a ? a : "1",
        page_size: this.state.page_size,
        start_date: timestart,
        end_date: timeend,
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      localStorage.accoundtkant = "1"
      if (code == 0) {
        let arrw = res.data.data.rows
        if (arrw === null) { arrw = [] }
        for (var i in arrw) {
          arrw[i].key = arrw[i] + i + a
        }
        if (a === 1) {

        } else {
          if (this.state.data3 !== null && a !== '1') {
            arrw = this.state.data3.concat(arrw);
          }
        }
        this.setState({
          page_size_odlFlg: true,
          data3: arrw,
          page_size_odl: res.data.data.total
        })
      }
    })
  }
  ARHandleChange = (value) => {
    this.setState({
      pair: value,
      current_page: 1
    })
    this.aixosjlksdjf("1", {
      pair: value
    })
  }
  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };
  riqi1 = (value) => {
    this.onChange('startValue', value)
    this.setState({
      current_page: 1
    })
    this.aixosjlksdjf("1", {
      startValue: value
    })
  }

  riqi2 = (value) => {
    this.setState({
      current_page: 1
    })
    this.onChange('endValue', value)
    this.aixosjlksdjf("1", {
      endValue: value
    })

  }
  riqi3 = (date) => {
    this.setState({
      current_page: 1
    })
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
      this.aixosjlksdjf('1')
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
  quanbuleixing = (num) => {
    var qua
    switch (num) {
      case "0": qua = lang().LoadiAll_typesng; break;
      case "1": qua = lang().Qiang_Ping_duo; break;
      case "2": qua = lang().Strong_flat_air; break;
      case "3": qua = lang().To_change_into; break;
      case "4": qua = lang().Turn_out; break;
      case "5": qua = lang().Manual_Addition; break;
      case "6": qua = lang().Manual_reduction; break;
      case "7": qua = lang().Automatic_Addition; break;
      case "8": qua = lang().Open_many; break;
      case "9": qua = lang().Open_space; break;
      case "10": qua = lang().Ping_Duo; break;
      case "11": qua = lang().Level_air; break;
      case "12": qua = lang().Automatic_margin_increase; break;
      case "13": qua = lang().All_Qiang_Ping; break;
      case "14": qua = lang().All_Rolls; break;
      case "15": qua = lang().All_transactions; break;
      default:
        break;
    }
    this.setState({
      trade_type: num,
      quanbushujuzimu: qua,
      current_page: 1
    })
    setTimeout(() => {
      this.aixosjlksdjf('1')
    }, 100)
  }
  disabledDate = (current) => {
    return current && current > moment().endOf('day');
  }
  disabledDate1 = (current) => {
    return current && current > moment().endOf('day');
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
          <NavLink style={{ margin: "0 5px" }} to="/login"> < FormattedMessage id="Sign_in" defaultMessage={'登录'} /></NavLink>
          < FormattedMessage id="Only_then_see_information" defaultMessage={'才可以看到此信息'} />
        </div>
      </div>
    }
  }
  componentDidUpdate() {
    if (this.props.asset_switch === 1) {
      this.symbolqiehuan()
      store.dispatch(assetfn(this.props.asset, 0))
    }
  }

  render() {
    const { time } = this.props
    const {
      danxuanriqi,
      imgArr,
      quanbu,
      data3,
      columns3,
      quanbushujuzimu,
      lishilength,
      startValue,
      endValue,
      current_page
    } = this.state
    const {
      heyuenameSlipt
    } = this.props
    return (
      <div className="account-records-warp">
        {
          this.props.type==='bb'?'':<div className="ar-title">
          <h3> < FormattedMessage id="Contract_Bill" defaultMessage={'合约账户记录'} /></h3>
        </div>
        }
        <div className="ar-form-title clear">
          <div className="p1">
            <Select value={this.state.pair} style={{ width: "100%", height: "100%" }} onChange={this.ARHandleChange}>
              {
                heyuenameSlipt.map((item, index) => {
                  return <Option key={item + index} value={item.symbol}>{item.symbol} </Option>
                })
              }

            </Select>
          </div>
          <div className="p2" onClick={this.dianjiquanbu}>
            <div className="inputsll">
              {quanbushujuzimu}
              <img src={quanbu ? imgArr.a1 : imgArr.a2} alt="" />
              <div className="inpusll-wawrp" style={{ display: quanbu ? "none" : "flex" }} >
                <div className="wawrp-li">
                  <p>< FormattedMessage id="whole" defaultMessage={'全部'} /></p>
                  <li onClick={() => this.quanbuleixing("0")}>< FormattedMessage id="LoadiAll_typesng" defaultMessage={'全部类型'} /></li>
                </div>
                <div className="wawrp-li">
                  <p>< FormattedMessage id="Qiang_Ping" defaultMessage={'强平'} /></p>
                  <li onClick={() => this.quanbuleixing("13")}>< FormattedMessage id="whole" defaultMessage={'全部'} /></li>
                  <li onClick={() => this.quanbuleixing("1")}>< FormattedMessage id="Qiang_Ping_duo" defaultMessage={'强平平多'} /></li>
                  <li onClick={() => this.quanbuleixing("2")}>< FormattedMessage id="Strong_flat_air" defaultMessage={'强平平空'} /></li>
                </div>
                <div className="wawrp-li" style={{ width: 268 }}>
                  <p>< FormattedMessage id="Transfer" defaultMessage={'划转'} /></p>
                  <li onClick={() => this.quanbuleixing("14")}>< FormattedMessage id="whole" defaultMessage={'全部'} /></li>
                  {/* <li onClick={() => this.quanbuleixing("3")}>< FormattedMessage id="To_change_into" defaultMessage={'转入'} /></li>
                  <li onClick={() => this.quanbuleixing("4")}>< FormattedMessage id="Turn_out" defaultMessage={'转出'} /></li> */}
                  <li onClick={() => this.quanbuleixing('5')}>< FormattedMessage id="Manual_Addition" defaultMessage={'手动追加'} /></li>
                  <li onClick={() => this.quanbuleixing('6')}>< FormattedMessage id="Manual_reduction" defaultMessage={'手动减少'} /></li>
                  <li onClick={() => this.quanbuleixing('7')}>< FormattedMessage id="Automatic_Addition" defaultMessage={'自动追加'} /></li>
                  <li onClick={() => this.quanbuleixing('12')}>< FormattedMessage id="Automatic_margin_increase" defaultMessage={'用户调低杠杆自动追加保证金'} /></li>
                </div>
                <div className="wawrp-li">
                  <p>< FormattedMessage id="transaction" defaultMessage={'交易'} /></p>
                  <li onClick={() => this.quanbuleixing("15")}>< FormattedMessage id="whole" defaultMessage={'全部'} /></li>
                  <li onClick={() => this.quanbuleixing('8')}>< FormattedMessage id="Open_many" defaultMessage={'开多'} /></li>
                  <li onClick={() => this.quanbuleixing('9')}>< FormattedMessage id="Open_space" defaultMessage={'开空'} /></li>
                  <li onClick={() => this.quanbuleixing('10')}>< FormattedMessage id="Ping_Duo" defaultMessage={'平多'} /></li>
                  <li onClick={() => this.quanbuleixing('11')}>< FormattedMessage id="Level_air" defaultMessage={'平空'} /></li>
                </div>
              </div>
            </div>
          </div>
          <div className="p3">
            <Radio.Group value={danxuanriqi} buttonStyle="solid" onChange={this.riqi3}>
              <Radio.Button value="1">< FormattedMessage id="The_last_two_days" defaultMessage={'最近两天'} /></Radio.Button>
              <Radio.Button value="2">< FormattedMessage id="Two_days_to_three_months" defaultMessage={'两天至三个月'} /></Radio.Button>
            </Radio.Group>
          </div>
          <div className="p4">
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
          <span style={{ float: "left" }}>-</span>
          <div className="p4 p5">
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
        <div className="table-warp">
          {this.dangqianchipang(data3)}
          <Table pagination={false}
            showHeader={data3 && data3.length > 0 ? true : false}
            columns={columns3}
            dataSource={data3} />
          {/* 分页 */}
          {
            console.log(this.state.page_size_odl, Math.ceil(this.state.page_size_odl / 20))
          }
          {
            this.state.page_size_odl > 20 && (Math.ceil(this.state.page_size_odl / 20) !== current_page) ? <div className="view_more" onClick={this.historylength}>
              < FormattedMessage id="ViewMore" defaultMessage={'查看更多'} />
            </div> : ""
          }
        </div>
      </div>
    );
  }
}

export default AccountRecords;