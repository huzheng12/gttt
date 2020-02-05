import React, { Component } from 'react'
import { Input, Select, Button } from 'antd';
import { Xfn } from '../../../../utils/axiosfn';
const { Option } = Select;
var times
export default class DrawerInput extends Component {
  constructor() {
    super()
    this.state = {
      fasongzi: '发送',
      timeFlg: true,
    }
  }
  componentWillUnmount() {
    clearInterval(times)
  }
  handleChange = (value) => {
    this.props.onVlue(value, this.props.val)
  }
  onChangeVal = (value) => {
    if (this.props.val === 'card_no' || this.props.val === 'card_nos') {
      this.props.onVlue(value.target.value.replace(/[^0-9-]+/, ''), this.props.val)
    } else {
      this.props.onVlue(value.target.value, this.props.val)
    }
  }
  SendOutCode = () => {
    let time = 60
    this.setState({
      fasongzi: time,
      timeFlg: false,
    })
    times = setInterval(() => {
      time = time - 1
      this.setState({
        fasongzi: time,
      })
      if (time === 0) {
        clearInterval(times)
        this.setState({
          timeFlg: true,
          fasongzi: '发送'
        })
      }
    }, 1000)
    Xfn({
      _u: "c2ccard_send_verify_code",
      _m: 'post',
      _p: {}
    }, (res, code) => { })
  }
  render() {
    const {
      type, title, placeholder, arrData, val
    } = this.props
    const {
      timeFlg
    } = this.state
    return (
      <div className="drawer_input_warp">
        <div className="left_box">
          {
            val === 'open_branch' ? <span className="xing_box">

            </span> : <span className="xing_box">
                *
        </span>
          }

          <span className="title_font">
            {title}
          </span>
        </div>
        <div className="right_box">
          {
            (() => {
              if (type === 1) {
                return <Select defaultValue={arrData[0][this.props.val]} style={{ width: "100%" }} onChange={this.handleChange}>
                  {
                    arrData.map((item, index) => {
                      return <Option value={item[this.props.val]} key={index + item}>
                        {
                          item[this.props.val]
                        }
                      </Option>
                    })
                  }
                </Select>
              } else if (type === 2) {
                // 是否判断  值的限制
                if (this.props.value) {
                  return <Input value={this.props.value} placeholder={placeholder} onChange={this.onChangeVal} style={{ height: 42 }} />
                }
                return <Input placeholder={placeholder} onChange={this.onChangeVal} style={{ height: 42 }} />
              } else {
                // 发送验证码
                return <div className="right_box_mian">
                  <Input placeholder={placeholder} onChange={this.onChangeVal} style={{ height: 42, width: 170 }} />
                  <Button disabled={!timeFlg} type="primary" className={!timeFlg ? "" : "primary_custom"} onClick={this.SendOutCode}>
                    <div className="but_font">
                      {
                        this.state.fasongzi
                      }
                    </div>
                  </Button>
                </div>
              }

            })()
          }
        </div>
      </div>
    )
  }
}
