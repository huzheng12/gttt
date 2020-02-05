import React, { Component } from 'react'
import C2cdingdan from '../../../components/c2cdingdan'

export default class Completed extends Component {
  render() {
    return (
      <div className="deaalindex">
        <div className="asset-title">
          <h1>已完成订单</h1>
        </div>
        <C2cdingdan type={'1'}></C2cdingdan>
      </div>
    )
  }
}
