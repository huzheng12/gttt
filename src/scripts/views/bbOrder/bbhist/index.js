import React, { Component } from 'react'
import { Tabs } from 'antd';
import Bbentrust from '../../../components/bbentrust';
import Bbbill from '../../../components/bbentrust/bbbill';
const { TabPane } = Tabs;
export default class Bbhistry extends Component {
  constructor() {
    super()
    this.state = {
      key:""
    }
  }
  callback = (key) => {
    console.log(key)
    this.setState(
      {
        key:key
      }
    )
  }
  render() {
    const{
      key
    }=this.state
    return (
      <div className="bbhistry_warp">
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="当前委托" key="1">
          <Bbentrust type="0"></Bbentrust>
         </TabPane>
          <TabPane tab="历史委托" key="2">
          <Bbentrust type="1"></Bbentrust>
          </TabPane>
          <TabPane tab="币币账单" key="3">
          <Bbbill type="2"></Bbbill>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
