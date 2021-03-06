import React, { Component } from 'react'
import LoginPhoneEmail from '../../../components/login'
import { FormattedMessage } from 'react-intl';
import {
  Tooltip, Button,
  Modal,
  Slider,
  InputNumber
} from 'antd';
import { openNotificationWithIcon } from '../../../../utils/NotificationCONF';
import Modeltrund from './modeltrund';
import { Xfn } from '../../../../utils/axiosfn';
import { connect } from "react-redux";
import store from '../../../store';
import { history } from '@/utils/history'
import number_format from '../../../../utils/renyinumber';

var nnn = 5



const marks = {
  0: '0',
  0.2: '',
  0.4: "",
  0.6: "",
  0.8: "",
  1: "100%",

};
@connect(
  state => {
    return {
      bbasset: state.bbdata.bbasset,
      bbaymbol: state.bbdata.bbaymbol,
      bb_account_exp: state.bbdata.bb_account_exp,
      order_bookshu: state.bbdata.order_bookshu,
      bborder_book: state.bbdata.bborder_book,
      bborder_book_data_one: state.bbdata.bborder_book_data_one,
      bborder_book_data_teo: state.bbdata.bborder_book_data_teo,
      bborder_book_data_teoo: state.bbdata.bborder_book_data_teoo,
      bbinstrument: state.bbdata.bbinstrument,
      bb_old_account_exp: state.bbdata.bb_old_account_exp,
    }
  }
)
class Singlebox extends Component {
  constructor() {
    super()
    this.state = {
      pricedata: 0,
      lotdata: "",
      visible: false,
      available: {},
      num17: "",
      aaa: 100,
      isOk: false,
      tanasset: "",
      visibleIsok: true,
      zjzhfangxiang: "1",
      zjzhfangxiangchu: "3",
    }
  }
  priceFn = (e) => {
    store.dispatch({ type: "paricefn", data: '' })
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    var n = this.props.bbinstrument.price_precision * 1
    var numdd = new RegExp(`^(.*\\..{${n}}).*$`)
    value = value.replace(numdd, "$1")
    // console.log(n,value)
    if (value * 1 > 1000000) {
      this.setState({
        pricedata: "1000000"
      })
      return openNotificationWithIcon("opne-warning", "警告", "价格不能超过1000000")
    }
    this.setState({
      pricedata: value,
      isOk: true,
    })
  }
  lotFn = (e) => {
    let value = e.target.value;
    var n = this.props.bbinstrument.number_precision * 1
    var numdd = new RegExp(`^(.*\\..{${n}}).*$`)
    value = value.replace(numdd, "$1")
    if (value * 1 > 100000000) {
      this.setState({
        lotdata: "100000000"
      })
      return openNotificationWithIcon("opne-warning", "警告", "数量不能超过100000000")
    }

    this.setState({
      lotdata: value.replace(/[^0-9-.]+/, '')
    })
  }
  bboaccountavailablefn = (type, data) => {
    Xfn({
      _u: "bboaccountavailable",
      _m: "get",
      _p: {
        asset: data ? data : this.props.bbasset,
        account_type: type
      }
    }, (res, code) => {
      if (code !== 0) {
        return false
      }
      this.setState({
        available: res.data.data
      })
    })
  }
  // 点击划转
  visibleFn = (flg, type, data) => {
    if (data) {
      this.setState({
        tanasset: data
      })
    }
    // type ===1  点击划转
    if (type === 1) {
      this.bboaccountavailablefn('1', data)
    } else if (type === 2) {

    }
    if (flg) {
      this.setState({
        visibleIsok: false
      })
    } else {
      this.setState({
        visibleIsok: true
      })
    }
    this.setState({
      visible: flg,
      zjzhfangxiang: "1",
      zjzhfangxiangchu: "3",
    })
  }
  create = () => {
    if (this.state.isOk ? this.state.pricedata == 0 : this.props.bborder_book_data_one == 0) {
      return openNotificationWithIcon("opne-warning", "警告", '请输入正确的价格')
    }
    if (!this.state.lotdata) {
      return openNotificationWithIcon("opne-warning", "警告", '请输入正确的数量')

    }
    Xfn({
      _u: "bbordercreate",
      _m: "post",
      _p: {
        // isOk ? pricedata : bborder_book_data_one
        asset: this.props.bbasset,// 资产 USD,必填
        symbol: this.props.bbaymbol,// 交易对,必填
        bid_flag: this.props.type,// 1.买入,0.卖出,必填
        price: this.state.isOk ? this.state.pricedata : this.props.bborder_book_data_one,// 价格, 非必填 , order_type是1必填 ,
        qty: this.state.lotdata,// 数量,必填
        order_type: '1',// 委托类型,1:限价,必填
      }
    }, (res, code) => {
      if (code === 0) {
      }
    }, '下单成功')
  }
  formatter = (value) => {
    return `${value}%`;
  }
  modify_lever = (val) => {
    if (localStorage.userInfo&&this.props.bb_account_exp.available) {

    } else {
      return false
    }
    if (this.props.type !== '1') {
      if (val === 0) {
        this.setState({
          num17: val,
          lotdata: 1
        })
      } else {
        var n = this.props.bbinstrument.number_precision * 1
        var numdd = new RegExp(`^(.*\\..{${n}}).*$`)
        let value = String(this.props.bb_old_account_exp.available * val).toString().replace(numdd, "$1")
        this.setState({
          num17: val,
          lotdata: value
        })
      }
      return false
    }
    if (val === 0) {
      this.setState({
        num17: val,
        lotdata: 1
      })
    } else {
      var n = this.props.bbinstrument.number_precision * 1
      var numdd = new RegExp(`^(.*\\..{${n}}).*$`)
      let value = String(this.props.bb_account_exp.available / this.props.bbinstrument.last_price * val ).toString().replace(numdd, "$1")
      this.setState({
        num17: val,
        lotdata: value
      })
    }

  }

  componentDidUpdate() {
    if (this.props.bborder_book_data_teo && this.props.bborder_book_data_teoo) {
      store.dispatch({ type: "paricefn", data: this.props.bborder_book_data_teo, isof: false })

      this.setState({
        pricedata: this.props.bborder_book_data_teo,
        isOk: true
      })
    }
  }
  render() {
    const {
      num17, pricedata, lotdata, visible, available, isOk, tanasset
    } = this.state
    const {
      type, bb_old_account_exp, bb_account_exp, bborder_book_data_one, bbinstrument
    } = this.props
    return (
      <div className="single_warp">
        <div className="xiaotitle">
          <div className="kyye_box">
            可用余额:
         </div>
          <div className="data_box_span">
            {
              (() => {
                if (localStorage.userInfo) {
                  if (type === '1') {
                    if (!bb_account_exp.available) {
                      return '--'
                    }
                    return number_format(bb_account_exp.available, 4, ".", ",")
                  } else {
                    if (!bb_old_account_exp.available) {
                      return '--'
                    }
                    switch (bbinstrument.symbol && bbinstrument.symbol.split(bbinstrument.split_char)[0]) {
                      case 'BTC':
                        return number_format(bb_old_account_exp.available, 8, ".", ",")
                      default:
                        return number_format(bb_old_account_exp.available, 4, ".", ",");
                    }
                  }
                } else {
                  return '--'
                }
              })()
            }
            {
              type === '1' ? " USDT" : " " + (bbinstrument.symbol ? bbinstrument.symbol.split(bbinstrument.split_char)[0] : "BTC")
            }
          </div>
          <div className="but_huazhuan" onClick={() => this.visibleFn(true, 1, type === '1' ? "USDT" : (bbinstrument.symbol && bbinstrument.symbol.split(bbinstrument.split_char)[0]))}>
            划转{
              type === '1' ? "USDT" : (bbinstrument.symbol && bbinstrument.symbol.split(bbinstrument.split_char)[0])
            }
          </div>
        </div>

        <LoginPhoneEmail

          phoneValue={isOk ? pricedata : bborder_book_data_one

          }
          phoneOnChange={this.priceFn}
          type={'3'}
          prefix={<span>价格</span>}
          suffix={
            <Tooltip className="tooltip-001">
               (USDT)
            </Tooltip>
          }
        />
        <LoginPhoneEmail
          phoneValue={lotdata}
          phoneOnChange={this.lotFn}
          type={'3'}
          prefix={<span>数量</span>}
          suffix={
            <Tooltip className="tooltip-001">
              <span>
              ({
            (bbinstrument.symbol ? bbinstrument.symbol.split(bbinstrument.split_char)[0] : "BTC")
          })
              </span>
            </Tooltip>
          }
        />

        <Slider tipFormatter={this.formatter} marks={marks} value={num17} min={0} step={0.01} max={1} tooltipVisible={1 == 2} onChange={this.modify_lever} />
        {
          localStorage.userInfo ? <Button onClick={this.create} className={"button-00010" + (type === '1' ? ' butgg lvse' : ' butgt bgred')} type="primary"  >
            {
              type === '1' ?<div style={{fontSize:16,fontWeight:900}}>
{
   "买入" + (bbinstrument.symbol ? bbinstrument.symbol.split(bbinstrument.split_char)[0] : 'BTC')
}
              </div> :<div style={{fontSize:16,fontWeight:900}}>
                {
                  "卖出" + (bbinstrument.symbol ? bbinstrument.symbol.split(bbinstrument.split_char)[0] : "BTC")
                }
              </div> 
            }
          </Button> : <div className="userInfowei">
              <div className="userInfowei1" onClick={() => { history.push('/login') }}><FormattedMessage id="Sign_in" defaultMessage={'登录'} /></div>
              <div >&nbsp; 或 &nbsp;</div>
              <div className="userInfowei1" onClick={() => { history.push('/register') }}><FormattedMessage id="register" defaultMessage={'注册'} /></div>

            </div>
        }
        <div className="foot_box">
          <span className="span3">
            {
              type === '1' ? "可买(" + (bbinstrument.symbol ? bbinstrument.symbol.split(bbinstrument.split_char)[0] : "BTC") + "):" : "可卖(USDT):"
            }

          </span>
          <span>
            {
              (() => {
                var n = this.props.bbinstrument.number_precision * 1
                var numdd = new RegExp(`^(.*\\..{${n}}).*$`)
                if (!bb_account_exp.available || !bbinstrument.last_price) {
                  return '--'
                }
                return type === '1' ? (bb_account_exp.available / bbinstrument.last_price).toString().replace(numdd, "$1") :
                  (bb_old_account_exp.available * bbinstrument.last_price).toString().replace(numdd, "$1")
              })()
            }
          </span>
        </div>
        <Modeltrund
          bboaccountavailablefn={this.bboaccountavailablefn}
          available={available}
          asset={tanasset}
          visible={visible}
          visibleFn={this.visibleFn}
          _this={this}
        >
        </Modeltrund>
      </div>
    )
  }
}
export default Singlebox