import React, { Component } from 'react';
import './index.scss'
import { Tooltip, Input, Button, Modal, Slider, message, Radio, Checkbox, InputNumber } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import store from '@/scripts/store.js'
import { Xfn } from '../../../../utils/axiosfn';
import number_format from '../../../../utils/renyinumber';
import { openNotificationWithIcon } from '../../../../utils/NotificationCONF';
var numsslkjd
const marks = {
  0.01: '0.01X',
  20: '20.00X',
  40: '40.00X',
  60: "60.00X",
  80: "80.00X",
  100: "100.00X",
};

@connect(
  state => {
    return {
      ...state.data,
      ...state.datum
    }
  }
)
class TablePosition extends Component {
  constructor() {
    super()
    this.state = {
      num17: 0,
      max_leverage: "",
      visible4: false,
      visible3: false,
      visible6: false,
      visible7: false,
      baozhengjinvalue: "",
      MarginOpening: false,
      contname: "a",
      pairP: "",
      num92: "",
      focusvalueflg: false,

    }
  }
  focus1 = () => {
    this.setState({
      focusvalueflg: true
    })
  }

  xiugaidangqianganggan = () => {
    var ew = (this.props.pc_account.available * this.props.instrument.last_price) / (1 / this.props.item.leverage + this.props.pc_account.take_fee_ratio * 2)
    var c = Math.floor(ew)
    this.setState({
      visible4: true,
      max_leverage: c
    })
    this.setState({
      num17: this.props.item.leverage,
      visible4: true
    })
  }
  handleCancel4 = () => {
    this.setState({
      visible4: false,
    });
  }
  handleOk3 = () => {
    const {
      item
    } = this.props
    if (!this.state.baozhengjinvalue) {
      openNotificationWithIcon("opne-warning", "警告", "请输入保证金")
    } else {
      Xfn({
        _m: "post",
        _u: "incr",
        _p: {
          asset: this.props.asset,
          symbol: item.symbol,
          bid_flag: item.bid_flag,
          increase_flag: this.state.contname == "a" ? "1" : "0",
          margin: this.state.baozhengjinvalue,
          time: new Date().getTime().toString()
        }
      }, (res, code) => {
        if (code === 0) {
          this.setState({
            visible3: false,
          });
        }
      })

    }
  };
  handleCancel3 = () => {
    this.setState({
      visible3: false,
    });
  }
  ganggangti = (value) => {
    var last = 0
    for (let i = 0; i < this.props.instrumentArr.length; i++) {
      if (this.props.instrumentArr[i].symbol === this.props.item.symbol) {
        last = this.props.instrumentArr[i].last_price
      }
    }
    var b = value
    var a = (this.props.pc_account.available * last) / (1 / b + this.props.pc_account.take_fee_ratio * 2)
    var c = Math.floor(a)
    this.setState({
      num17: value,
      max_leverage: c
    })
  }
  handleOk4 = () => {
    let num17 = this.state.num17
    var item = this.props.item
    let time = new Date().getTime().toString()
    let leverage = num17
    Xfn({
      _u: "change",
      _m: "post",
      _p: {
        asset: this.props.asset,
        symbol: item.symbol,
        mode: item.margin_mode,
        bid_flag: item.bid_flag,
        leverage,
        time
      }
    }, (res, code) => {
      if (code === 0) {
        store.dispatch({ type: "lever", lever: 1 })
        this.setState({
          visible4: false,
        });
      }
    })

  }
  //保证金
  xiugaibaozhengjin = () => {
    const a = this.props.item
    Xfn({
      _u: "yue",
      _m: "get",
      _p: {
        asset: this.props.asset,
        symbol: a.symbol.split('_')[0],
        from_account: "2",
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code === 0) {
        store.dispatch({ type: "lever", lever: 1 })
        this.setState({
          visible3: true,
          MarginOpening: a.auto_increase_flag === "1" ? true : false,
          MarginAdjustment: res.data.data.available
        })
      }
    })

  }
  baozhengjingddalk = (e) => {
    this.setState({
      contname: e.target.value
    })
  }
  baozhengjonChange = (val) => {
    if (this.state.MarginOpening) {
      this.setState({
        visible3: false,
        visible7: true
      })
    } else {
      this.setState({
        visible3: false,
        visible6: true
      })
    }
  }

  handleCancel6 = () => {
    this.setState({
      visible6: false,
      visible7: false,
      visible3: true,
    })
  }
  handleOk6 = () => {
    Xfn({
      _u: "increase",
      _m: "post",
      _p: {
        asset: this.props.asset,
        symbol: this.props.item.symbol,
        bid_flag: this.props.item.bid_flag,
        open_flag: this.state.MarginOpening ? "0" : "1",
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code === 0) {
        this.setState({
          MarginOpening: !this.state.MarginOpening,
          visible6: false,
          visible7: false,
          visible3: true,
        })
      }
    })

  }
  baozhengjinvalue = (val) => {
    let value = val.target.value;
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = String(value).replace(/^(.*\..{4}).*$/, "$1")
    this.setState({ baozhengjinvalue: value })
  }
  jadsjfljsaldkjf = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    var n = this.props.Decimal_point
    var numdd = new RegExp(`^(.*\\..{${n}}).*$`)
    value = value.replace(numdd, "$1")
    if (value * 1 > 1000000) {
      this.setState({
        pairP: 1000000
      })
      return false
    }
    if (value[0] != "0" && value[0] != ".") {
      this.setState({
        pairP: value
      })
    }
  }
  conchagnee21 = (e) => {
    let value = e.target.value;
    if (value[0] != "0" && value[0] != ".") {
      if (value * 1 > 100000000) {
        this.setState({
          num92: "100000000"
        })
        return false
      }
      this.setState({
        num92: value.replace(/[^0-9]+/, '')
      })
    }
  }
  pingcangdashu = () => {
    var close_price = this.refs.valuea.input.value
    let close_qty = this.state.num92
    let time = new Date().getTime().toString()
    if (numsslkjd.length > 0 && close_qty.length > 0) {
      Xfn({
        _u: "close",
        _m: "post",
        _p: {
          asset: this.props.asset,
          close_price,
          close_qty,
          time,
          symbol: this.props.item.symbol,
          bid_flag: this.props.item.bid_flag
        }
      }, (res, code) => { }, "交易成功")
    } else {
      openNotificationWithIcon("opne-warning", "警告", "输入框不能为空")
    }

  }
  render() {
    const {
      item,
      imgArr,
      instrumentArr
    } = this.props
    const {
      num17,
      max_leverage,
      baozhengjinvalue,
      MarginOpening,
      pairP,
      focusvalueflg,
      num92,
    } = this.state
    if (window.location.hash.indexOf("fulltrade") == -1) {
      return < div className="innercang-box-li clear" style={{
        display: localStorage.userInfo ? "black" : "none", borderLeftColor: item.bid_flag === "1" ? "#26994E" : "red"
      }}>
        <div className="innercang-title">
          <div style={{ color: item.bid_flag === "0" ? "red" : "" }}>{item.symbol}
          </div>
          <div>
            <span
              style={{
                color: item.bid_flag === "0" ? "red" : "",
                borderColor: item.bid_flag === "0" ? "red" : ""
              }}>
              {
                item.bid_flag === "1" ? "多" : '空'
              }
            </span>
            <span>{number_format(item.leverage, 2, ".", ",")}X</span>
          </div>
          <div>
            <img src="" alt="" />
            <span style={{ color: '#2E6BE6', cursor: "pointer" }} onClick={this.xiugaidangqianganggan}>
              <img style={{ display: "inline-block" }} src={imgArr.io} alt="" />
              < FormattedMessage id="Modify_the_current_leverage" defaultMessage={'修改当前杠杆'} />
            </span>
          </div>
        </div>
        <table style={{ width: 600 }}>
          <tbody className="table-box">
            <tr>
              <Tooltip placement="topLeft" title={<FormattedMessage id="Total_Cont" defaultMessage={'交易单位为BTC等币种时，显示的持仓与挂单数量是根据实际张数换算的，所显示的持仓量数值会根据最新成交价变动而变动。'} />}>
                <td>
                  <span className="span_dashed_box">
                    < FormattedMessage id="Hold_positions" defaultMessage={'持仓'} />(< FormattedMessage id="Zhang" defaultMessage={'张'} />)
                    </span>
                </td>
              </Tooltip>
              <td>{item.qty}</td>
              <Tooltip placement="topLeft" title={<FormattedMessage id="PL_Ratio" defaultMessage={'收益率 = 已实现盈亏 / 仓位初始保证金'} />}>
                <td>
                  <span className="span_dashed_box">
                    < FormattedMessage id="Rate_of_return" defaultMessage={'收益率'} />
                  </span>
                </td>
              </Tooltip>
              <td>{String(item.pos_pnl_ratio * 100).replace(/^(.*\..{2}).*$/, "$1")}%</td>
              <Tooltip placement="topLeft" title={< FormattedMessage id="Unrealized_P" defaultMessage={'用户未平仓的仓位的收益。在每天结算时，用户仓位的未实现盈亏将会转入用户的余额，未实现盈亏归零后重新计算。'} />}>
                <td>
                  <span className="span_dashed_box">
                    < FormattedMessage id="Unrealized_Profit_and_Loss" defaultMessage={'未实现盈亏'} />

                  </span>
                </td>

              </Tooltip>
              <td>{item.pnl}</td>
            </tr>
            <tr>
              <td>< FormattedMessage id="Parity" defaultMess age={'可平量'} /></td>
              <td>{item.avail_qty}</td>
              <Tooltip placement="topLeft" title={<FormattedMessage id="Avg_Price" defaultMessage={'开仓均价指的是用户的开仓平均成本价格，该价格不会随着结算发生变动，可以准确的显示用户的实际开仓成本。'} />}>
                <td>
                  <span className="span_dashed_box">
                    < FormattedMessage id="Opening_average_price" defaultMessage={'开仓均价'} />
                  </span>
                </td>
              </Tooltip>
              <td>${item.entry_price}</td>
              <Tooltip placement="topLeft" title={< FormattedMessage id="Maint_Margin" defaultMessage={'当仓位的保证金率小于等于维持保证金率+强平手续费率时，将会触发强制平仓。'} />}>
                <td>
                  <span className="span_dashed_box">
                    < FormattedMessage id="Maintenance_margin_rate" defaultMessage={'维持保证金率'} />

                  </span>
                </td>
              </Tooltip><td>{String(item.maint_margin_ratio * 100).replace(/^(.*\..{2}).*$/, "$1")}%</td>
            </tr>
            <tr>
              <td> < FormattedMessage id="Margin" defaultMessage={'保证金'} /> </td>
              <td className="innercang-td">{item.pos_margin}
                <img style={{ cursor: "pointer" }} onClick={this.xiugaibaozhengjin}
                  style={{ display: "inline-block" }} src={imgArr.io} alt="" /></td>
              <Tooltip placement="topLeft" title={< FormattedMessage id="Liquidation_Price" defaultMessage={'当您的保证金率=维持保证金率+强平手续费率时的价格，若市场触发此价格，您的仓位将被强平系统接管。'} />}>
                <td>
                  <span className="span_dashed_box">
                    < FormattedMessage id="Estimated_strong_parity" defaultMessage={'预估强平价'} />
                  </span>
                </td>
              </Tooltip>
              <td>${item.liquidation_price}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>< FormattedMessage id="Margin_rate" defaultMessage={'保证金率'} /></td>
              <td>{String(item.pos_margin_ratio * 100).replace(/^(.*\..{2}).*$/, "$1")}%</td>
              <Tooltip placement="topLeft" title={< FormattedMessage id="Settled_Earnings" defaultMessage={'该仓位已经结算到用户余额中的已实现盈亏'} />}>
                <td>
                  <span className="span_dashed_box">
                    < FormattedMessage id="Achieved_Profits_and_Losses" defaultMessage={'已实现盈亏'} />

                  </span>
                </td>
              </Tooltip>
              <td>{item.realised_pnl}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="table-right">
          <div>
            <span style={{ marginLeft: 2 }}>
              < FormattedMessage id="close_rate" defaultMessage={'平仓价格'} />
            </span>
            <span style={{ marginLeft: 41 }}>
              < FormattedMessage id="Closing_Quantity" defaultMessage={'平仓数量'} />
            </span>
          </div>
          {/* t */}
          {/* depth */}
          <div className="pingcangjiage">
            <Input placeholder=""
              onFocus={this.focus1}
              ref='valuea'
              value={(() => {
                if (focusvalueflg) {
                  return pairP
                } else {
                  if (instrumentArr.length == 0) return
                  var a = 0
                  for (var i = 0; i < instrumentArr.length; i++) {
                    if (item.symbol === instrumentArr[i].symbol) {
                      numsslkjd = instrumentArr[i].last_price && instrumentArr[i].last_price > 0 ? instrumentArr[i].last_price : ""
                      switch (item.symbol) {
                        case 'BTC_USD': a = 1; break;
                        case 'ETH_USD': a = 2; break;
                        case 'EOS_USD': a = 3; break;
                        default: break;
                      }
                    }
                  }
                  return number_format(numsslkjd, a, ".")
                }
              })()}
              onChange={this.jadsjfljsaldkjf}
              style={{ width: 80, height: 20 }} />
            <Input placeholder=""
              value={num92}
              onChange={this.conchagnee21}
              style={{ width: 80, height: 20, marginLeft: 10 }} />
          </div>
          {/* c */}
          <div>
            <Button type="danger" className={item.bid_flag == "1" ? "bgred" : "lvse"}
              onClick={this.pingcangdashu}
              style={{
                width: "100%", height: 24, marginTop: '9px', color: '#F2ECE6',
                borderColor: item.bid_flag === "1" ? "#E53F39" : "#26994E", backgroundColor: item.bid_flag === "1" ? "#E53F39" : "#26994E"
              }}> < FormattedMessage id="Close_a_position" defaultMessage={'平仓'} /></Button>
          </div>
          {/* b */}
        </div>
        <Modal
          className="but0004"
          centered
          title={< FormattedMessage id="Modify_Leverage_Multiplier" defaultMessage={'修改杠杆倍数'} />}
          visible={this.state.visible4}
          onOk={this.handleOk4}
          onCancel={this.handleCancel4}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div>
            <span>< FormattedMessage id="gearing" defaultMessage={'杠杆倍数'} />：</span>
            <span className="spanganggbeishu">{number_format(num17, 2, ".", ",") + "X"}</span>
          </div>
          <InputNumber
            min={0.01}
            max={100}
            style={{ width: "100%" }}
            step={0.01}
            value={num17}
            onChange={this.ganggangti}
          />
          <Slider marks={marks} value={num17} min={0.01} step={0.01} max={100} tooltipVisible={1 == 2} onChange={this.ganggangti} />
          {/* <Slider marks={marks} value={num17} step={0.01} min={2} max={100} tooltipVisible={1 == 2} onChange={this.ganggangti} /> */}
          <div className="but0004-body-text">
            <p style={{ float: "left", marginRight: 10 }}>
              < FormattedMessage id="Margin_required_for_current_position" defaultMessage={'当前仓位所需保证金'} />
              <span>
                <span style={{ color: "#2E6BE6" }}>
                  {
                    (() => {
                      let pnl = item.pnl * 1 > 0 ? 0 : item.pnl * 1
                      return item ? String((item.qty / item.entry_price) * (String(1 / this.state.num17).replace(/^(.*\..{4}).*$/, "$1") * 1 + this.props.pc_account.take_fee_ratio * 1) - pnl).replace(/^(.*\..{4}).*$/, "$1") : "0.0000"
                    })()}
                </span>
                <span>{item.symbol && item.symbol.split("_")[0]}</span>
              </span>
            </p>
            <p style={{ float: "left" }}>
              <span style={{ color: "#999999" }}>
                <FormattedMessage id="Current_leverage_multiples_up_to" defaultMessage={'当前杠杆倍数最高可开'} />
              </span>
              <span >
                <span style={{ color: "#2E6BE6" }}>
                  {
                    max_leverage
                  }
                </span>
                < FormattedMessage id="Zhang" defaultMessage={'张'} /></span>
            </p>
          </div>
        </Modal>
        <Modal
          className="but0003"
          centered
          title={<FormattedMessage id="Adjustment_of_margin" defaultMessage={'调整保证金'} />}
          visible={this.state.visible3}
          onOk={this.handleOk3}
          onCancel={this.handleCancel3}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <Radio.Group defaultValue="a" buttonStyle="solid" style={{ width: "100%" }} onChange={this.baozhengjingddalk}>
            <Radio.Button style={{ width: "50%", height: 36, textAlign: "center" }} value="a"><FormattedMessage id="Increase_margin" defaultMessage={'增加保证金'} /></Radio.Button>
            <Radio.Button style={{ width: "50%", height: 36, textAlign: "center" }} value="b"><FormattedMessage id="Reduction_of_margin" defaultMessage={'减少保证金'} /></Radio.Button>
          </Radio.Group>
          <div>
            <span>
              <FormattedMessage id="Sustainable_long-term_margin" defaultMessage={'永续多头方向添加保证金'} />
            </span>
          </div>
          <div>
            <Input ref="inpcont1" value={baozhengjinvalue} onChange={this.baozhengjinvalue} />
          </div>
          <div>
            <span>{this.state.contname == "a" ? <FormattedMessage id="Maximum_increase" defaultMessage={'最多增加'} /> : "最多减少"}</span>
            <span>
              <span>{(() => {
                let lot_size = 1
                for (let i = 0; i < this.props.instrumentArr.length; i++) {
                  if (this.props.instrumentArr[i].symbol === item.symbol) {
                    lot_size = this.props.instrumentArr[i].lot_size
                  }
                }
                let anumbkd = item.qty * lot_size / item.entry_price * item.maint_margin_ratio
                let apsdlkjds
                if (item.pos_margin - anumbkd > item.pos_margin - anumbkd + item.pnl * 1) {
                  apsdlkjds = item.pos_margin - anumbkd + item.pnl * 1
                } else {
                  apsdlkjds = item.pos_margin - anumbkd
                }
                return this.state.contname == "a" ? String(this.state.MarginAdjustment).replace(/^(.*\..{4}).*$/, "$1") :
                  String(apsdlkjds > 0 ? apsdlkjds : "0.0000").replace(/^(.*\..{4}).*$/, "$1")
              })()}</span>
              {item.symbol.split("_")[0]}</span>
          </div>
          <div className="innercang-posistion" >
            <span><Checkbox onChange={this.baozhengjonChange} checked={MarginOpening}>< FormattedMessage id="Automatic_additional_margin" defaultMessage={'自动追加保证金'} /></Checkbox> </span>
          </div>
          <div style={{ display: "none" }}>
            <span><FormattedMessage id="The_additional_flat_price_is" defaultMessage={'追加后的强平价格为'} />：</span>
            <span>
              ￥<span></span>
            </span>
          </div>
        </Modal>
        <Modal
          className="but0006 but00066"
          centered
          title={<FormattedMessage id="Tips" defaultMessage={'提示'} />}
          visible={this.state.visible6}
          onOk={this.handleOk6}
          onCancel={this.handleCancel6}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div>
            <FormattedMessage id="Automatic_additional_margin_tips_1"
              values={{ symbol: (item.symbol.split("_")[0]) }}
              defaultMessage={'您正在开启自动追加保证金，当您持有的合約仓位强平时，会自动将您合约账户余额中的{ticker.pair && ticker.pair.split("_")[0]}转入至持仓账户余额充当保证金，如果追加规则规定额度后仍然强平，则不再追加。这将降低您被强平的概率，但在极端情况下可能会导致您和合约账户中的{ticker.pair && ticker.pair.split("_")[0]}全部损失。您确定要开启自动追加保证金功能吗？'} />
          </div>
        </Modal>
        <Modal
          className="but0006 but0007"
          centered
          title={<FormattedMessage id="Tips" defaultMessage={'提示'} />}
          visible={this.state.visible7}
          onOk={this.handleOk6}
          onCancel={this.handleCancel6}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div>
            <FormattedMessage id="Automatic_additional_margin_tips_2"
              defaultMessage={`您正在关闭自动追加保证金，将会在您账户达到强平线时进行强平，当前所持合约将锁定亏损，
                无法再盈利或减少亏损。您确定要关闭自动追加保证金吗？`} />           </div>
        </Modal>
      </div >
    } else {
      return <div className="fultrade-box-table fultrade-box-tablecontent">
        <div className="code-li-box">
         
          <div className="content" style={{
            color: item.bid_flag === "0" ? "red" : "#339F58",
            borderColor: item.bid_flag === "0" ? "red" : "#339F58"
          }}>
            {
              item.symbol
            }
          </div>
        </div>
        <div className="code-li-box">
         
          <div className="content contenduo" style={{
            color: item.bid_flag === "0" ? "red" : "#339F58",
            borderColor: item.bid_flag === "0" ? "red" : "#339F58"
          }}>
            {
              item.bid_flag == "1" ? < FormattedMessage id="many" defaultMess age={"多"} /> : < FormattedMessage id="empty" defaultMess age={"空"} />
            }
          </div>
        </div>
        <div className="code-li-box">
         
          <div className="content">
            {number_format(item.leverage, 2, ".", ",")}X
              <span style={{ cursor: "pointer", color: '#2E6BE6', cursor: "pointer" }} onClick={this.xiugaidangqianganggan}>
              <img style={{
                display: "inline-block", marginTop: -4,
                marginLeft: 5
              }} src={imgArr.io} alt="" />
            </span>
          </div>
        </div>
        <div className="code-li-box">
         
          <div className="content">
            {
              item.qty
            }
          </div>
        </div>
        <div className="code-li-box">
         
          <div className="content">
            {
              item.avail_qty
            }
          </div>
        </div>
        <div className="code-li-box"  style={{minWidth: 77}}> 
         
          <div className="content">
            {
              item.pos_margin
            }
            <img style={{
              cursor: "pointer", display: "inline-block", marginTop: -4,
              marginLeft: 5
            }} onClick={this.xiugaibaozhengjin}
              src={imgArr.io} alt="" />
          </div>
        </div>
        <div className="code-li-box">
        
          <div className="content">
            {
              String(item.pos_margin_ratio * 100).replace(/^(.*\..{2}).*$/, "$1")
            }%
          </div>
        </div>
        <div className="code-li-box">
         
          <div className="content">
            {

              String(item.pos_pnl_ratio * 100).replace(/^(.*\..{2}).*$/, "$1")
            }
          </div>
        </div>
        <div className="code-li-box">
         
          <div className="content">
            ${
              item.entry_price
            }
          </div>
        </div>
        <div className="code-li-box">

          <div className="content">
            ${
              item.liquidation_price
            }
          </div>
        </div>
        <div className="code-li-box">
        
          <div className="content">
            {
              item.realised_pnl
            }
          </div>
        </div>
        <div className="code-li-box">

         
          <div className="content">
            {
              item.pnl
            }
          </div>
        </div>
        <div className="code-li-box minwidthb" style={{minWidth:'90'}}>
         
          <div className="content">
            {
              String(item.maint_margin_ratio * 100).replace(/^(.*\..{2}).*$/, "$1")

            }%
          </div>
        </div>


        <div className="cod-li-box" style={{
          width: '383px',
          display: 'flex',
        }}>
          <div className="fenkgx"></div>
          <div className="code-li-boxa">
          
            <div className="content">
              <Input placeholder=""
                onFocus={this.focus1}
                ref='valuea'
                value={(() => {
                  if (focusvalueflg) {
                    return pairP
                  } else {
                    if (instrumentArr.length == 0) return
                    //   orderBookL2_25obj: {
                    //     arrAsks: [],
                    //     arrBids: []
                    // },
                    var a = 0
                    for (var i = 0; i < instrumentArr.length; i++) {
                      if (item.symbol === instrumentArr[i].symbol) {
                        numsslkjd = instrumentArr[i].last_price && instrumentArr[i].last_price > 0 ? instrumentArr[i].last_price : ""
                        switch (item.symbol) {
                          case 'BTC_USD': a = 1; break;
                          case 'ETH_USD': a = 2; break;
                          case 'EOS_USD': a = 3; break;
                          default: break;
                        }
                      }
                    }
                    return number_format(numsslkjd, a, ".")
                  }
                })()}
                onChange={this.jadsjfljsaldkjf}
                style={{ width: 80, height: 20 }} />
            </div>
          </div>
          <div className="code-li-boxa">
            
            <div className="content">
              <Input placeholder=""
                value={num92}
                onChange={this.conchagnee21}
                style={{ width: 80, height: 20 }} />
            </div>
          </div>
          <div className="code-li-boxa">
         
            <div className="content">
              <Button type="danger" className={item.bid_flag == "1" ? "bgred" : "lvse"}
                onClick={this.pingcangdashu}
                style={{
                  width: "100%", height: 24, marginTop: '3px', color: '#F2ECE6',
                  borderColor: item.bid_flag === "1" ? "#E53F39" : "#26994E", backgroundColor: item.bid_flag === "1" ? "#E53F39" : "#26994E"
                }}> < FormattedMessage id="Close_a_position" defaultMessage={'平仓'} /></Button>
            </div>
          </div>
        </div>
        <Modal
          className="but0004"
          centered
          title={< FormattedMessage id="Modify_Leverage_Multiplier" defaultMessage={'修改杠杆倍数'} />}
          visible={this.state.visible4}
          onOk={this.handleOk4}
          onCancel={this.handleCancel4}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div>
            <span>< FormattedMessage id="gearing" defaultMessage={'杠杆倍数'} />：</span>
            <span className="spanganggbeishu">{number_format(num17, 2, ".", ",") + "X"}</span>
          </div>
          <InputNumber
            min={0.01}
            max={100}
            style={{ width: "100%" }}
            step={0.01}
            value={num17}
            onChange={this.ganggangti}
          />
          <Slider marks={marks} value={num17} min={0.01} step={0.01} max={100} tooltipVisible={1 == 2} onChange={this.ganggangti} />
          {/* <Slider marks={marks} value={num17} step={0.01} min={2} max={100} tooltipVisible={1 == 2} onChange={this.ganggangti} /> */}
          <div className="but0004-body-text">
            <p style={{ float: "left", marginRight: 10 }}>
              < FormattedMessage id="Margin_required_for_current_position" defaultMessage={'当前仓位所需保证金'} />
              <span>
                <span style={{ color: "#2E6BE6" }}>
                  {
                    (() => {
                      let pnl = item.pnl * 1 > 0 ? 0 : item.pnl * 1
                      return item ? String((item.qty / item.entry_price) * (String(1 / this.state.num17).replace(/^(.*\..{4}).*$/, "$1") * 1 + this.props.pc_account.take_fee_ratio * 1) - pnl).replace(/^(.*\..{4}).*$/, "$1") : "0.0000"
                    })()
                  }
                </span>
                <span>{item.symbol && item.symbol.split("_")[0]}</span>
              </span>
            </p>
            <p style={{ float: "left" }}>
              <span style={{ color: "#999999" }}>
                <FormattedMessage id="Current_leverage_multiples_up_to" defaultMessage={'当前杠杆倍数最高可开'} />
              </span>
              <span >
                <span style={{ color: "#2E6BE6" }}>
                  {
                    max_leverage
                  }
                </span>
                < FormattedMessage id="Zhang" defaultMessage={'张'} /></span>
            </p>
          </div>
        </Modal>
        <Modal
          className="but0003"
          centered
          title={<FormattedMessage id="Adjustment_of_margin" defaultMessage={'调整保证金'} />}
          visible={this.state.visible3}
          onOk={this.handleOk3}
          onCancel={this.handleCancel3}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <Radio.Group defaultValue="a" buttonStyle="solid" style={{ width: "100%" }} onChange={this.baozhengjingddalk}>
            <Radio.Button style={{ width: "50%", height: 36, textAlign: "center" }} value="a"><FormattedMessage id="Increase_margin" defaultMessage={'增加保证金'} /></Radio.Button>
            <Radio.Button style={{ width: "50%", height: 36, textAlign: "center" }} value="b"><FormattedMessage id="Reduction_of_margin" defaultMessage={'减少保证金'} /></Radio.Button>
          </Radio.Group>
          <div>
            <span>
              <FormattedMessage id="Sustainable_long-term_margin" defaultMessage={'永续多头方向添加保证金'} />
            </span>
          </div>
          <div>
            <Input ref="inpcont1" value={baozhengjinvalue} onChange={this.baozhengjinvalue} />
          </div>
          <div>
            <span>{this.state.contname == "a" ? <FormattedMessage id="Maximum_increase" defaultMessage={'最多增加'} /> : "最多减少"}</span>
            <span>
              <span>{(() => {
                let anumbkd = item.qty * this.props.face_value / item.entry_price * item.maint_margin_ratio
                let apsdlkjds
                if (item.pos_margin - anumbkd > item.pos_margin - anumbkd + item.pnl) {
                  apsdlkjds = item.pos_margin - anumbkd + item.pnl
                } else {
                  apsdlkjds = item.pos_margin - anumbkd
                }
                return this.state.contname == "a" ? String(this.state.MarginAdjustment).replace(/^(.*\..{4}).*$/, "$1") :
                  String(apsdlkjds > 0 ? apsdlkjds : "0.0000").replace(/^(.*\..{4}).*$/, "$1")
              })()}</span>
              {item.symbol.split("_")[0]}</span>
          </div>
          <div className="innercang-posistion" >
            <span><Checkbox onChange={this.baozhengjonChange} checked={MarginOpening}>< FormattedMessage id="Automatic_additional_margin" defaultMessage={'自动追加保证金'} /></Checkbox> </span>
          </div>
          <div style={{ display: "none" }}>
            <span><FormattedMessage id="The_additional_flat_price_is" defaultMessage={'追加后的强平价格为'} />：</span>
            <span>
              ￥<span></span>
            </span>
          </div>
        </Modal>
        <Modal
          className="but0006 but00066"
          centered
          title={<FormattedMessage id="Tips" defaultMessage={'提示'} />}
          visible={this.state.visible6}
          onOk={this.handleOk6}
          onCancel={this.handleCancel6}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div>
            <FormattedMessage id="Automatic_additional_margin_tips_1"
              values={{ symbol: (item.symbol.split("_")[0]) }}
              defaultMessage={'您正在开启自动追加保证金，当您持有的合約仓位强平时，会自动将您合约账户余额中的{ticker.pair && ticker.pair.split("_")[0]}转入至持仓账户余额充当保证金，如果追加规则规定额度后仍然强平，则不再追加。这将降低您被强平的概率，但在极端情况下可能会导致您和合约账户中的{ticker.pair && ticker.pair.split("_")[0]}全部损失。您确定要开启自动追加保证金功能吗？'} />
          </div>
        </Modal>
        <Modal
          className="but0006 but0007"
          centered
          title={<FormattedMessage id="Tips" defaultMessage={'提示'} />}
          visible={this.state.visible7}
          onOk={this.handleOk6}
          onCancel={this.handleCancel6}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div>
            <FormattedMessage id="Automatic_additional_margin_tips_2"
              defaultMessage={`您正在关闭自动追加保证金，将会在您账户达到强平线时进行强平，当前所持合约将锁定亏损，
                无法再盈利或减少亏损。您确定要关闭自动追加保证金吗？`} />           </div>
        </Modal>
      </div>
    }
  }

}
export default TablePosition