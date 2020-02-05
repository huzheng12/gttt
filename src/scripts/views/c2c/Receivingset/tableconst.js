import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Xfn } from '../../../../utils/axiosfn';
export default class Tableconst extends Component {
  constructor() {
    super()
    this.state = {
      modal2Visible: false
    }
  }
  setModal2Visible(modal2Visible, type) {
    // type ==  1  点击解绑  弹窗；   ===2  确认    ===3  取消  
    this.setState({ modal2Visible });
    if (type === 2) {
      this.UntyingFn()
    }
  }
  // 解绑银行卡
  UntyingFn = () => {
    // String card_no 卡号 必填
    Xfn({
      _u: "c2ccard_remove",
      _m: "post",
      _p: {
        card_no: this.props.item.card_no
      }
    }, (res, code) => {
      if (code === 0) {
        this.props.fnc2ccardQueryFn()
      }
    })
  }

  render() {
    const {
      item
    } = this.props
    return (
      <div className="tableconst_warp">
        <div className="tr_but">
          {/* <i className="iconfont iconicon-test4"></i> */}
          <span className="tr_span_card">
            银行转账
        </span>
        </div>
        <div className="tr_but">
          CNY
        </div>
        <div className="tr_but">
          {
            item.card_user_name
          }
        </div>
        <div className="tr_but">
          {
            item.open_branch
          }
        </div>
        <div className="tr_but tr_bg">
          {
            item.card_no
          }
          <CopyToClipboard text={item.card_no}>
            <i className="iconfont iconicon-test6 but_c2c_fuzhi"></i>
          </CopyToClipboard>
        </div>
        <div className="tr_but">
          <Button type="primary" className="primary_custom but_c2c_bianji" onClick={() => this.setModal2Visible(true, 1)}>
            <div className="but_font font_clor">
              解绑
            </div>
          </Button>
        </div>
        {/* 解绑银行卡 确认框 */}
        <Modal
          title="确认解绑该银行卡？"
          centered
          okText="确认"
          cancelText="取消"
          wrapClassName="c2c_table_modal"
          visible={this.state.modal2Visible}
          onOk={() => this.setModal2Visible(false, 2)}
          onCancel={() => this.setModal2Visible(false, 3)}
        >
          <div className="rows">
            <div className="span1">
              <span className="p1">姓</span>
              <span className="p2"></span>
              <span className="p3">名</span>
              <span className="p4">：</span>
            </div>
            <div className="span2">
              {
                item.card_user_name
              }
            </div>
          </div>
          <div className="rows">
            <div className="span1">
              <span className="p1">开</span>
              <span className="p2">户</span>
              <span className="p3">行</span>
              <span className="p4">：</span>
            </div>
            <div className="span2">
              {
                item.open_bank
              }
            </div>
          </div>
          <div className="rows">
            <div className="span1">
              <span className="p1">开</span>
              <span className="p2">户 支</span>
              <span className="p3">行</span>
              <span className="p4">：</span>
            </div>
            <div className="span2">
              {
                item.open_branch
              }
            </div>
          </div>
          <div className="rows">
            <div className="span1">
              <span className="p1">卡</span>
              <span className="p2"></span>
              <span className="p3">号</span>
              <span className="p4">：</span>
            </div>
            <div className="span2">
              {
                item.card_no
              }
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
