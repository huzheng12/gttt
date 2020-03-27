import React, { Component } from 'react';
import Biaoti from '../../componetn/biaoti';
import './index.scss'
import { Select, Input, Button, message } from 'antd';
import { history } from '@/utils/history'
import lang from '@/utils/language';
import { Xfn } from '../../../../../utils/axiosfn';
import store from '@/scripts/store.js'
import { openNotificationWithIcon } from '../../../../../utils/NotificationCONF';
// import { Link } from "react-router-dom";


var times
const { Option } = Select;
class Szphone extends Component {
  constructor() {
    super()
    this.state = {
      tiele: lang().It_is_forbidden_to_withdraw_money_within,
      tou: lang().Set_mobile_number,
      area: [],
      area_code: "86",
      phoneInp: "",
      butFlg: true,
      msgPhone: "",
      errcolor: "",
      yzmInp: "",
      yfs1: "",
      fasongzi: lang().Send_Verification_Code,
      timeFlg: true
    }
  }
  guojixuanze = (value) => {
    this.setState({
      area_code: value
    })
  }
  axisosubmit = () => {
    Xfn({
      _u: "bindphone",
      _p: {
        area_code: this.state.area_code,
        phone: this.state.phoneInp,
        sms_code: this.state.yzmInp,
        time: new Date().getTime().toString()
      },
      _m: "post"
    }, (res, code) => {
      if (code == 0) {
        history.push('/personal/security/index')
        localStorage.userName = this.state.phoneInp
        store.dispatch({ type: 'headerZX', headerZX: "2" })
      }
    })
  }
  componentDidMount() {
    Xfn({
      _u: "area",
      _m: 'post',
      _p: {}
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          area: res.data.data.area
        })
      }
    })
  }
  xphone = (val) => {
    if (this.state.yzmInp !== "" && val.target.value !== "") {
      this.setState({
        butFlg: false
      })
    } else {
      this.setState({
        butFlg: true
      })
    }
    this.setState({
      phoneInp: val.target.value
    })
  }
  xphoneB = (cb) => {

    if (this.state.phoneInp != "") {
      if (cb) { cb() }
    }else{
      openNotificationWithIcon("opne-warning", "警告", "手机号不能为空")
    }
  }
  yzphone = () => {

    this.xphoneB(() => {
      let time = 60
      this.setState({
        timeFlg: false,
        fasongzi: 60
      })
      times = setInterval(() => {
        console.log(time)
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
        _u: "bdsjsend_bind_phone",
        _m: "post",
        _p: {
          area_code: this.state.area_code,
          phone: this.state.phoneInp,
          time: new Date().getTime().toString()
        }
      }, (res, code) => {
        if (code == 0) {
          if (res.data.data.notify_address) {

            const str = res.data.data.notify_address.substr(0, 3) + "****" + res.data.data.notify_address.substr(-4)
            this.setState({
              yfs1: <span><span style={{ color: "rgb(189, 179, 179)", marginRight: 5 }}>{lang().has_been_sent}</span>{str}</span>
            })
          }

         
        }
      }, lang().Verification_code_sent_successfully)
    })
  }
  yzmInp = (val) => {
    this.setState({
      yzmInp: val.target.value
    })
    if (this.state.phoneInp !== "" && val.target.value !== "") {
      this.setState({
        butFlg: false
      })
    } else {
      this.setState({
        butFlg: true
      })
    }
  }

  componentWillUnmount() {
    clearInterval(times)
  }
  render() {
    const { tiele, tou, area, area_code, phoneInp, butFlg, msgPhone, errcolor, yfs1 } = this.state
    return (
      <div className="xgphone-warp">
        <Biaoti content={tiele} flg={true} title={tou} ></Biaoti>
        <div className="cengdlk-wgr">
          <div className="lebal clear" style={{ marginTop: 24 }}>
            <span>{lang().nationality}</span>
            <Select defaultValue={area_code} style={{ width: 340 }} onChange={this.guojixuanze}>
              {
                area.map((item, index) => {
                  return (
                    <Option value={item.area_code} key={"_inde" + index}>{item.area_name + "+" + item.area_code}</Option>
                  )
                })
              }
            </Select>
          </div>
          <p></p>
          <div className="lebal clear">
            <span>{lang()['Cell-phone_number']}
            </span>
            <Input maxLength={11} value={phoneInp} onBlur={() => this.xphoneB()} onChange={this.xphone} placeholder={lang().Please_enter_your_cell_phone_number} style={{ width: 340, height: 42, borderColor: errcolor }} />
          </div>
          <p>{msgPhone}</p>
          <div className="lebal clear">
            <span>{lang().Short_Message_Verification_Code}</span>
            <Input onChange={this.yzmInp} placeholder={lang().Please_enter_the_verification_code} style={{ width: 200, height: 42, float: "left", marginRight: 10 }} />
            <Button disabled={!this.state.timeFlg}
              onClick={this.yzphone} type="primary"
              style={{ width: 130, height: 42, float: "left" }}>{this.state.fasongzi}</Button>
            <span style={{ width: 300 }}>{yfs1}</span>
          </div>
          <p></p>
          <Button disabled={butFlg} onClick={this.axisosubmit} type="primary"
            style={{ width: 340, height: 42, float: "left", marginLeft: 120, marginTop: 40 }}>{lang().confirm}</Button>
        </div>
      </div >
    );
  }
}

export default Szphone;