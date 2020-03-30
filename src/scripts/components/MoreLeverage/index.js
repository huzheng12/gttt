import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { history } from '@/utils/history'
import {
  Button,
  Modal,
  Slider,
  InputNumber
} from 'antd';
import { Xfn } from '../../../utils/axiosfn';
import number_format from '../../../utils/renyinumber';
const marks = {
  0.01: '0.01X',
  20: '20.00X',
  40: "40.00X",
  60: "60.00X",
  80: "80.00X",
  100: "100.00X"
};

class MoreLeverage extends Component {
  constructor() {
    super()
    this.state = {
      num17: "",
      max_leverage: "",
      visible: false,
      LeverageBuyingstate: '',
      RecordData: ""
    }
  }
  componentDidUpdate() {
    if (this.state.RecordData !== this.props.LeverageBuying) {
      this.setState({
        RecordData: this.props.LeverageBuying,
        LeverageBuyingstate: this.props.LeverageBuying
      })
    }
  }
  //点击but打开弹窗
  ganggduo = () => {
    const { LeverageBuying, pc_account, ticker } = this.props
    const {
      LeverageBuyingstate
    } = this.state
    if (!localStorage.userInfo) { return history.push('/login') }
    let a = LeverageBuyingstate ? LeverageBuyingstate : LeverageBuying
    var e = (pc_account.available * ticker.last_price) / (1 / LeverageBuying + pc_account.take_fee_ratio * 2)
    var c = Math.floor(e)
    this.setState({
      visible: true,
      num17: a,
      max_leverage: c
    })
  }
  //关闭弹窗
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }
  //确定修改
  handleOk = () => {
    let num17 = this.state.num17
    let mode = this.props.pc_account.margin_mode
    var symbol = this.props.heyuename
    var asset = this.props.ticker.settle_currency
    let bid_flag = this.props.Ctype
    let leverage = num17
    Xfn({
      _u: "change",
      _m: "post",
      _p: {
        symbol,
        asset,
        mode,
        bid_flag,
        leverage,
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          visible: false,
          LeverageBuyingstate: res.data.data.leverage,
        })
      }
    }, '杠杠已调整至' + num17 + '倍')
  }
  //调节slider（杠杆倍数）
  modify_lever = (val) => {
    console.log(val, this.props.pc_account)
    let max_l = ''
    if (this.props.ctype === '0') {
      max_l = this.props.pc_account.ask_max_leverage
    } else {
      max_l = this.props.pc_account.bid_max_leverage
    }
    if (val > max_l * 1) {
      val = max_l
    }
    var b = val * 1 < 100 ? val : 100
    var a = (this.props.pc_account.available * this.props.ticker.last_price) / (1 / b + this.props.pc_account.take_fee_ratio * 2)
    var c = Math.floor(a)
    this.setState({
      num17: b,
      max_leverage: c
    })
  }
  calculate_margin = () => {
    let pnl = 0
    for (var i = 0; i < this.props.position.length; i++) {
      let las = this.props.position[i]
      if (las.bid_flag == this.props.Ctype) {
        if (las.pnl < 0) {
          pnl = las.pnl
        }
        var data = (las.qty / las.entry_price) * (String(1 / this.state.num17).replace(/^(.*\..{4}).*$/, "$1") * 1 + this.props.pc_account.take_fee_ratio * 1) - pnl
      }
    }
    return data ? String(data).replace(/^(.*\..{4}).*$/, "$1") : "0.0000"
  }
  render() {
    const { num17, max_leverage, LeverageBuyingstate } = this.state
    const { LeverageBuying, className, Ctype, mode, pc_account } = this.props
    return (
      <div className="more_leverage_box clear">
        <Button className={className} type="primary"
          onClick={this.ganggduo}>
          {
            (() => {
              if (mode == "1") {
                return <FormattedMessage id="gearing-leverage" defaultMessage={'杠杆倍数'} />
              }
              if (Ctype == "0") {
                return <FormattedMessage id="Short_lever" defaultMessage={'做空杠杆'} />
              } else if (Ctype == "1") {
                return <FormattedMessage id="Do_multi-leverage" defaultMessage={'做多杠杆'} />
              }
            })()
          }
          <div>
            {
              !LeverageBuying ? "--" : LeverageBuyingstate ? number_format(LeverageBuyingstate, 2, ".", ",") + "X" : number_format(LeverageBuying, 2, ".", ",") + "X"
            }
          </div>
        </Button>
        <Modal
          className="but0004"
          centered
          title={<FormattedMessage id="Modify_Leverage_Multiplier" defaultMessage={'修改杠杆倍数'} />}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div>
            <span> <FormattedMessage id="gearing-leverage" defaultMessage={'杠杆倍数'} />：</span>
            <span>{num17 ? number_format(num17, 2, ".", ",") + "X" : "0"}</span>
          </div>
          <InputNumber
            min={0.01}
            max={100}
            style={{ width: "100%" }}
            step={0.01}
            value={num17}
            onChange={this.modify_lever}
            precision={2}
          />
          <Slider marks={(() => {
            let max_l = ''
            if (this.props.ctype === '0') {
              max_l = this.props.pc_account.ask_max_leverage
            } else {
              max_l = this.props.pc_account.bid_max_leverage
            }
            return {
              [max_l / max_l / 100]: max_l / max_l / 100 + "X",
              [max_l * 1 / 5]:max_l * 1 / 5 + ".00X",
              [max_l * 2 / 5]:max_l * 2 / 5 + ".00X",
              [max_l * 3 / 5]:max_l * 3 / 5 + ".00X",
              [max_l * 4 / 5]:max_l * 4 / 5 + ".00X",
              [max_l * 1]:max_l * 1+ ".00X",
            }
          })()} value={num17} min={0.01} step={0.01} max={
            (() => {
            let max_l = ''
            if (this.props.ctype === '0') {
              max_l = this.props.pc_account.ask_max_leverage
            } else {
              max_l = this.props.pc_account.bid_max_leverage
            }
            return max_l*1
          })()
          } tooltipVisible={1 == 2} onChange={this.modify_lever} />
          <div className="but0004-body-text">
            <p className="clear" style={{ float: "left", marginRight: 10 }}>
              <FormattedMessage id="Margin_required_for_current_position" defaultMessage={'当前仓位所需保证金'} />
              <span style={{ color: "#2E6BE6" }}>
                {
                  this.calculate_margin()
                }
              </span>
              <span>BTC</span>
            </p>
            <p style={{ float: "left" }}>
              <FormattedMessage id="Current_leverage_multiples_up_to" defaultMessage={'当前杠杆倍数最高可开'} />
              <span>
                <span style={{ color: "#2E6BE6" }}>
                  {
                    max_leverage ? max_leverage : "0"
                  }
                </span>
                <FormattedMessage id="Zhang" defaultMessage={'张'} /></span>
            </p>
          </div>
        </Modal>
      </div>
    );
  }
}

// MoreLeverage.propTypes = {
//   Ctype: PropTypes.string
// };

export default MoreLeverage;



