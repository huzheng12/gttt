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


const { Option } = Select;

class Modeltrund extends Component {
  constructor() {
    super()
    this.state = {
      zjzhfangxiang: "1",
      zjzhfangxiangchu: "3",
      valuequanbushuliang: "",

    }
  }


  onOkFn = () => {
    Xfn({
      _u: 'bboaccounttransfer',
      _m: "post",
      _p: {
        asset:this.props.asset,// 资产 USD,必填
        from_account: this.state.zjzhfangxiang,// 转出账户类型 1 资金账户 2 永续合约账户 3 bb账户,必填
        to_account: this.state.zjzhfangxiangchu,// 转入账户类型,必填
        volume: this.state.valuequanbushuliang,// 数量,必填
      }
    }, (res, code) => {
      if (code === 0) {
        this.props.visibleFn(false, 2)
      }
    })
  }
  zjzhfangxiang = (value) => {
    this.props.bboaccountavailablefn(value)
    if(value===this.state.zjzhfangxiangchu){
      this.setState({
        zjzhfangxiangchu:this.state.zjzhfangxiang
      })
    }
    this.setState({
      zjzhfangxiang: value
    })
  }
  zjzhfangxiangchu = (value) => {
    if(this.state.zjzhfangxiang===value){
      this.props.bboaccountavailablefn(this.state.zjzhfangxiangchu)

      this.setState({
        zjzhfangxiang:this.state.zjzhfangxiangchu
      })
    }else{

      this.props.bboaccountavailablefn(this.state.zjzhfangxiang)
    }
    this.setState({
      zjzhfangxiangchu: value
    })
  }
  valuequanbushuliang = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/, '$1$2.$3');//只能输入两个小数  
    if (value[0] != ".") {
      if (value[0] == 0 && value[1] == 0) {

      } else {
        this.setState({
          valuequanbushuliang: value
        })
      }
    }
    this.setState({
      valuequanbushuliang: value,
    })

    // if (!value && this.props.available.available === "0") {
    //   this.setState({
    //     numshuliang: this.props.available.available,
    //   })
    // }
  }
  render() {
    const {
      numshuliang, valuequanbushuliang, zjzhfangxiang, zjzhfangxiangchu
    } = this.state
    const {
      visible, visibleFn,available,asset,type
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
              value={zjzhfangxiang}
              style={{ width: 160, height: 42, float: "left" }}
              onChange={this.zjzhfangxiang}>
              <Option value="1">  <FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /></Option>
              <Option value="2"> <FormattedMessage id="Sustainable_Contract_Account" defaultMessage={'永续合约账户'} /></Option>
              <Option value="3"> bb账户</Option>
              {/* // 1 资金账户 2 永续合约账户 3 bb账户 */}
            </Select>
            <span className="chongbi-span-huazhuan" style={{ float: "left", lineHeight: "42px" }}> <FormattedMessage id="Transfer" defaultMessage={'划转'} /></span>
            <Select defaultValue="2" className="select2222"
              style={{ width: 160, height: 42, float: "left" }}
              value={zjzhfangxiangchu}
              onChange={this.zjzhfangxiangchu}>
              <Option value="1"><FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /></Option>
              <Option value="2"><FormattedMessage id="Sustainable_Contract_Account" defaultMessage={'永续合约账户'} /></Option>
              <Option value="3"> bb账户</Option>
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
            <span>        <FormattedMessage id="Transfer_Quantity" defaultMessage={'划转数量'} />：<span style={{ display: "inline-block" }}>{available.available}</span></span>
            <span className="abc-a-c" onClick={this.quanbudiuguoqu}><FormattedMessage id="All_Rolls" defaultMessage={'全部划转'} /></span>
          </div>

        </div>
      </Modal>
    )
  }
}
export default Modeltrund