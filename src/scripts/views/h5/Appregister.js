import React, { Component } from 'react';
import './index.scss'
import { Select, Input, Checkbox, Button } from 'antd';
import { Xfn } from '../../../utils/axiosfn';
import { history } from '@/utils/history'
import lang from '@/utils/language';
import { hex_md5, hex_hmac_md5 } from '@/utils/md5'
const { Option } = Select;

var times
class Appregister extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        logo_img: require('./img/xiazai_logo.png'),
        xiazai_img01: require('./img/xiazai_img01.png'),
        xiazai_img02: require('./img/xiazai_img02.png'),
        xiazai_img03: require('./img/yaoqing_zhuce_icon01.png'),
        but_ios01: require('./img/yaoqing_zhuce_icon02.png'),
        but_ios02: require('./img/yaoqing_zhuce_icon02(1).png'),
        checkbox_no: require('./img/checkbox_no.png'),
        checkbox_yes: require('./img/checkbox_yes.png'),
      },
      qiehuanclass: "action_pone",
      qiehuanclass1: "",
      area: [],
      phoneflg: true,
      area_code: "86",
      phone: "",
      verify_code: "",
      referrer_id: "Y12F32",
      password: "",
      confirm_pwd: "",
      checkbox: false,
      butflg: true,
      pwd_level: "",
      butName: "发送",
      timeFlg: true,
      language: "zh",


    }
  }
  componentDidMount() {
    this.setState({
      language: navigator.language
    })
    function IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    }

    var flag = IsPC();//true为PC端，false为手机端
    if (flag) {
      history.push('/register?' + this.props.match.params.name)
    }
    this.setState({
      referrer_id: this.props.match.params.name
    })
    document.getElementsByTagName("body")[0].id = "h5html"
    Xfn({
      _u: "area",
      _m: "post",
      _p: {

      }
    }, (res, code) => {
      if (code == 0) {
        console.log(res)
        this.setState({
          area: res.data.data.area
        })
      }
    })
  }
  componentWillUnmount() {
    document.getElementsByTagName("body")[0].id = ""
  }
  code_area = (val) => {//区号
    this.setState({
      area_code: val
    })
  }
  phone = (val) => {
    console.log(val)
    this.setState({
      phone: val.target.value
    })
  }
  verify_code = (val) => {
    this.setState({
      verify_code: val.target.value
    })
  }
  password = (val) => {
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
      password: val.target.value,
      pwd_level: a
    })
  }
  confirm_pwd = (val) => {
    this.setState({
      confirm_pwd: val.target.value
    })
  }
  checkbox = (val) => {
    console.log(val.target.checked)
    this.setState({
      checkbox: val.target.checked
    })
  }
  code_verification = () => {
    if (!this.state.timeFlg) { return false }
    var objphone = {
      area_code: this.state.area_code,
      phone: this.state.phone
    }
    var objemail = {
      email: this.state.phone
    }
    if (this.state.phone) {
      Xfn({
        _u: this.state.phoneflg ? 'send_sms_verify_code' : 'send_email_verify_code',
        _m: 'post',
        _p: this.state.phoneflg ? objphone : objemail
      }, (res, code) => {
        if (code == 0) {
          let time = 60
          this.setState({
            timeFlg: false,
            butName: 60 + "s重新发送"
          })
          times = setInterval(() => {
            time = time - 1
            this.setState({
              butName: time + "s重新发送"
            })
            if (time === 0) {
              clearInterval(times)
              this.setState({
                timeFlg: true,
                butName: "发送"
              })
            }
          }, 1000)
        }
      })
    }
  }
  tijiao = () => {
    console.log(this.state.confirm_pwd)
    if (this.state.phoneflg) {
      Xfn({
        _u: 'register_by_phone',
        _m: "post",
        _p: {
          area_code: this.state.area_code,
          phone: this.state.phone,
          password: hex_md5(this.state.password),
          confirm_pwd: hex_md5(this.state.confirm_pwd),
          referrer_id: this.state.referrer_id,
          verify_code: this.state.verify_code,
          pwd_level: this.state.pwd_level
        },
      }, (res, code) => {
        if (code == 0) {
          function isAndroid() {
            var u = navigator.userAgent;
            if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
              return true;
            }
            return false;
          }
          // 判断设备为 iosa
          if (isAndroid() === true) {
            history.push('/h5androiddownload')
          } else {
            history.push('/h5iosdownload')
          }
        }
      })
    } else {
      Xfn({
        _u: "register",
        _m: 'post',
        _p: {
          email: this.state.phone,
          password: hex_md5(this.state.password),
          confirm_pwd: hex_md5(this.state.confirm_pwd),
          referrer_id: this.state.referrer_id,
          verify_code: this.state.verify_code,
          pwd_level: this.state.pwd_level
        }
      }, (res, code) => {
        if (code == 0) {

        }
      })
    }
  }
  render() {
    const {
      imgArr, qiehuanclass, qiehuanclass1, area, referrer_id, phone,
      verify_code, password, confirm_pwd, checkbox, butName, phoneflg, language
    } = this.state
    if (document.getElementById("launcher")) {
      document.getElementById("launcher").style.display = 'none'
    }
    return (
      <div className="appregister_warp">
        <header>
          <img className="logo_img" src={imgArr.logo_img} alt="" />
          <div className="h1_title">
            {
              lang(language).Global_leading_digital_contract_trading_platform
            }
          </div>
          <div className="sub_h3">
            {
              lang(language).Safety_stability_and_credibility
            }
          </div>
        </header>
        <main>
          <div className="zhuce">
            {
              lang(language).register
            }

          </div>
          <div className="title-qiehuan">
            <div className={qiehuanclass} onClick={() => {
              this.setState({
                qiehuanclass: 'action_pone',
                qiehuanclass1: "",
                phoneflg: true
              })
            }}>
              {
                lang(language).Mobile_phone
              }

            </div>
            <div className={qiehuanclass1} onClick={() => {
              this.setState({
                qiehuanclass: '',
                qiehuanclass1: "action_pone",
                phoneflg: false
              })
            }}>
              {
                lang(language).mailbox
              }

            </div>
          </div>
          <div className="p_input_form">
            {
              this.state.phoneflg ? <Select defaultValue="86" style={{ width: '1rem ' }} onChange={this.code_area}>
                {
                  area.map((item, index) => {
                    return <Option value={item.area_code} key={item + index}>{"+ " + item.area_code}</Option>
                  })
                }
              </Select> : ""
            }
            <Input placeholder={phoneflg ? lang(language).Please_enter_your_cell_phone_number : lang(language).Please_enter_your_mailbox} style={{ width: "70%" }} onChange={this.phone} />
          </div>
          <div className="p_input_form">
            <Input placeholder={phoneflg ? lang(language).Please_enter_the_mobile_phone_verification_code : lang(language).Please_enter_the_mobile_emai_verification_code} style={{ width: "70%" }} onChange={this.verify_code} /> <span className="spana_fasong" onClick={this.code_verification}>{
              butName}</span>
          </div>
          <div className="p_input_form">
            <Input placeholder={lang(language).Please_set_your_password} type="password" onChange={this.password} style={{ width: "70%" }} />
          </div>
          <div className="p_input_form">
            <Input placeholder={lang(language).Please_confirm_the_password} type="password" onChange={this.confirm_pwd} style={{ width: "70%" }} />
          </div>
          <div className="p_input_form">
            <Input style={{ width: "70%" }} disabled value={referrer_id} />
          </div>
          <div className="p_inputruandu">
            <Checkbox onChange={this.checkbox}>{lang(language).I_have_read_and_agreed}</Checkbox>
            <span class="spanxieyi">{lang(language).User_Agreement}</span>
          </div>
          <div className="p_inputruandu clear">
            <Button onClick={this.tijiao} type="primary" disabled={phone !== "" && verify_code !== "" && password !== "" && confirm_pwd !== "" && checkbox === true ? false : true}>
              <div>
                {
                  lang(language).register
                }
              </div>
            </Button>

          </div>
        </main>
        <footer>
          <div className="imgbg">
          </div>
          <div className="imgbgsizi">
            <div className="title">
              {
                lang(language).GTE_the_next_generation
              }
            </div>
            <div className="xobox">

              {
                lang(language).Welcome_to_the_most
              }

            </div>
            <img src={imgArr.xiazai_img03} className="anquankeyxing" alt="" />
            <div className="title-32x">
              {
                lang(language).Safe_and_reliable
              }
            </div>
            <div className="xobox">
              <li>
                {
                  lang(language).years_of_experience_in_digita
                }

              </li>
              <li>
                {
                  lang(language).Professional_distributed_architecture
                }

              </li>
            </div>
            <img src={imgArr.but_ios01} className="anquankeyxing" alt="" />
            <div className="title-32x">
              {
                lang(language).Sufficient_liquidity
              }
            </div>
            <div className="xobox">
              <li>
                {
                  lang(language).times_abundant_liquidity
                }

              </li>
              <li>
                {
                  lang(language).Meet_the_order_instantaneous_transaction
                }

              </li>
            </div>
            <img src={imgArr.but_ios02} className="anquankeyxing" alt="" />
            <div className="title-32x">

              {
                lang(language).Customer_first
              }
            </div>
            <div className="xobox">
              <li>
                {
                  lang(language).Establishing_the_mechanism
                }
              </li>
              <li>
                {
                  lang(language).Establishment_of_investor_protection_fund
                }
              </li>

            </div>
          </div>


        </footer>

      </div >
    );
  }
}

export default Appregister;