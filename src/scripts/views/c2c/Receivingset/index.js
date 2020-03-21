import React, { Component } from 'react'
import './index.scss'
import { Drawer, Button } from 'antd';
import DrawerInput from './DrawerInput';
import Tableconst from './tableconst';
import { Xfn } from '../../../../utils/axiosfn';
import { dataempty } from '../../../../utils/dataempty';
import C2cModalarr from '../../../components/c2cmodalarr';
import { openNotificationWithIcon } from '../../../../utils/NotificationCONF';
export default class Receivingset extends Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      visible1: false,
      card_user_name: "",
      card_no: "",
      card_nos: "",
      open_bank: "",
      open_branch: "",
      verify_code: "",
      asset: "CNY",
      asset_arr: [
        {
          asset: 'CNY 人民币'
        }
      ],
      gather_type: "银行卡",
      gather_type_arr: [
        {
          gather_type: '银行卡'
        }
      ],
      c2ccardQueryData: null,
      authrenzzData: null,
      AddtoIsOk: true,
    }
  }
  // 获取绑定银行卡信息
  c2ccardQueryFn = () => {
    Xfn({
      _u: 'c2ccard_query',
      _m: "get",
      _p: {}
    }, (res, code) => {
      if (code === 0) {
        this.setState({
          c2ccardQueryData: res.data.data.rows
        })
        if (res.data.data.rows.length !== 0) {
          this.setState({
            AddtoIsOk: false
          })
        } else {
          this.setState({
            AddtoIsOk: true
          })
        }
      }
    })
  }
  // 获取认证信息
  authrenzzFn = () => {
    Xfn({
      _u: 'authrenzz',
      _m: "get",
      _p: {}
    }, (res, code) => {
      if (code === 0) {
        this.setState({
          authrenzzData: res.data.data
        })
      }
    })
  }
  componentDidMount() {
    this.authrenzzFn()
    this.c2ccardQueryFn()
  }
  showDrawer = (showDrawer, type) => {
    // type ==  1  点击解绑  弹窗；   ===2  确认    ===3  取消  
    if (type === 2) {
      if (this.state.authrenzzData && this.state.authrenzzData.identity_auth === "0") {
        this.setState({
          visible1: true
        })
        return false
      }
      const { asset, gather_type, card_user_name, card_no, card_nos, open_bank, open_branch, verify_code } = this.state
      if (card_no !== card_nos) { return openNotificationWithIcon("opne-warning", "警告", "两次卡号不一致") }
      const JsonObj = {
        asset: asset,
        gather_type: gather_type === "银行卡" ? '1' : "0",
        card_user_name: card_user_name,
        card_no: card_no,
        card_nos: card_nos,
        open_bank: open_bank,
        open_branch: open_branch,
        verify_code: verify_code,
      }
      Xfn({
        _u: "c2ccard_add",
        _m: "post",
        _p: JsonObj
      }, (res, code) => {
        if (code === 0) {
          this.setState({
            visible: showDrawer,
            card_user_name:"",
            card_no:"",
            card_nos:"",
            open_bank:"",
            open_branch:"",
            verify_code:"",

          });
          this.c2ccardQueryFn()
        } else {
          this.setState({
            visible: true,
          });
        }
      })
    } else {
      this.setState({
        visible: showDrawer,
      });
    }
  };
  onVlue = (val, name) => {
    this.setState({
      [name]: val
    })
  }
  render() {
    const {
      c2ccardQueryData,
      visible1,
      card_no,
      card_nos, AddtoIsOk,card_user_name,open_bank,open_branch,verify_code
    } = this.state
    return (
      <div className="deaalindex receivingset_warp_box">
        <div className="asset-title receivingset_warp">
          <h1>收付款设置</h1>
          {
            AddtoIsOk ? <div className="title_drawer" onClick={() => this.showDrawer(true, 1)}>
              <i className="iconfont iconicon-test1"></i>
              <span className="set_span">
                添加收款信息
          </span>
            </div> : ""
          }

        </div>
        <div className="table_box">
          {
            c2ccardQueryData && c2ccardQueryData.map((item, index) => {
              return <Tableconst fnc2ccardQueryFn={this.c2ccardQueryFn} key={item + index} item={item} />
            })
          }
          {
            dataempty(c2ccardQueryData, '1')
          }
        </div>
        {
          this.state.Open_account
        }
        <Drawer
          title="编辑"
          placement="right"
          closable={false}
          onClose={() => this.showDrawer(false, 3)}
          visible={this.state.visible}
          width='500'
          className='drawer_warp'
          headerStyle={{
            height: 50,
            background: 'rgba(245,247,250,1)',

          }}
        >
          <DrawerInput title='交易币种' type={1} placeholder="" onVlue={this.onVlue} val='asset' arrData={this.state.asset_arr}></DrawerInput>
          <DrawerInput title='收款方式' type={1} placeholder="" onVlue={this.onVlue} val='gather_type' arrData={this.state.gather_type_arr}></DrawerInput>
          <DrawerInput value={card_user_name} title='姓名' type={2} placeholder="请输入持卡人姓名" onVlue={this.onVlue} val='card_user_name'></DrawerInput>
          <DrawerInput value={card_no} title='卡号' type={2} placeholder="请输入银行卡号" onVlue={this.onVlue} val='card_no'></DrawerInput>
          <DrawerInput value={card_nos} title='确认卡号' type={2} placeholder="请输入银行卡号" onVlue={this.onVlue} val='card_nos'></DrawerInput>
          <DrawerInput value={open_bank} title='开户行' type={2} placeholder="请输入开户行" onVlue={this.onVlue} val='open_bank'></DrawerInput>
          <DrawerInput value={open_branch} title='开户支行(选填)' type={2} placeholder="请输入开户行支行" onVlue={this.onVlue} val='open_branch'></DrawerInput>
          <DrawerInput value={verify_code} title='发送验证码' type={3} placeholder="请输入验证码" onVlue={this.onVlue} val='verify_code'></DrawerInput>
          <div className="button_box">
            <Button type="primary" className="primary_gray" onClick={() => this.showDrawer(false, 3)}>
              <div className="but_font_gray">
                取消
              </div>
            </Button>
            <Button type="primary" className="primary_custom" onClick={() => this.showDrawer(false, 2)}>
              <div className="but_font">
                保存
              </div>
            </Button>
          </div>
        </Drawer>
        <C2cModalarr title={'为了您的账户安全，请立即设置资金密码'} okText="立即设置" okTextUrl="/personal/security/zjpass" visible1={visible1} _this={this}></C2cModalarr>
      </div>
    )
  }
}
