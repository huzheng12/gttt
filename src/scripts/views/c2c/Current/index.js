import React, { Component } from 'react'
import { Table } from 'antd';
import C2cdingdan from '../../../components/c2cdingdan';
export default class Current extends Component {
  constructor() {
    super()
  }
  render() {

    return (
      <div className="deaalindex">
        <div className="asset-title">
          <h1>当前订单</h1>
        </div>
        <C2cdingdan type={'0'}></C2cdingdan>
      </div>
    )
  }
}
