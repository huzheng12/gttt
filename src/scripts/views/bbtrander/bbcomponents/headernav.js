import React, { Component } from 'react'
import { connect } from "react-redux";
import store from '../../../store';
import { Xfn } from '../../../../utils/axiosfn';
import { bbsymbolfn } from '../../../action/bbtion';
import bbSubscribe from '../../../../utils/bb_send_unp';

let assetquanbu = null

@connect(
  state => {
    return {
      bbassetArr: state.bbdata.bbassetArr,
      bbasset: state.bbdata.bbasset,
      bbaymbol: state.bbdata.bbaymbol,
      bbsymbolArr: state.bbdata.bbsymbolArr,
      bbassetroute: state.bbdata.bbassetroute,
      bbinstrumentArr: state.bbdata.bbinstrumentArr,
    }
  }
)
class Headernav extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        a1: require("../../../img/rate_down.png"),
        a2: require('../../../img/rate_up.png'),
      },
      bbclkasset: "USDT",
      bbclksybmol: "BTC/USDT",
      bbsyblarr: [], isOk: true
    }
  }
  componentDidMount() {
    this.bbassetFn()
  }
  bbassetFn = () => {
    Xfn({
      _u: "bbassetquery",
      _m: 'get',
      _p: {}
    }, (res, code) => {
      if (code === 0) {
        assetquanbu = 'USDT'
        Xfn({
          _u: "bbsymbolquery",
          _m: "get",
          _p: {
            asset: 'USDT'
          }
        }, (res, code) => {
          if (code === 0) {
            this.setState({
              bbsyblarr: res.data.data.rows
            })
          }
        })
      }
    })
  }
  dianji = (value) => {
    if (!this.state.isOk) {
      return false
    }
    assetquanbu = value
    this.setState({
      bbclkasset: value,
      isOk: false
    })
    Xfn({
      _u: "bbsymbolquery",
      _m: "get",
      _p: {
        asset: value
      }
    }, (res, code) => {
      if (code === 0) {
        this.setState({
          bbsyblarr: res.data.data.rows,
          isOk: true
        })
      }
    })
  }
  symbolfn = (value) => {
    store.dispatch({ type: "bbassetgaibaian", data: assetquanbu })
    store.dispatch({ type: 'bbsymbolgaibaian', data: value })
    bbSubscribe({
      bbaymbol: value,
      bbasset: assetquanbu,
      bbclksybmol: value
    })

  }
  render() {
    const {
      imgArr, bbclkasset, bbsyblarr, bbclksybmol
    } = this.state
    const {
      bbassetArr, bbasset, bbsymbolArr, bbinstrumentArr, bbaymbol
    } = this.props
    return (
      <div className="headernav_warp">
        <div className="nav">
          <div className="lie lie1">市场</div>
          <div className="lie lie2">币对</div>
          <div className="lie lie3">
            <span>
              涨幅
          </span>
            <span className='img_box'>
              <img className="img_box_d" src={imgArr.a1} alt="" />
              <img src={imgArr.a2} alt="" />
            </span>
          </div>
        </div>
        <div className="li_box">
          <ul className="box_bb box_bb1">
            {
              bbassetArr.map((item, index) => {
                return <li key={item + index} onClick={() => this.dianji(item.asset)} className={bbclkasset !== item.asset ? "box_bbspan" : 'box_bbspan1 box_bbspan'}>{
                  item.asset
                }</li>
              })
            }

          </ul>
          <ul className="box_bb box_bb2">
            {
              bbinstrumentArr.map((item, index) => {
                return <li className={bbaymbol !== item.symbol ? "" : 'box_bbspan999 '} key={item + index} onClick={() => this.symbolfn(item.symbol)}>
                  <span style={{
                    display: 'inline-block',
                    width: 114
                  }} > {
                    item.symbol
                  }</span>
                  <span style={{ color: item.change_rate_24h && item.change_rate_24h >= 0 ? "#26994E" : "#E53F39" }}>
                    {
                      item.change_rate_24h && item.change_rate_24h > 0 ? "+" + String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") : String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1")
                    }
                    %
                  </span>
                </li>
              })}
          </ul>
          {/* <ul className="box_bb box_bb3">
            {
              bbinstrumentArr.map((item, index) => {
                return <li className={bbaymbol !== item.symbol ? "" : 'box_bbspan999 '} style={{ color: item.change_rate_24h && item.change_rate_24h >= 0 ? "#26994E" : "#E53F39" }} key={item + index} onClick={() => this.symbolfn(item.symbol)}>
                  {
                    item.change_rate_24h && item.change_rate_24h > 0 ? "+" + String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") : String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1")
                  }
                  %
              </li>
              })
            }

          </ul> */}
        </div>
      </div>
    )
  }
}

export default Headernav 
