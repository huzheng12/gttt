import React, { Component } from 'react'
import './index.scss'
import C2Ctrade from '../../../components/c2ctrade'
import { Xfn } from '../../../../utils/axiosfn'
import { numberHandle } from '../../../../utils/numberHandle'
export default class Deaalindex extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        bg_c2c: require("../../../img/c2c/C2C_img.png")
      },
      source_asset_data: "CNY",
      target_asset_data: "USDT",
      exchange_rate_data: null,
      _search:""
    }
  }
  // 查看汇率

  RateQueryFn = () => {
    Xfn({
      _u: 'c2crate_query',
      _m: "get",
      _p: {
        source_asset: this.state.source_asset_data,// 原资产 必填
        target_asset: this.state.target_asset_data,// 兑换资产 必填
      }
    }, (res, code) => {
      if (code === 0) {
        this.setState({
          exchange_rate_data: res.data.data
        })
      }
    })
  }
  componentDidMount() {
    this.RateQueryFn()
    let _search = this.props.location.search.split("?")[1]
    console.log(_search,'===')
    if(_search){
      this.setState({
        _search:_search.split("=")[1]
      })
    }
  }
  render() {
    const {
      source_asset_data,
      exchange_rate_data,
      target_asset_data,
      _search
    } = this.state
    return (
      <div className="deaalindex">
        <div className="asset-title">
          <h1>USDT/CNY</h1>
        </div>
        <div className="c2c_deal_box">
          <div className="title_span">
            当前价格:
            </div>
          <div className="content_box">
            <span className="p1_c2c">
              {
                exchange_rate_data ? numberHandle(1 / exchange_rate_data.exchange_rate, 2, 2) : "--"
              }
            </span>
            <span className="p2_c2c">
              CNY
            </span>
            {/* <span className="p3_c2c">
              -0.10%
            </span> */}
          </div>
        </div>
        <div className="main_box">
          <C2Ctrade _search={_search} type={1} exchange_rate_data={exchange_rate_data} target_asset_data={target_asset_data} source_asset_data={source_asset_data}></C2Ctrade>
          <C2Ctrade type={0} exchange_rate_data={exchange_rate_data} target_asset_data={target_asset_data} source_asset_data={source_asset_data}></C2Ctrade>
        </div>
      </div>
    )
  }
}
