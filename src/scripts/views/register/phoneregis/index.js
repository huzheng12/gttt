import React, { Component } from 'react';
import './index.scss'
import {
  Button, Checkbox, message
} from 'antd';
import { api } from '@/utils/api.js'
import store from '@/scripts/store.js'
import { hex_md5 } from '@/utils/md5'
import {
  tokenfun
} from "@/scripts/action";
import axios from '@/utils/ajax'
import { history } from '@/utils/history'
import LoginPhoneEmail from '../../../components/login';
import { Xfn } from '../../../../utils/axiosfn';
import { zhutiyanzheng } from '../../../action';
import lang from '@/utils/language';
var times = null
class WrappedNormalregisterForm extends Component {
  constructor() {
    super()
    this.state = {
      area: [],//手机区号
      areas: "86",
      phone: false,
      pass: false,
      zpass: false,
      yanzengm: false,
      checkAll: true,
      timeFlg: true,
      butName: lang().Send_Verification_Code,
      valueErr: "", phoneOnChange: "",//手机号码
      yanzengmOnChange: "", yanzengmvalueErr: "",//验证码
      passOnChange: "", passValueErr: "",//密码
      zpassOnChange: "", zpassValueErr: "",//再次确认密码
      idOnChange: "", //id
      fasongyanzhengma: false,
      pwd_level: "",
      searchflg: true,
      isClick: true,
    }
  }
  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.dengluzhuce()
    }
  }
  componentWillUnmount() {
    clearInterval(times)
    document.removeEventListener("keydown", this.onKeyDown)
  }
  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown)
    axios({
      method: "post",
      url: api.area,
      params: {
        time: new Date().getTime().toString()
      }
    }).then(res => {
      if (res.data.code == 0) {
        if (this.props.account.indexOf('@') === -1) {
          this.setState({
            area: res.data.data.area,
            phoneOnChange: this.props.account,
          })
        } else {
          this.setState({
            area: res.data.data.area,
          })
        }

      } else {
        message.error(res.data.msg)
      }
    })
  }
  componentDidUpdate() {
    if (this.state.searchflg) {
      if (this.props.search) {
        this.setState({
          idOnChange: this.props.search,
          searchflg: false
        })
      }
    }
  }
  dengluzhuce = () => {
    this.phoneOnBule(1)
    this.yanzengmOnBule()
    this.passOnBule()
    this.zpassOnBule()
    if (this.state.phone && this.state.pass && this.state.zpass && this.state.yanzengm) {
      Xfn({
        _u: 'register_by_phone',
        _m: "post",
        _p: {
          area_code: this.state.areas,
          phone: this.state.phoneOnChange,
          password: hex_md5(this.state.passOnChange),
          confirm_pwd: hex_md5(this.state.zpassOnChange),
          referrer_id: this.state.idOnChange,
          verify_code: this.state.yanzengmOnChange,
          pwd_level: this.state.pwd_level
        },
      }, (res, code) => {
        if (code == 0) {
          Xfn({
            _m: "post",
            _u: "loginpoSt",
            _p: {
              account: this.state.phoneOnChange,
              password: hex_md5(this.state.passOnChange)
            }
          }, (res, code) => {
            if (code == 0) {
              if (res.data.data.token == "" || res.data.data.token == null) {
                const userxinxi = {
                  account: this.state.phoneOnChange,
                  password: hex_md5(this.state.passOnChange),
                  verify_type: res.data.data.verify_type,
                  login_type: res.data.data.login_type
                }
                userxinxi.area_code = this.state.areas
                store.dispatch({ type: "zhanghaoxinxi", userxinxi })
                history.push("/verifytype")
              } else {
                document.getElementsByTagName("body")[0].className = "theme-light"
                this.setState({
                  zhuti: "light"
                })
                localStorage.theme = "light"
                store.dispatch(zhutiyanzheng('light', 1))
                localStorage.userInfo = res.data.data.token
                localStorage.userName = res.data.data.user_name
                store.dispatch(tokenfun(res.data.data.token, 1))
                history.push("/transaction")
              }
            }
          })
        }
      })
    }
  }

  // ====================手机
  phandleChange = (val) => {
    this.setState({ areas: val })
  }
  phoneOnChange = (val) => {
    let value = val.target.value
    value = value.replace(/\D/g, '')
    if (value.indexOf(" ") == -1) {
      this.setState({
        phoneOnChange: value,
      })
    }

  }
  phoneOnBule = (a) => {
    if (a === 1) {
      return false
    }
    this.setState({
      fasongyanzhengma: true
    })
    if (!this.state.phoneOnChange) { return this.setState({ valueErr: lang().Please_enter_your_cell_phone_number, phone: false }) }
    if (this.state.phoneOnChange.length < 5) { return this.setState({ valueErr: lang().Mobile_number_format_error, phone: false, }) }
  

  }
  phoneOnFocus = () => {
    this.setState({ valueErr: "" })
  }
  // ====================验证码
  yanzengmOnChange = (val) => {
    let value = val.target.value
    value = value.replace(/\D/g, '')
    this.setState({
      yanzengmOnChange: value,
    })
  }
  yanzengmOnBule = () => {
    if (!this.state.yanzengmOnChange) { return this.setState({ yanzengmvalueErr: lang().Please_enter_the_verification_code, yanzengm: false }) }
    if (this.state.yanzengmOnChange.length !== 4) { return this.setState({ yanzengmvalueErr: lang().Verification_code_error, yanzengm: false, }) }
    this.setState({
      yanzengm: true,
    })
  }
  yanzengmOnFocus = () => {
    this.setState({ yanzengmvalueErr: "" })
  }
  yzmOnClick = () => {
    if (!this.state.fasongyanzhengma) {
      if (!this.state.phoneOnChange) { return this.setState({ valueErr: lang().Please_enter_your_cell_phone_number, phone: false }) }
    }
    let time = 60
    this.setState({
      timeFlg: false,
      butName: 60
    })
    times = setInterval(() => {
      time = time - 1
      this.setState({
        butName: time
      })
      if (time === 0) {
        clearInterval(times)
        this.setState({
          timeFlg: true,
          butName: lang().Send_Verification_Code
        })
      }
    }, 1000)
    Xfn({
      _u: 'check_phone',
      _m: 'post',
      _p: {
        area_code: this.state.areas,
        phone: this.state.phoneOnChange
      }
    }, (res, code) => {
      if (code == 0) {
        Xfn({
          _u: 'send_sms_verify_code',
          _m: 'post',
          _p: {
            area_code: this.state.areas,
            phone: this.state.phoneOnChange
          }
        }, (res, code) => {
          if (code == 0) {
  
          }
        }, lang().Verification_code_sent_successfully)
        this.setState({
          phone: true,
        })
      } else {
        this.setState({ phone: false, valueErr: res.data.msg })
      }
    })

    if (this.state.phone) {
     
    }


  }
  // ====================密码
  passHandleChange = (val) => {
    console.log(val)
  }
  passOnChange = (val) => {
    let value = val.target.value
    // value = value.replace(/\D/g, '')
    //必须包含数字，大写字母，小写字母，特殊字符四选三
    var reg = /^\d{1,}$/
    var strongRegex = new RegExp('^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$')//强
    var mediumRegex = new RegExp(reg) //中
    let a = null
    if (mediumRegex.test(val.target.value)) { a = "1" } else {
      a = "2"
    }
    if (strongRegex.test(val.target.value)) { a = "3" }
    if (value.indexOf(" ") == -1) {
      this.setState({
        passOnChange: value,
        pwd_level: a
      })
    }

  }
  passOnBule = () => {
    if (!this.state.passOnChange) { return this.setState({ passValueErr: lang().Please_input_a_password, pass: false, }) }
    if (this.state.passOnChange.length < 6) { return this.setState({ passValueErr: lang().PasswordCannotBeLessThan6Digits, pass: false }) }
    if (this.state.passOnChange.length > 20) { return this.setState({ passValueErr: lang().PasswordCannotBeGreaterThan20Digits, pass: false }) }
    this.setState({
      pass: true,
    })
  }
  passOnFocus = () => {
    this.setState({ passValueErr: "" })
  }
  // ====================id
  idOnChange = (val) => {
    let value = val.target.value
    if (value.indexOf(" ") == -1) {
      this.setState({
        idOnChange: value
      })
    }

  }
  // ====================确认密码
  zpassHandleChange = (val) => {
    console.log(val)
  }
  zpassOnChange = (val) => {
    let nub = true
    let value = val.target.value
    if (value.indexOf(" ") == -1) {
      this.setState({
        zpassOnChange: value
      })
    }

    if (value.length > 0) {
      for (var i = 0; i < value.length; i++) {
        if (value[i] == this.state.passOnChange[i]) {

        } else {
          nub = false
        }
      }
      if (nub == false) {
        return this.setState({ zpassValueErr: lang().Two_password_entries_are_inconsistent, pass: false })

      }
    }
    this.setState({
      zpass: true,
    })
  }
  zpassOnBule = () => {
    if (!this.state.zpassOnChange) { return this.setState({ zpassValueErr: lang().Please_enter_the_confirmation_password, pass: false, }) }
    if (this.state.zpassOnChange !== this.state.passOnChange) { return this.setState({ zpassValueErr: lang().Two_password_entries_are_inconsistent, pass: false, }) }
    this.setState({
      zpass: true,
    })
  }
  zpassOnFocus = () => {
    this.setState({ zpassValueErr: "" })
  }
  onCheckAllChange = () => {
    this.setState({
      checkAll: !this.state.checkAll
    })
  }
  render() {
    const { area, butName, timeFlg,
      valueErr, phoneOnChange,
      yanzengmOnChange, yanzengmvalueErr,
      passOnChange, passValueErr,
      zpassOnChange, zpassValueErr,
      idOnChange
    } = this.state
    console.log(phoneOnChange)
    return (
      <div className="phoneRegister-warp">
        <LoginPhoneEmail
          type={"1"}
          area={area}
          placeholder={lang()['Cell-phone_number']}
          phoneValue={phoneOnChange}
          valueErr={valueErr}
          handleChange={this.phandleChange}
          phoneOnChange={this.phoneOnChange}
          phoneOnBule={this.phoneOnBule}
          phoneOnFocus={this.phoneOnFocus}>
        </LoginPhoneEmail>

        <LoginPhoneEmail
          type="0"
          area={area}
          placeholder={lang().Please_enter_the_verification_code}
          butName={butName}
          butFlg={timeFlg}
          yzmOnClick={this.yzmOnClick}
          phoneOnChange={this.yanzengmOnChange}
          phoneValue={yanzengmOnChange}
          phoneOnBule={this.yanzengmOnBule}
          valueErr={yanzengmvalueErr}
          phoneOnFocus={this.yanzengmOnFocus}>
          >
        </LoginPhoneEmail>
        <LoginPhoneEmail
          type={"2"}
          placeholder={lang().Please_set_your_password}
          handleChange={this.passHandleChange}
          phoneOnChange={this.passOnChange}
          phoneValue={passOnChange}
          phoneOnBule={this.passOnBule}
          valueErr={passValueErr}
          phoneOnFocus={this.passOnFocus}
        >
        </LoginPhoneEmail>
        <LoginPhoneEmail
          type="2"
          placeholder={lang().Please_confirm_the_password}
          handleChange={this.zpassHandleChange}
          phoneOnChange={this.zpassOnChange}
          phoneValue={zpassOnChange}
          phoneOnBule={this.zpassOnBule}
          valueErr={zpassValueErr}
          phoneOnFocus={this.zpassOnFocus}
        >
        </LoginPhoneEmail>
        <LoginPhoneEmail
          type="3"
          placeholder={lang().Invitation_code_optional}
          phoneOnChange={this.idOnChange}
          phoneValue={idOnChange}
        >
        </LoginPhoneEmail>
        <div className="qu">
          <Checkbox checked={this.state.checkAll} onChange={this.onCheckAllChange}>{lang().I_have_read_and_agreed}</Checkbox>
          <a className="login-form-forgot" href={localStorage.language && localStorage.language !== 'zh' ? "https://gtehelp.zendesk.com/hc/en-us/articles/360039733734" : "https://gtehelp.zendesk.com/hc/zh-cn/articles/360039733734"} target="_blank">
            {lang().User_Agreement}
          </a>
        </div>
        <Button
          disabled={!this.state.checkAll}
          onClick={this.dengluzhuce}
          style={{ marginTop: 30, float: "left", width: "100%", backgroundColor: '#2f6fed' }}
          type="primary"
          className="login-form-button">
          <span style={{ fontSize: "16px" }}>{
            lang().register}</span>
        </Button>
      </div>
    );
  }

}





export default WrappedNormalregisterForm;