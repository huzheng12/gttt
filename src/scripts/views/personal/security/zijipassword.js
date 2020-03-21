import React, { Component } from 'react';
import './index.scss'
import { Button } from 'antd';
import Biaoti from '../componetn/biaoti';
import { history } from '@/utils/history'
import lang from '@/utils/language';
import { hex_md5 } from '@/utils/md5'
import { Input_A_B, Input_A_B_C } from '../../../components/A_Input_a_b';
import { Xfn } from '../../../../utils/axiosfn';
import { openNotificationWithIcon } from '@/utils/NotificationCONF';
var times
class ZjAssembly extends Component {
  constructor() {
    super()
    this.state = {
      tou: lang().Modify_fund_password,
      ypsd: "",
      xpsd: "",
      xpsds: "",
      yzm: "",
      butFlg: true,
      fasongzi: lang().Send_Verification_Code,
      timeFlg: true,
      timeFlgs: true,
      sty: null
    }
  }
  componentWillUnmount() {
    clearInterval(times)
  }
  ypsd = (val) => {
    if (val.target.value.indexOf(" ") != -1) { return false }
    this.setState({
      ypsd: val.target.value
    })
  }
  xpsd = (val) => {
    if (val.target.value.indexOf(" ") != -1) { return false }
    this.setState({
      xpsd: val.target.value
    })
  }
  xpsds = (val) => {
    if (val.target.value.indexOf(" ") != -1) { return false }
    this.setState({
      xpsds: val.target.value
    })
  }
  yzm = (val) => {
    let value = val.target.value
    value = value.replace(/\D/g, '')
    this.setState({
      yzm: value
    })
  }
  fasongyanz = () => {
    if(!this.state.timeFlgs){
      return false
    }
    this.setState({
      timeFlgs:false
    })
    Xfn({
      _u: this.props.type == "1" ? "sendResetFundpwdSms" : "send_change_fundpwd_sms",
      _p: {
        time: new Date().getTime().toString()
      },
      _m: "post"
    }, (res, code) => {
      if (code == 0) {
        let time = 60
        this.setState({
          timeFlg: false,
          timeFlgs:true,
          fasongzi: 60
        })
        if (res.data.data.notify_address.indexOf("@") == -1) {
          this.setState({
            sty: <span style={{ width: 300, textAlign: "left" }}><span style={{ color: "rgb(189, 179, 179)", marginRight: 5 }}>{
              lang().has_been_sent}</span>{res.data.data.notify_address.substr(0, 3) + "****" + res.data.data.notify_address.substr(-4)}</span>
          })
        } else {
          let a = res.data.data.notify_address.replace(/\"/g, "")
          this.setState({
            sty: <span style={{ width: 300, textAlign: "left" }}><span style={{ color: "rgb(189, 179, 179)", marginRight: 5 }}>{
              lang().has_been_sent}</span> <span>
                {a.substr(0, 3) + "****"}
              </span>
              <span>
                {a.split("@")[1]}
              </span></span>
          })
        }
        times = setInterval(() => {
          time = time - 1
          this.setState({
            fasongzi: time
          })
          if (time === 0) {
            clearInterval(times)
            this.setState({
              timeFlg: true,
              fasongzi: lang().Send_Verification_Code
            })
          }
        }, 1000)

      }
    }, lang().Verification_code_sent_successfully)
  }
  aonsubmi = () => {
    const obj = {
      a: {
        old_fund_pwd: hex_md5(this.state.ypsd),
        fund_pwd: hex_md5(this.state.xpsd),
        confirm_pwd: hex_md5(this.state.xpsds),
        sms_code: this.state.yzm,
        time: new Date().getTime().toString()
      },
      b: {
        fund_pwd: hex_md5(this.state.xpsd),
        confirm_pwd: hex_md5(this.state.xpsds),
        sms_code: this.state.yzm,
        time: new Date().getTime().toString()
      },
    }
    if (this.state.xpsd.length < 6) { return openNotificationWithIcon("opne-warning", lang().warning, lang().PasswordCannotBeLessThan6Digits) }
    if (this.state.xpsd.length > 20) { return openNotificationWithIcon("opne-warning", lang().warning, lang().PasswordCannotBeGreaterThan20Digits) }
    if (this.state.xpsd === this.state.xpsds) {
      Xfn({
        _u: this.props.type == "1" ? 'resetFundPwd' : 'change_fund_pwd',
        _m: "post",
        _p: this.props.type == "1" ? obj.b : obj.a
      }, (res, code) => {
        if (code == 0) {
          history.push('/personal/security/index')
        }
      })
    } else {
      openNotificationWithIcon("opne-warning", lang().warning, lang().Two_password_entries_are_inconsistent)
    }
  }
  render() {
    const { tou, sty, xpsds, xpsd, yzm, ypsd } = this.state
    const { type } = this.props
    return (
      <div className="xgloginpass-warp">
        <Biaoti flg={(() => {
          if (type == "1") {
            return true
          }
          return false
        })()} title={tou} content={lang().No_withdrawal_within_24_hours_after_changing_the_fund_password} ></Biaoti>
        <div className="cengdlk-wgr">
          {
            (() => {
              if (type !== "1") {
                return <Input_A_B onChange={this.ypsd} avalue={ypsd} placeholder={lang().Please_input_a_password} title={lang().Original_password}></Input_A_B>
              }
            })()
          }
          <Input_A_B type="password" onChange={this.xpsd} avalue={xpsd} placeholder={lang().Please_input_a_password} title={lang().New_password}></Input_A_B>
          <Input_A_B onChange={this.xpsds} avalue={xpsds} placeholder={lang().Please_input_a_password} title={lang().Confirm_the_new_password}></Input_A_B>
          <Input_A_B_C
            onChange={this.yzm}
            avalue={yzm}
            title={lang().Short_Message_Verification_Code}
            butContent={this.state.fasongzi}
            disabled={!this.state.timeFlg}
            placeholder={lang().Please_enter_the_verification_code}
            onClick={this.fasongyanz}
            sty={sty}
          />
          <Button disabled={(() => {
            if (type == "1") {
              if (xpsd != "" && xpsds != "" && yzm != "") {
                return false
              }
              return true
            } else {
              if (xpsd != "" && xpsds != "" && yzm != "" && ypsd != "") {
                return false
              }
              return true
            }
          })()} onClick={this.aonsubmi} type="primary" style={{ width: 340, height: 42, float: "left", marginLeft: 120, marginTop: 40 }}>{lang().confirm}</Button>
        </div>
      </div >
    );
  }
}

export default ZjAssembly;