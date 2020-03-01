import React, { Component } from 'react'
import { connect } from "react-redux";
import store from '../../../store';
import { Xfn } from '../../../../utils/axiosfn';
import { bbsymbolfn } from '../../../action/bbtion';
import bbSubscribe from '../../../../utils/bb_send_unp';

let assetquanbu=null

@connect(
  state => {
    return {
      bbassetArr: state.bbdata.bbassetArr,
      bbasset: state.bbdata.bbasset,
      bbaymbol: state.bbdata.bbaymbol,
      bbsymbolArr: state.bbdata.bbsymbolArr,
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
      bbclkasset:"USDT",
      bbsyblarr:[],isOk:true
    }
  }
  componentDidMount(){
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
              bbsyblarr:res.data.data.rows
            })
          }
				})
			}
		})
	}
  dianji=(value)=>{
    if(!this.state.isOk){
      return false
    }
    assetquanbu= value
    this.setState({
      bbclkasset:value,
      isOk:false
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
          bbsyblarr:res.data.data.rows,
          isOk:true
        })
      }
    })
  }
  symbolfn=(value)=>{
    store.dispatch({type:"bbassetgaibaian",data:assetquanbu})
    store.dispatch({type:'bbsymbolgaibaian',data:value})
    bbSubscribe({
      bbaymbol :value,
      bbasset:assetquanbu,
    })
   
  }
  render() {
    const {
      imgArr,bbclkasset,bbsyblarr
    } = this.state
    const {
      bbassetArr,bbasset,bbsymbolArr
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
                return <li key={item + index} onClick={()=>this.dianji(item.asset)} className={bbclkasset!==item.asset?"box_bbspan":'box_bbspan1 box_bbspan'}>{
                  item.asset
                }</li>
              })
            }

          </ul>
          <ul className="box_bb box_bb2">
            {
              bbsyblarr.map((item,index)=>{
                return <li key={item+index} onClick={()=>this.symbolfn(item.symbol)}>
                  {
                    item.symbol
                  }
                </li>
              })}
          </ul>
          <ul className="box_bb box_bb3">
            <li>1</li>
            <li>2</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Headernav 
