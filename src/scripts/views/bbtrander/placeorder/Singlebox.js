import React, { Component } from 'react'
import LoginPhoneEmail from '../../../components/login'
import { FormattedMessage } from 'react-intl';
import {
  Tooltip, Button,
  Modal,
  Slider,
  InputNumber
} from 'antd';
import { openNotificationWithIcon } from '../../../../utils/NotificationCONF';
import Modeltrund from './modeltrund';
import { Xfn } from '../../../../utils/axiosfn';
import { connect } from "react-redux";




const marks = {
  0: '0',
  20: '',
  40: "",
  60: "",
  80: "",
  100: "100%",

};
@connect(
  state => {
    return {
			bbasset: state.bbdata.bbasset,
			bbaymbol: state.bbdata.bbaymbol,
		}
  }
)
 class Singlebox extends Component {
  constructor() {
    super()
    this.state = {
      pricedata:"1",
      lotdata:"1",
      visible:false,
      available:{},
      num17:"",
      aaa:100
    }
  }
  priceFn = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    var n = 1
    var numdd = new RegExp(`^(.*\\..{${n}}).*$`)
    value = value.replace(numdd, "$1")
    if (value * 1 > 1000000) {
      this.setState({
        pricedata:"1000000"
      })
      return openNotificationWithIcon("opne-warning", "警告", "价格不能超过1000000")
    }
    if (value[0] != "0" && value[0] != ".") {
      this.setState({
        pricedata:value
      })
    }
  }
  lotFn = (e) => {
    let value = e.target.value;
    if (value * 1 > 100000000) {
      this.setState({
        lotdata: "100000000"
      })
      return openNotificationWithIcon("opne-warning", "警告", "数量不能超过100000000")
    }
    if (value >= 0 && value[0] != "0") {
      this.setState({
        lotdata: value.replace(/[^0-9-]+/, '')
      })
    }
  }
  bboaccountavailablefn=(type)=>{
    Xfn({
      _u:"bboaccountavailable",
      _m:"get",
      _p:{
        asset:this.props.bbasset,
        account_type:type
      }
    },(res,code)=>{
      if(code!==0){
        return false
      }
      this.setState({
        available:res.data.data
      })
      console.log(res)
    })
  }
  // 点击划转
  visibleFn=(flg,type)=>{
    // type ===1  点击划转
    if(type===1){
      this.bboaccountavailablefn('1')
    }else if(type===2){
     
    }
    this.setState({
      visible:flg
    })
  }
  create=()=>{
    Xfn({
      _u:"bbordercreate",
      _m:"post",
      _p:{
        asset:this.props.bbasset,// 资产 USD,必填
        symbol:this.props.bbaymbol,// 交易对,必填
        bid_flag:this.props.type,// 1.买入,0.卖出,必填
        price:this.state.pricedata,// 价格, 非必填 , order_type是1必填 ,
        qty:this.state.lotdata,// 数量,必填
        order_type:'1',// 委托类型,1:限价,必填
      }
    },(res,code)=>{
      if(code===0){
        console.log(res,'购买成功')
      }
    })
  }
  formatter=(value)=>{
    return `${value}%`;
  }
  modify_lever=(val)=>{

    this.setState({
      num17:val,
      lotdata:this.state.aaa*val/100
    })
  }
  render() {
    const {
      num17,pricedata,lotdata,visible,asset,available,aaa
    } = this.state
    const {
      type,bbasset
    }=this.props
    return (
      <div className="single_warp">
        <div className="xiaotitle">
          <div className="kyye_box">
            可用余额:
         </div>
          <div className="data_box_span">
            0.00 
            {
              type==='1'?" USDT":" BTC"
            }
         </div>
          <div className="but_huazhuan" onClick={()=>this.visibleFn(true,1)}>
            划转{
              type==='1'?"USDT":"BTC"
            }
         </div>
        </div>
        <LoginPhoneEmail
          phoneValue={pricedata}
          phoneOnChange={this.priceFn}
          type={'3'}
          prefix={<span>委托类型</span>}
          suffix={
            <Tooltip className="tooltip-001">
              <span>USDT</span>
            </Tooltip>
          }
        />
        <LoginPhoneEmail
          phoneValue={lotdata}
          phoneOnChange={this.lotFn}
          type={'3'}
          prefix={<span>仓位</span>}
          suffix={
            <Tooltip className="tooltip-001">
              <span>BTC</span>
            </Tooltip>
          }
        />

        <Slider tipFormatter={this.formatter} marks={marks} value={num17} min={0.01} step={0.01} max={100} tooltipVisible={1 == 2} onChange={this.modify_lever} />
        <Button onClick={this.create} className={"button-00010"+(type==='1'?' butgg lvse':' butgt bgred')} type="primary"  >
          {
              type==='1'?"买入BTC":"卖出BTC"
            }
        </Button>
        <div className="foot_box">
          <span className="span3">
          {
              type==='1'?"可买(BTC):":"可卖(USDT):"
            }
            
          </span>
          <span>
          {aaa}
          </span>
        </div>
        <Modeltrund 
        bboaccountavailablefn={this.bboaccountavailablefn} 
        available={available} 
        asset={bbasset} 
        visible={visible} 
        visibleFn={this.visibleFn}
        >
        </Modeltrund>
      </div>
    )
  }
}
export default Singlebox