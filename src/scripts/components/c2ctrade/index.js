import React, { Component } from 'react'
import { Input, Button } from 'antd';
import { Xfn } from '../../../utils/axiosfn';
import { numberHandle } from '../../../utils/numberHandle';
import C2cModalarr from '../c2cmodalarr';
import { openNotificationWithIcon } from '../../../utils/NotificationCONF';
class C2Ctrade extends Component {
  constructor() {
    super()
    this.state = {
      input_val1: null,
      input_val2: null,
      authrenzzData: null,
      visible1: false,
      title: "",
      okText: "",
      okTextUrl: "",
      c2ccardQueryData: [],
      JsonObj: {

      },
      isokflg:true
    }
  }

  // 查询是否绑定银行卡
  c2ccardQueryFn = () => {
    Xfn({
      _u: 'c2ccard_query',
      _m: "get",
      _p: {

      }
    }, (res, code) => {
      if (code === 0) {
        this.setState({
          c2ccardQueryData: res.data.data.rows
        })
      }
    })
  }
  authrenzzFn = () => {
    Xfn({
      _u: 'authrenzz',
      _m: "get",
      _p: {

      }
    }, (res, code) => {
      if (code === 0) {
        this.setState({
          authrenzzData: res.data.data
        })
      }
    })
    // "time": "1565607559837",   //服务器返回数据的时间
    // "identity_auth": "1",      //身份认证 1.认证,0.未认证
    // "short_msg_auth": "1",     //短信认证
    // "google_auth": "1",        //谷歌认证
    // "mail_auth": "1",          //邮箱认证
    // "fund_pwd_auth": "1"       //资金账户密码认证
  }
  componentDidMount() {
    this.authrenzzFn()
    this.c2ccardQueryFn()
  }
  money = (type) => {
    const {
      authrenzzData, c2ccardQueryData
    } = this.state
    if (!this.state.input_val1) {
      return openNotificationWithIcon("opne-warning", "警告", "请输入金额和数量")
    }

    if (type !== 1) {
      if (authrenzzData.identity_aut === '0') {
        this.setState({
          visible1: true,
          title: "您当前尚未实名认证，请前往实名认证",
          okTextUrl: "/personal/grsecurity",
          okText: "立即前往",
        })
        return false
      }
      // if (authrenzzData.short_msg_auth === '0') {//手机
      //   this.setState({
      //     visible1: true,
      //     title: "您当前尚未绑定手机，请前往绑定",
      //     okTextUrl: "/personal/security/szphone",
      //     okText: "立即设置",
      //   })
      //   return false
      // }
      if (authrenzzData.fund_pwd_auth === '0') {
        this.setState({
          visible1: true,
          title: "为了您的账户安全，请立即设置资金密码",
          okTextUrl: "/personal/security/zjpass",
          okText: "立即设置",
        })
        return false
      }
      if (c2ccardQueryData.length === 0) {
        this.setState({
          visible1: true,
          title: "您当前尚未绑定银行卡，请前往绑定",
          okTextUrl: "/C2Cdeal/receivingset",
          okText: "立即前往",
        })
        return false
      }
      const JsonObj = {
        source_asset: this.props.target_asset_data,// 原资产 必填
        target_asset: this.props.source_asset_data,// 兑换资产 必填
        quote_asset: "USDT",// 兑换量的计价资产 必填
        volume: this.state.input_val1,// 兑换量 必填
      }
      this.setState({
        visible1: true,
        title: null,
        okText: "确定",
        JsonObj: {
          source_asset: this.props.target_asset_data,// 原资产 必填
          target_asset: this.props.source_asset_data,// 兑换资产 必填
          quote_asset: "USDT",// 兑换量的计价资产 必填
          volume: this.state.input_val2,// 兑换量 必填
        }
      })
    } else {
      if(!this.state.isokflg){
        return
      }
      this.setState({
        isokflg:false
      })
      const obj = {
        source_asset: this.props.source_asset_data,// 原资产 必填
        target_asset: this.props.target_asset_data,// 兑换资产 必填
        quote_asset: this.props.source_asset_data,// 兑换量的计价资产 必填
        volume: this.state.input_val1,// 兑换量 必填
      }
      Xfn({
        _u: type === 1 ? "c2c_money_in" : "c2c_money_out",
        _m: "post",
        _p: obj
      }, (res, code) => {
        if (code === 0) {
          window.open(res.data.data.url);
          this.setState({
            isokflg:true
          })
        }
      })
    }
  }
  value1Input = (value) => {
    if (!this.props.exchange_rate_data) { return false }
    value = value.target.value
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = String(value).replace(/^(.*\..{2}).*$/, "$1")
    let exchange_rate = null
    if (this.props.type === 1) {
      exchange_rate = 1 / this.props.exchange_rate_data.exchange_rate + this.props.exchange_rate_data.fee * 1
    } else {
      exchange_rate = 1 / this.props.exchange_rate_data.exchange_rate - this.props.exchange_rate_data.fee * 1
    }
    this.setState({
      input_val1: value,
      input_val2: (value / exchange_rate).toFixed(2)
    })
  }
  value2Input = (value) => {
    if (!this.props.exchange_rate_data) { return false }
    value = value.target.value
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = String(value).replace(/^(.*\..{2}).*$/, "$1")
    let exchange_rate = null
    if (this.props.type === 1) {
      exchange_rate = 1 / this.props.exchange_rate_data.exchange_rate + this.props.exchange_rate_data.fee * 1
    } else {
      exchange_rate = 1 / this.props.exchange_rate_data.exchange_rate - this.props.exchange_rate_data.fee * 1
    }
    if (value >= 0 && value[0] != "0") {
      this.setState({
        input_val1: (value * exchange_rate).toFixed(2),
        input_val2: value
      })
    }
  }
  render() {
    const {
      type, exchange_rate_data
    } = this.props
    const {
      input_val1,
      input_val2,
      title,
      visible1,
      okText,
      okTextUrl,
      JsonObj
    } = this.state
    console.log(exchange_rate_data)
    // time: "1578637287372"
    // fee: "0.03"
    // source_asset: "CNY"
    // target_asset: "USDT"
    // exchange_rate: "0.1443"
    return (
      <div className="c2ctrade_warp">
        <div className="title_box" style={{ color: type === 1 ? "" : "#E53F39" }}>
          {
            type === 1 ? '买入USDT' : "卖出USDT"
          }
        </div>
        <div className="content_box">
          <div className="input_box">
            <div>
              {
                type === 1 ? '买入估价(CNY)' : "卖出估价(CNY)"
              }
            </div>
            <div>{
              (() => {
                if (exchange_rate_data) {
                  if (type === 1) {
                    return numberHandle((1 / exchange_rate_data.exchange_rate + exchange_rate_data.fee * 1), 2, 2)
                  } else {
                    return numberHandle((1 / exchange_rate_data.exchange_rate - exchange_rate_data.fee * 1), 2, 2)
                  }
                } else {
                  return 0
                }
              })()
            }</div>
          </div>
          <Input value={input_val1} placeholder="金额(CNY)" className="input_c2c_a" onChange={this.value1Input} />
          <Input value={input_val2} onChange={this.value2Input} placeholder={
            type === 1 ? '买入量(USDT)' : "卖出量(USDT)"
          } />
          <Button onClick={() => this.money(type)} className={type === 1 ? "butgg lvse" : "butgt bgred"} type="primary" style={{
            backgroundColor: type === 1 ? '#26994E' : "#E53F39"
          }}>

            <div style={{ fontSize: 16, color: "#fff" }}>
              {
                type === 1 ? '买入' : "卖出"
              }
            </div>
          </Button>
          <div className="footer_box">
            <div className="c2c_span1">
              支付方式：
            </div>
            <div className="c2c_span2" style={{ marginLeft: 5 }}>
              <i className="iconfont iconicon-test2"></i>
              <span className="spanc2ca">
                支付宝
              </span>
            </div>
            <div className="c2c_span2">
              <i className="iconfont iconicon-test4"></i>
              <span className="spanc2ca">
                银行卡
              </span>
            </div>
            <div className="c2c_span3" onClick={() => {
              window.open("https://gtehelp.zendesk.com/hc/zh-cn/articles/360041278154")
            }}>
              《交易须知》
            </div>
          </div>
        </div>
        <C2cModalarr JsonObj={JsonObj} okText={okText} okTextUrl={okTextUrl} title={title} visible1={visible1} _this={this}></C2cModalarr>
      </div>
    )
  }
}
export default C2Ctrade