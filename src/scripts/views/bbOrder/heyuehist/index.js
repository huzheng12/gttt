import React, { Component } from 'react'
import { Tabs } from 'antd';
import Innercangs from '../../transaction/table';
import AccountRecords from '../../transaction/accountrecords';

const { TabPane } = Tabs;
export default class Heyuehistry extends Component {
  constructor(){
    super()
    this.state={

    }
  }
  callback=(key)=>{
console.log(key)
  }
  render() {
    return (
      <div className="heyuehistry_warp">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
    <TabPane tab="合约委托" key="1">
    <Innercangs type={'bb'}></Innercangs>
    </TabPane>
    <TabPane tab="合约账单" key="2">
    <AccountRecords type={'bb'} ></AccountRecords>
    </TabPane>
  </Tabs>
      </div>
    )
  }
}
