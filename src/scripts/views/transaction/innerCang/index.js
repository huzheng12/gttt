import React, { Component } from 'react';
import './index.scss'
import { timehuansuan } from '@/utils/time'
import { thousands } from '@/utils/prit'
import store from '@/scripts/store.js'
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom"
import { Table, Modal, Tabs, Spin } from 'antd';
import { lishilength, positionfunction, settingzuida, marketsquery, assetfn } from '../../../action';
import { Xfn } from '../../../../utils/axiosfn';
import TablePosition from './comTable';
import EventFN from '../../../../utils/eventfn';
const { TabPane } = Tabs;
@connect(
  state => {
    return {
      ...state.data,
      ...state.datum
    }
  }
)
class Innercang extends Component {
  constructor() {
    super()
    var that = this
    this.state = {
      kaiguan: true,
      kaiguan1: true,
      objtime: {},
      chakanshu: [],
      visible8: false,
      imgArr: {
        io: require("../../../img/treaty_modify.png"),
        ioo: require("../../../img/nothing_data.png"),
        swk1: require("../../../img/treaty_bail_close(1).png"),
        swk2: require("../../../img/treaty_bail_close.png"),
        swk3: require("../../../img/treaty_bail_open(1).png"),
        swk4: require("../../../img/treaty_bail_open.png"),
      },
      stateorder: [],
      contname: "a",
      baozhengj: true,
      columns: [
      ],
      data3: [],
      columns3: [],
      page_size: "10",
      chexiaoFlg: true,
      ganengveshuju: {},
      max_leverage: "0",
      pingcangjiageduo: "",
      pingcangjiagekong: "",
      auto_increase_flag: "0",
      MarginOpening: false,
      MarginAdjustment: "",
      pingccangjiageweishuxianzhi: "",
      totallishi: "",
    }
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
          asset: b.asset,
          id: b.id,
          symbol: b.symbol,
          time: new Date().getTime().toString()
        }
      }, (res, code) => {
        if (code == 0) {
          setTimeout(() => {
            this.setState({
              chexiaoFlg: true
            })
          }, 500)
        }
      }, "撤销成功")
    }
  }
  // 撤销  上面是撤销
  chexiao = (a, b) => {
    var objtime = timehuansuan(b.ctime).objtimes
    Xfn({
      _u: "transactionRecord",
      _m: "get",
      _p: {
        order_id: b.id,
        asset: this.props.asset,
        symbol: b.symbol,
        time: new Date().getTime().toString()
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
  // 查看   上面是查看


  callback = (key) => {
    if (localStorage.userInfo) {
      if (key === "3") {
        this.historyJIlu()
      }
    } else {
      this.setState({
        data3: []
      })
      store.dispatch(lishilength("0"))
    }
  }
  componentDidMount() {
    setTimeout(() => {
      EventFN.FormHeaderUniversal({
        _this: this,
        _type: 1
      }, (data) => {
        this.setState({
          columns: data
        })
      })
      EventFN.FormHeaderUniversal({
        _this: this,
        _type: 2,
        // _types: 5
      }, (data) => {
        this.setState({
          columns3: data
        })
      })
      if (localStorage.userInfo) {
        this.historyJIlu()
      } else {
        store.dispatch(lishilength("0"))
      }
    }, 500)
  }
  componentDidUpdate() {
    if (localStorage.userInfo && this.props.tickerlast === 1) {
      for (let i = 0; i < this.props.instrumentArr.length; i++) {
        for (let j = 0; j < this.props.position.length; j++) {
          if (this.props.instrumentArr[i].symbol == this.props.position[j].symbol) {
            if (this.props.position[j].bid_flag == "1") {
              this.props.position[j].pnl = String((this.props.position[j].qty * this.props.instrumentArr[i].lot_size / this.props.position[j].entry_price) - (this.props.position[j].qty * this.props.instrumentArr[i].lot_size / this.props.instrumentArr[i].mark_price)).replace(/^(.*\..{4}).*$/, "$1")
            } else {
              this.props.position[j].pnl = String((this.props.position[j].qty * this.props.instrumentArr[i].lot_size / this.props.instrumentArr[i].mark_price) - (this.props.position[j].qty * this.props.instrumentArr[i].lot_size / this.props.position[j].entry_price)).replace(/^(.*\..{4}).*$/, "$1")
            }
          }
        }
      }
      store.dispatch(positionfunction(this.props.position))
      store.dispatch({ type: "tickerlast", num: 0 })
    }
    if (localStorage.userInfo && this.props.historyflg == "1" || this.props.asset_switch === 1) {
      var a = this.props.heyuename
      this.historyJIlu()
      store.dispatch({ type: "historyflg", historyflg: "0" })
      store.dispatch(assetfn(this.props.asset, 0))
    }
  }
  historyJIlu = (a) => {
    if (localStorage.userInfo && this.props.asset) {
      EventFN.HistoricalRecordFN({
        _state: this,
        asset: this.props.asset
      })

    }
  }
  onChangeswitch = () => {
    if (this.state.auto_increase_flag == "0") {
      this.setState({
        auto_increase_flag: "1"
      })
    }
    if (this.state.auto_increase_flag == "1") {
      this.setState({
        auto_increase_flag: "0"
      })
    }
  }
  handleCancel8 = () => {
    this.setState({
      visible8: false,
    })
  }
  dangqianchipang = (a) => {
    if (localStorage.userInfo) {
      if (this.props.allposiont !== "1") {
        if (a <= 0) {
          return <Spin style={{ width: '100%', textAlign: "center", lineHeight: "200px" }} />
        }
      } else {
        if (a <= 0) {
          return <div className="tablemeishuju">
            <img src={this.state.imgArr.ioo} alt="" />
            <div>
              < FormattedMessage id="YouDontHaveRelevant" defaultMessage={'您暂时还没有相关数据'} />
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
  dianjigengduo = () => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    store.dispatch({ type: "dianjigengduo", dianjigengduo: 1 })
  }
  historylength = (a) => {
    this.historyJIlu(a)
  }
  render() {
    const {
      columns,
      columns3,
      data3,
      chakanshu,
      objtime,
      imgArr,
    } = this.state
    const {
      order,
      position,
      allposiont,
      typycang,
      order_total
    } = this.props
    for (let i = 0; i < order.length; i++) {
      order[i].key = "a" + i
    }
    return (
      < div className="Innercang-warp" >
        <Tabs animated={false} defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab={<div>< FormattedMessage id="Current_position" defaultMessage={'当前持仓'} /> [{localStorage.userInfo ? allposiont == "1" ? position.length : "--" : "0"}]</div>} key="1" >
            {this.dangqianchipang(position.length)}
            {
              this.props && this.props.position.map((item, index) => {
                return <TablePosition item={item} imgArr={imgArr} key={item + index}></TablePosition>
              })
            }
          </TabPane>
          <TabPane tab={<div>< FormattedMessage id="Activity_Delegation" defaultMessage={'活动委托'} /> [{localStorage.userInfo ? window.orderlength === "1" ? order_total : "--" : "0"}]</div>} key="2" className="tabpan2" >
            {this.dangqianchipang(order.length)}
            <Table style={{ display: order.length > 0 && localStorage.userInfo ? "block" : "none" }} pagination={{  // 分页
              hideOnSinglePage: true,
              total: order.length,
              pageSize: 100,
            }}
              showHeader={order.length != 0 ? true : false} columns={columns} dataSource={order} />
            {
              (() => {
                if (order.length >= 20) {
                  return <Link style={{ float: 'right' }} to="/transaction/inner" onClick={this.dianjigengduo}><FormattedMessage id="ViewMore" defaultMessage={'查看更多'} />>></Link>
                }
              })()
            }
          </TabPane>
          <TabPane colSpan={0} tab={<div>< FormattedMessage id="Historical_entrustment" defaultMessage={'历史委托'} /> </div>} key="3">
            {this.dangqianchipang(data3.length)}
            <Table
              scroll={{ y: typycang == 1 ? 240 : null }}
              pagination={false}
              style={{ display: data3.length > 0 && localStorage.userInfo ? "block" : "none" }}
              showHeader={data3.length != 0 ? true : false}
              columns={columns3} dataSource={data3} showSizeChanger />
            {
              (() => {
                if (this.state.totallishi * 1 > 20) {
                  return <div>
                    <Link style={{ float: 'right' }} to="/transaction/inner" onClick={this.dianjigengduo}><FormattedMessage id="ViewMore" defaultMessage={'查看更多'} />>></Link>
                  </div>
                }
              })()
            }
          </TabPane>
        </Tabs>
        <div className="baozhengjing">
          <Modal
            className="but0006 but0008 but118 butchengjiaomingzi"
            centered
            title={<FormattedMessage id="Detailed_transaction" defaultMessage={'成交明细'} />}
            visible={this.state.visible8}
            onCancel={this.handleCancel8}
          >
            <div>
              <table className="table-data-mingxi">
                <thead>
                  <tr>
                    <th>< FormattedMessage id="Dealing_time" defaultMessage={'成交时间'} /></th>
                    <th>< FormattedMessage id="Price" defaultMessage={'价格'} /></th>
                    <th><FormattedMessage id="Number_of_transactions" defaultMessage={'成交数量'} /></th>
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
                          >{item.fee * 1 > 0 ? "+" + item.fee : item.fee}
                          </td>
                          {/* <td
                            style={{ color: item.fee * 1 > 0 ? "#26994E" : item.fee * 1 < 0 ? "#E53F39" : "" }}
                          >{String(item.fee * 1 > 0 ? "+" + item.fee : item.fee).replace(/^(.*\..{7}).*$/, "$1")}</td> */}
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </Modal>
        </div>
      </div >
    );
  }
}
export default Innercang
