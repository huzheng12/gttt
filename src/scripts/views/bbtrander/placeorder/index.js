import React, { Component } from 'react'
import './index.scss'
import Singlebox from './Singlebox'
export default class Placeorder extends Component {
  render() {
    return (
      <div className="placeorder_warp">
        <h1 className="h1_title">
          限价委托
        </h1>
        <div className="content_boxq">
        <Singlebox type='1'></Singlebox>
        <Singlebox type='0'></Singlebox>

        </div>
      </div>
    )
  }
}
