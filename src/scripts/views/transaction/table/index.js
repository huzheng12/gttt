import React, { Component } from 'react';
import './index.scss'
import { timehuansuan } from '@/utils/time'
import { thousands } from '@/utils/prit'
import { FormattedMessage } from 'react-intl';
import store from '@/scripts/store.js'
import { NavLink } from "react-router-dom"
import { connect } from "react-redux";
import { Table, Modal, Spin, Select } from 'antd';
import { Xfn } from '../../../../utils/axiosfn';
import EventFN from '../../../../utils/eventfn';
import { assetfn } from '../../../action';
const bodys = document.getElementsByTagName("body")[0]
const { Option } = Select;
let times = null
@connect(
  state => {
    return {
      asset: state.data.asset,
      heyuename: state.data.heyuename,
      asset_switch: state.data.asset_switch,
    }
  }
)
class Innercangs extends Component {
  butannius = () => {
    if (this.state.baozhengj) {
      this.refs.yuan1.className = "leftswitch1"
      this.setState({
        baozhengj: false
      })
    } else {
      this.refs.yuan1.className = "switch-box-yuan"
      this.setState({
        baozhengj: true
      })
    }
  }
  state = {
    objtime: {},
    chakanshu: [],
    visible8: false,
    imgArr: {
      ioo: require("../../../img/nothing_data.png"),
    },
    baozhengj: true,
    data3: null,
    columns3: [],
    pairArr: [],
    pair: null,
    bid_flag: "",
    close_flag: "",
    current_page: 0,
    page_size: "20",
    status: "",
    lishilength: "",
    chexiaoFlg: true,
    fenyexianshi: true,
    last_yema: true,
    yema_numb: 1
  }
  chexiao1 = (a, b) => {
    if (this.state.chexiaoFlg) {
      this.setState({
        chexiaoFlg: false
      })
      Xfn({
        _m: "post",
        _u: "order3",
        _p: {
          asset: this.props.asset,
          id: b.id,
          symbol: b.symbol,
        }
      }, (res, code) => {
        if (code == 0) {
          this.symbolqiehuan()
          setTimeout(() => {
            this.setState({
              chexiaoFlg: true
            })
          }, 500)
        }
      }, "撤销成功")
    }
  }
  chexiao = (a, b) => {
    var objtime = timehuansuan(b.ctime).objtimes
    Xfn({
      _u: "transactionRecord",
      _m: "get",
      _p: {
        asset: this.props.asset,
        order_id: b.id,
        symbol: b.symbol,
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          visible8: true,
          chakanshu: res.data.data.rows,
          objtime
        })
      }
    })
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
          pair: res.data.data.rows[0].symbol
        })
        this.screen({
          pair: res.data.data.rows[0].symbol
        })
      }
    })
  }
  componentDidMount() {
    times = setInterval(() => {
      this.symbolqiehuan()
    }, 100);
    EventFN.FormHeaderUniversal({
      _this: this,
      _type: 2,
      _pair: "wuyunaocan"
    }, (data) => {
      this.setState({
        columns3: data
      })
    })
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
  }
  screen = (obj, type) => {
    if (this.state.fenyexianshi) {
      this.setState({
        fenyexianshi: false
      })
    } else {
      return false
    }
    var symbol = this.props.heyuename
    if (obj && obj.pair) {
      symbol = obj.pair
    }
    let objdata = {
      asset: this.props.asset,
      symbol: symbol,
      bid_flag: this.state.bid_flag,
      close_flag: this.state.close_flag,
      next_page: "1",
      page_size: this.state.page_size,
      status: this.state.status,
      time: new Date().getTime().toString()
    }
    if (obj.type) {
      objdata.last_order_id = this.state.data3[this.state.data3.length - 1].id
    }
    Xfn({
      _u: "query_alltiaojian",
      _m: "get",
      _p: objdata
    }, (res, code) => {
      this.setState({
        fenyexianshi: true
      })
      if (code == 0) {
        if (res.data.data && res.data.data.rows) {
          var arr = res.data.data.rows
          for (var i in arr) {
            arr[i].key = arr[i] + i + this.state.current_page
          }
          window.allposiont = "1"
          if (type) {
            if (this.state.data3 !== null) {
              arr = this.state.data3.concat(arr);
            }
          }
          this.setState({
            current_page: this.state.current_page + 1,
            data3: arr,
            lishilength: res.data.data.total,
          })
        }
      }
    })
  }
  handleCancel8 = () => {
    this.setState({
      visible8: false,
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
  ARHandleChange = (val) => {
    this.setState({
      pair: val,
      current_page: 1
    })
    this.screen({
      pair: val
    })
  }
  ARHandleChange1 = (val) => {
    this.setState({
      current_page: 1
    })
    if (val == "0") {
      this.setState({
        bid_flag: "",
        close_flag: ""
      })
      setTimeout(() => {
        this.screen({})
      }, 100)
    } else {
      let a = val.split("-")[0]
      let b = val.split("-")[1]
      this.setState({
        bid_flag: a,
        close_flag: b
      })
      setTimeout(() => {
        this.screen({})
      }, 100)
    }
  }
  ARHandleChange2 = (val) => {
    this.setState({
      current_page: 1
    })
    if (val == "0") {
      this.setState({
        status: "",
      })
      setTimeout(() => {
        this.screen({

        })
      }, 100)
    } else {
      this.setState({
        status: val,
      })
      setTimeout(() => {
        this.screen({

        })
      }, 100)
    }
  }
  componentWillUpdate() {
    if (this.props.asset_switch === 1) {
      store.dispatch(assetfn(this.props.asset, 0))
      this.symbolqiehuan()
    }
  }

  render() {
    const {
      columns3,
      data3,
      objtime,
      chakanshu,
      lishilength,
      pairArr,
      current_page
    } = this.state
    return (
      < div className="Innercang-warp tabe-war" >
       {
         this.props.type==="bb"?'': <div className="ar-title">
         <h3>
           {/* < FormattedMessage id="Contract_Entrustment" defaultMessage={'合约委托'} /> */}
           合约历史委托
         </h3>
       </div>
       }
        <div className="tabe-tiele-content clear">
          <div className="p1">
            <Select value={this.state.pair} style={{ width: "100%", height: "100%" }} onChange={this.ARHandleChange}>
              {
                pairArr.map((item, index) => {
                  return <Option key={item + index} value={item.symbol}>{item.symbol} </Option>
                })
              }
            </Select>
          </div>
          <div className="p1">
            <Select defaultValue="0" style={{ width: "100%", height: "100%" }} onChange={this.ARHandleChange1}>
              <Option value="0">< FormattedMessage id="LoadiAll_typesng" defaultMessage={'全部类型'} /> </Option>
              <Option value="1-0">< FormattedMessage id="Buy_more" defaultMessage={'买入开多'} /> </Option>
              <Option value="0-0">< FormattedMessage id="Short_selling" defaultMessage={'卖出开空'} /></Option>
              <Option value="1-1"> < FormattedMessage id="Buy_flat" defaultMessage={'买入平空'} /></Option>
              <Option value="0-1">< FormattedMessage id="Sell_Pinto" defaultMessage={'卖出平多'} /></Option>
            </Select>
          </div>
          <div className="p1">
            <Select defaultValue="0" style={{ width: "100%", height: "100%" }} onChange={this.ARHandleChange2}>
              <Option value="0">< FormattedMessage id="All_States" defaultMessage={'全部状态'} /></Option>
              <Option value="1">< FormattedMessage id="Mismatches_have_been_created" defaultMessage={'已创建未比配'} /> </Option>
              <Option value="2">< FormattedMessage id="To_close_a_deal" defaultMessage={'待成交'} /></Option>
              <Option value="4">< FormattedMessage id="To_be_cancelled" defaultMessage={'待撤销'} /></Option>
              <Option value="8">< FormattedMessage id="rescinded" defaultMessage={'已撤销'} /></Option>
              <Option value="16">< FormattedMessage id="Partial_Transaction" defaultMessage={'部分成交'} /></Option>
              <Option value="32">< FormattedMessage id="Complete_deal" defaultMessage={'全部成交'} /></Option>
            </Select>
          </div>
        </div>
        {
          this.dangqianchipang(data3)
        }
        <Table pagination={false}
          showHeader={data3 && data3.length > 0 ? true : false}
          columns={columns3}
          dataSource={data3} />
        {/* 分页 */}
        {
          console.log(lishilength, current_page, '[[[')
        }
        {

          lishilength * 1 > 20 && Math.ceil(lishilength / 20) !== current_page ? <div className="view_more" onClick={() => this.screen({
            next_page: '1',
            type: '1'
          }, '1')}>
            < FormattedMessage id="ViewMore" defaultMessage={'查看更多'} />
          </div> : ""
        }
        <Modal
          className="but0006 but0008 but118"
          centered
          title={< FormattedMessage id="Detailed_transaction" defaultMessage={'成交明细'} />}
          visible={this.state.visible8}
          onCancel={this.handleCancel8}
        >
          <div>
            <table className="table-data-mingxi">
              <thead>
                <tr>
                  <th>< FormattedMessage id="Dealing_time" defaultMessage={'成交时间'} /></th>
                  <th>< FormattedMessage id="Price" defaultMessage={'价格'} /></th>
                  <th>< FormattedMessage id="Number_of_transactions" defaultMessage={'成交数量'} /></th>
                  <th>< FormattedMessage id="Turnover" defaultMessage={'成交额'} /></th>
                  <th>< FormattedMessage id="Service_Charge" defaultMessage={'手续费'} /></th>
                </tr>
              </thead>
              <tbody>
                {
                  chakanshu.map((item, index) => {
                    return (
                      <tr key={item + index}>
                        <td>
                          <p>
                            {
                              objtime.n + "-" + objtime.y + "-" + objtime.r
                            }
                          </p>
                          <p>
                            {
                              objtime.s + ":" + objtime.f + ":" + objtime.m
                            }
                          </p>
                        </td>
                        <td>${thousands(item.price)}</td>
                        <td>{item.qty}</td>
                        <td>${thousands(item.price * item.qty)}</td>
                        <td
                          style={{ color: item.fee * 1 > 0 ? "#26994E" : item.fee * 1 < 0 ? "#E53F39" : "" }}
                        >{item.fee * 1 > 0 ? "+" + item.fee : item.fee}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </Modal>
      </div >
    );
  }
}
export default Innercangs