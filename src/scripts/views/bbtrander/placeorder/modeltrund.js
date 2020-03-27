import React, { Component } from 'react'
import {
  Button,
  Modal,
  Radio,
  Input,
  Select,
  Tooltip
} from 'antd';
import { FormattedMessage } from 'react-intl';
import { Xfn } from '../../../../utils/axiosfn';
import { openNotificationWithIcon } from '../../../../utils/NotificationCONF';


const { Option } = Select;

class Modeltrund extends Component {
  constructor() {
    super()
    this.state = {
      valuequanbushuliang: "",
      numshuliangold:null,
      imgArr:{
        io:require('../../../img/finance/transferoffunds.png')
      }

    }
  }

  onOkFn = () => {
    console.log(this.state.valuequanbushuliang,this.props.available.available)
    if(this.state.valuequanbushuliang*1>this.props.available.available*1){
     return openNotificationWithIcon("opne-warning", "警告", "可划转数量不足")
    }
    Xfn({
      _u: 'bboaccounttransfer',
      _m: "post",
      _p: {
        asset:this.props.asset,// 资产 USD,必填
        from_account: this.props._this.state.zjzhfangxiang,// 转出账户类型 1 资金账户 2 永续合约账户 3 bb账户,必填
        to_account: this.props._this.state.zjzhfangxiangchu,// 转入账户类型,必填
        volume: this.state.valuequanbushuliang,// 数量,必填
      }
    }, (res, code) => {
      if (code === 0) {
        this.props.visibleFn(false, 2)
        this.setState({
          valuequanbushuliang:"",
          numshuliangold:null
    
        })
        this.props._this.setState({
          zjzhfangxiang: "1",
          zjzhfangxiangchu: "3",
        })
      }
    })
  }
  zjzhfangxiang = (value) => {
    this.props.bboaccountavailablefn(value,this.props.asset)
    if(value===this.props._this.state.zjzhfangxiangchu){
      this.props._this.setState({
        zjzhfangxiangchu:this.props._this.state.zjzhfangxiang,
      })
    }
    this.props._this.setState({
      zjzhfangxiang: value,
    })
    this.setState({
      valuequanbushuliang:"",
      numshuliangold:null

    })
  }
  qiehuanduidiao=()=>{
    this.props.bboaccountavailablefn(this.props._this.state.zjzhfangxiangchu,this.props.asset)
    this.props._this.setState({
      zjzhfangxiangchu: this.props._this.state.zjzhfangxiang,
      zjzhfangxiang:this.props._this.state.zjzhfangxiangchu
    })
  }
  zjzhfangxiangchu = (value) => {
    if(this.props._this.state.zjzhfangxiang===value){
      this.props.bboaccountavailablefn(this.props._this.state.zjzhfangxiangchu,this.props.asset)
      this.props._this.setState({
        zjzhfangxiang:this.props._this.state.zjzhfangxiangchu
      })
    }else{
      this.props.bboaccountavailablefn(this.props._this.state.zjzhfangxiang,this.props.asset)
    }
    this.props._this.setState({
      zjzhfangxiangchu: value
    })
    this.setState({
      valuequanbushuliang:"",
      numshuliangold:null
    })
  }
  valuequanbushuliang = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/, '$1$2.$3');//只能输入两个小数  
    this.setState({
      valuequanbushuliang: value,
    })

    if (!value) {
      this.setState({
        numshuliangold:null,
      })
    }
  }
  quanbudiuguoqu = () => {
    this.setState({
      numshuliangold: '0',
      valuequanbushuliang:this.props.available.available
    })
  }

  render() {
    const {
      numshuliang, valuequanbushuliang,numshuliangold,imgArr
    } = this.state
    const {
      visible, visibleFn,available,asset,type,_this
    } = this.props
    return (
      <Modal
        className="but0002"
        title={<FormattedMessage id="Transfer_of_funds" defaultMessage={'资金划转'} />}
        visible={visible}
        onOk={this.onOkFn}
        onCancel={() => visibleFn(false, 3)}
        centered
        okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
        cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
      >
        <div className="but0002-one">
          <div>
            <FormattedMessage id="asset" defaultMessage={'资产'} />
          </div>
          <div className="abc-a">
            <Input disabled placeholder=""
              prefix={<span> {asset}</span>}
              style={{ height: 42 }}
            />
          </div>
        </div>
        <div className="but0002-one">
          <div>
            <FormattedMessage id="Turn_the_direction" defaultMessage={'划转方向'} />
          </div>
          <div className="abc-a">
            <Select defaultValue="1" className="select2222"
              value={_this.state.zjzhfangxiang}
              style={{ width: 160, height: 42, float: "left" }}
              onChange={this.zjzhfangxiang}>
              <Option value="1">  <FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /></Option>
              <Option value="2"> <FormattedMessage id="Sustainable_Contract_Account" defaultMessage={'永续合约账户'} /></Option>
              <Option value="3"> 币币账户</Option>
              {/* // 1 资金账户 2 永续合约账户 3 bb账户 */}
            </Select>
            <img className="chongbi-span-huazhuan" onClick={this.qiehuanduidiao} src={imgArr.io} alt="" style={{ float: "left", lineHeight: "42px" }}/>

            {/* <span className="chongbi-span-huazhuan" style={{ float: "left", lineHeight: "42px" }}> <FormattedMessage id="Transfer" defaultMessage={'划转'} /></span> */}
            <Select defaultValue="2" className="select2222"
              style={{ width: 160, height: 42, float: "left" }}
              value={_this.state.zjzhfangxiangchu}
              onChange={this.zjzhfangxiangchu}>
              <Option value="1"><FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /></Option>
              <Option value="2"><FormattedMessage id="Sustainable_Contract_Account" defaultMessage={'永续合约账户'} /></Option>
              <Option value="3"> 币币账户</Option>
            </Select>
          </div>

        </div>
        <div className="but0002-one but0002-on1">
          <div>
            <FormattedMessage id="Transfer_Quantity" defaultMessage={'划转数量'} />
          </div>
          <div className="abc-a">
            <Input placeholder="" style={{ height: 42 }} value={valuequanbushuliang} onChange={this.valuequanbushuliang} />
          </div>

        </div>
        <div className="but0002-one but0002-on1">
          <div style={{ height: 1 }}>
          </div>
          <div className="abc-a" style={{ textAlign: "left" }}>
            <span>        <FormattedMessage id="Transfer_Quantity" defaultMessage={'划转数量'} />：<span style={{ display: "inline-block" }}>{numshuliangold?numshuliangold:available.available}</span></span>
            <span className="abc-a-c" onClick={this.quanbudiuguoqu}><FormattedMessage id="All_Rolls" defaultMessage={'全部划转'} /></span>
          </div>

        </div>
      </Modal>
    )
  }
}
export default Modeltrund