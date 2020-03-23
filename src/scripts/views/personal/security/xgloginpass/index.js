import React, { Component } from 'react';
import './index.scss'
import { Input, Button } from 'antd';
import Biaoti from '../../componetn/biaoti';
import { history } from '@/utils/history'
import { hex_md5 } from '@/utils/md5'
import { Xfn } from '../../../../../utils/axiosfn';
import { openNotificationWithIcon } from '@/utils/NotificationCONF.js'
import lang from '@/utils/language';
var times
class xgloginpass extends Component {
  constructor() {
    super()
    this.state = {
      tou: lang().Modify_login_password,
      ypsd: "",
      xpsd: "",
      butFlg: true,
      xpsds: "",
      yzm: "",
      fasongzi: lang().Send_Verification_Code,
      timeFlg: true,
      yfs: "",
      pwd_level: ""
    }
  }
  ypsd = (val) => {
    if (val.target.value.indexOf(" ") != -1) { return false }
    if (val.target.value !== "" && this.state.xpsd !== "" && this.state.xpsds !== "" && this.state.yzm !== "") {
      this.setState({
        butFlg: false
      })
    } else {
      this.setState({
        butFlg: true
      })
    }
    this.setState({
      ypsd: val.target.value
    })
  }
  xpsd = (val) => {
    if (val.target.value.indexOf(" ") != -1) { return false }
    if (val.target.value !== "" && this.state.ypsd !== "" && this.state.xpsds !== "" && this.state.yzm !== "") {
      this.setState({
        butFlg: false
      })
    } else {
      this.setState({
        butFlg: true
      })
    }
    //必须包含数字，大写字母，小写字母，特殊字符四选三
    var reg = /^\d{1,}$/
    var strongRegex = new RegExp('^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$')//强
    var mediumRegex = new RegExp(reg) //中
    let a = null
    if (mediumRegex.test(val.target.value)) { a = "1" } else {
      a = "2"
    }
    if (strongRegex.test(val.target.value)) { a = "3" }
    this.setState({
      xpsd: val.target.value,
      pwd_level: a
    })
  }
  xpsds = (val) => {
    if (val.target.value.indexOf(" ") != -1) { return false }
    if (val.target.value !== "" && this.state.ypsd !== "" && this.state.xpsd !== "" && this.state.yzm !== "") {
      this.setState({
        butFlg: false
      })
    } else {
      this.setState({
        butFlg: true
      })
    }
    this.setState({
      xpsds: val.target.value
    })
  }
  yzm = (val) => {
    let value = val.target.value
    value = value.replace(/\D/g, '')
    if (value !== "" && this.state.xpsd !== "" && this.state.ypsd !== "" && this.state.xpsds !== "") {
      this.setState({
        butFlg: false
      })
    } else {
      this.setState({
        butFlg: true
      })
    }
    this.setState({
      yzm: value
    })
  }
  fasongyanz = () => {
    const obj = {
      time: new Date().getTime().toString()
    }
    let time = 60
    this.setState({
      timeFlg: false,
      fasongzi: 60
    })
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
    Xfn({
      _u: "send_chang_login_pwd_sms",
      _m: "post",
      _p: obj
    }, (res, code) => {
      if (code == 0) {
        if (res.data.data.notify_address.indexOf("@") == -1) {
          this.setState({
            yfs: <span><span style={{ color: "rgb(189, 179, 179)", marginRight: 5 }}>{
              lang().has_been_sent}</span>{res.data.data.notify_address.substr(0, 3) + "****" + res.data.data.notify_address.substr(-4)}</span>
          })
        } else {
          let a = res.data.data.notify_address.replace(/\"/g, "")
          this.setState({
            yfs: <span><span style={{ color: "rgb(189, 179, 179)", marginRight: 5 }}>{
              lang().has_been_sent}</span> <span>
                {a.substr(0, 3) + "****"}
              </span>
              <span>
                {a.split("@")[1]}
              </span></span>
          })
        }
        // let time = 60
        // this.setState({
        //   timeFlg: false,
        //   fasongzi: 60
        // })
        // times = setInterval(() => {
        //   console.log(time)
        //   time = time - 1
        //   this.setState({
        //     fasongzi: time
        //   })
        //   if (time === 0) {
        //     clearInterval(times)
        //     this.setState({
        //       timeFlg: true,
        //       fasongzi: lang().Send_Verification_Code
        //     })
        //   }
        // }, 1000)
      }
    }, lang().Verification_code_sent_successfully)
  }
  aonsubmi = () => {
    if (this.state.xpsd.length < 6) { return openNotificationWithIcon("opne-error", lang().Error, lang().PasswordCannotBeLessThan6Digits) }
    if (this.state.xpsd.length > 20) { return openNotificationWithIcon("opne-error", lang().Error, lang().PasswordCannotBeGreaterThan20Digits) }
    if (this.state.xpsd === this.state.xpsds) {
      const obj = {
        old_pwd: hex_md5(this.state.ypsd),
        new_pwd: hex_md5(this.state.xpsd),
        confirm_pwd: hex_md5(this.state.xpsds),
        sms_code: this.state.yzm,
        pwd_level: this.state.pwd_level,
        time: new Date().getTime().toString()
      }
      Xfn({
        _m: "post",
        _u: "change_login_pwd",
        _p: obj
      }, (res, code) => {
        if (code == 0) {
          history.push('/personal/security/index')
        }
      })
    } else {
      openNotificationWithIcon("opne-error", lang().Error, lang().Inconsistent_passwords_entered)
    }
  }
  componentWillUnmount() {
    clearInterval(times)
  }
  render() {
    const { tou, butFlg, yfs, ypsd, xpsd, xpsds, yzm } = this.state
    return (
      <div className="xgloginpass-warp">
        <Biaoti flg={false} title={tou} ></Biaoti>
        <div className="cengdlk-wgr">
          <div className="lebal clear" style={{ marginTop: 24 }}>
            <span>{lang().Original_password}</span>
            <Input onChange={this.ypsd} type="password" value={ypsd} placeholder={lang().Please_input_a_password} style={{ width: 340, height: 42 }} />
          </div>
          <div className="lebal clear" style={{ marginTop: 12 }}>
            <span>{lang().New_password}</span>
            <Input onChange={this.xpsd} type="password" value={xpsd} placeholder={lang().Please_input_a_password} style={{ width: 340, height: 42, float: "left", marginRight: 10 }} />
          </div>
          <div className="lebal clear" style={{ marginTop: 12 }}>
            <span>{lang().Confirm_the_new_password}</span>
            <Input onChange={this.xpsds} type="password" value={xpsds} placeholder={lang().Please_input_a_password} style={{ width: 340, height: 42, float: "left", marginRight: 10 }} />
          </div>

          <div className="lebal clear" style={{ marginTop: 12 }}>
            <span>{lang().Short_Message_Verification_Code}</span>
            <Input onChange={this.yzm} value={yzm} placeholder={lang().Please_enter_the_verification_code} style={{ width: 200, height: 42, float: "left", marginRight: 10 }} />
            <Button disabled={!this.state.timeFlg} onClick={this.fasongyanz} type="primary" style={{ width: 130, height: 42, float: "left" }}>{this.state.fasongzi}</Button>
            <span style={{ width: 300 }}>{yfs}</span>
          </div>
          <Button disabled={butFlg} onClick={this.aonsubmi} type="primary" style={{ width: 340, height: 42, float: "left", marginLeft: 120, marginTop: 40 }}>{lang().confirm}</Button>
        </div>
      </div>
    );
  }
}

export default xgloginpass;