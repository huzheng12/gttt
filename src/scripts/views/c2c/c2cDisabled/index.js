import React, { Component } from 'react'
import C2cdingdan from '../../../components/c2cdingdan'

export default class Disabled extends Component {
  render() {
    return (
      <div className="deaalindex">
        <div className="asset-title">
          <h1>已取消订单</h1>
        </div>
        <C2cdingdan type={'3'}></C2cdingdan>
      </div>
    )
  }
}
