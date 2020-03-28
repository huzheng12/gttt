import React, { Component } from 'react'
import './index.scss'
import Singlebox from './Singlebox'
import { history } from '@/utils/history'

import { Xfn } from '../../../../utils/axiosfn'
export default class Placeorder extends Component {
  constructor() {
    super()
    this.state = {
      getUserFeeObj: {}
    }
  }
  componentDidMount() {
    if(localStorage.userInfo){
      Xfn({
        _u: "getUserFee",
        _m: "get",
        _p: {
        }
      }, (res, code) => {
        if (code == 0) {
          this.setState({
            getUserFeeObj: res.data.data
          })
        }
      })
    }
  }
  render() {
    const {
      getUserFeeObj
    } = this.state
    return (
      <div className="placeorder_warp">
        <h1 className="h1_title">
          限价委托
          <div className="feilv_box">
            <span className="fuhoa">
              %
           </span>
            <span className="feilv">费率</span>
            <div className="tankuang_box">
              <div className="tankuang_box_b">
                Maker {getUserFeeObj.maker_fee ? getUserFeeObj.bb_maker_fee + '%' : "--" + '%'} I Taker {getUserFeeObj.maker_fee ? getUserFeeObj.bb_taker_fee + '%' : '--' + '%'}

                <span className='fee' onClick={() => {
                  history.push('/personal/fxs/index')
                }}>手续费等级</span>
              </div>

            </div>
          </div>
        </h1>
        <div className="content_boxq">
          <Singlebox type='1'></Singlebox>
          <Singlebox type='0'></Singlebox>

        </div>
      </div>
    )
  }
}
