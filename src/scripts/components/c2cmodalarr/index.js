import React, { Component } from 'react'
import { Modal, Input } from 'antd';
import { history } from '@/utils/history'
import { hex_md5 } from '@/utils/md5'
import { Xfn } from '../../../utils/axiosfn';
const StyleTitle = {
  fontSize: 16,
  color: "#666",
}
export default class C2cModalarr extends Component {
  constructor() {
    super()
    this.state = {
      visible1: false,
      isOkvisi: true,
      zjPass: '',
    }
  }
  // 实名认证弹框函数
  handleOk = (isok, type) => {
    // type ==  1  弹窗；   ===2  确认    ===3  取消  
    this.props._this.setState({
      visible1: false
    })
    this.setState({
      visible1: isok,
      isOkvisi: true
    })
    // JsonObj
    if (type === 2) {
      if (this.props.okTextUrl) {
        history.push(this.props.okTextUrl)
      } else {
        this.props.JsonObj.fund_pwd = hex_md5(this.state.zjPass)
        Xfn({
          _u: "c2c_money_out",
          _m: "post",
          _p: this.props.JsonObj
        }, (res, code) => {
          console.log(res)
        })
      }
    }
  }
  componentDidUpdate() {
    if (this.props.visible1 && this.state.isOkvisi) {
      this.handleOk(true, 1)
      this.setState({
        isOkvisi: false
      })
    }
  }
  passwordFn = (val) => {
    console.log(val.target.value)
    this.setState({
      zjPass: val.target.value
    })
  }
  render() {
    const {
      title, okText
    } = this.props
    return (
      <Modal
        title="提示"
        visible={this.state.visible1}
        centered
        okText={okText}
        cancelText="取消"
        onOk={() => this.handleOk(false, 2)}
        onCancel={() => this.handleOk(false, 3)}
        wrapClassName="c2c_table_modal c2c_table_modal_renzheng"
      >
        {
          title !== null ? <div className="title" style={StyleTitle}>
            {
              title
            }
          </div> : <Input type="password" onChange={this.passwordFn} placeholder="请输入资金密码" />
        }
      </Modal>
    )
  }
}
