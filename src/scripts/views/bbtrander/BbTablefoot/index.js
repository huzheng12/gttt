import React, { Component } from 'react'
import { Tabs } from 'antd';
import Onesingle from './onesingle';
import { Xfn } from '../../../../utils/axiosfn';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { NavLink } from "react-router-dom"

const { TabPane } = Tabs;


@connect(
  state => {
    return {
			bbactive_order: state.bbdata.bbactive_order,
		}
  }
)
 class BbTablefoot extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      imgArr: {
        ioo: require("../../../img/nothing_data.png"),
      },
      datanull:'0'
    }
  }
  componentDidMount() {
    if(localStorage.userInfo){
      setTimeout(()=>{
        this.history_data()

      },2000)

    }
  }
  dangqianchipang = (a, b) => {
    if (localStorage.userInfo) {
      if (b != "1") {
        return <div style={{ position: "relative", zIndex: 999, width: "100%", textAlign: 'center', lineHeight: "200px" }}>
          < FormattedMessage id="Loading" defaultMessage={'加载中'} />
          ...</div>
      } else {
        if (a <= 0) {
          return <div className="tablemeishuju">
            <img src={this.state.imgArr.ioo} alt="" />
            <div>
              < FormattedMessage id="You_dont_have_data" defaultMessage={'您暂时还没有相关数据'} />
            </div>
          </div>
        }
      }
    } else {
      return <div className="tablemeishuju">
        <img src={this.state.imgArr.ioo} alt="" />
        <div>
          < FormattedMessage id="You_must" defaultMessage={'您必须'} />
          <NavLink style={{ margin: "0 5px" }} to="/login"> < FormattedMessage id="Sign_in" defaultMessage={'登录'} /></NavLink>
          < FormattedMessage id="Only_then_see_information" defaultMessage={'才可以看到此信息'} />
        </div>
      </div>
    }
  }
  history_data = (url) => {

    Xfn({
      _u: 'bborderquery_history',
      _m: 'get',
      _p: {
        asset: this.props.bbasset,// 资产 USD,必填,
        symbol: this.props.bbaymbol, //交易对,非必填,
        // bid_flag: '1', //1.买入,0.卖出,非必填,
        // last_order_id: 'id', //当前页最后一张委托的id, 非必填,
        next_page: "1", //翻页标记,-1 上一页 , 1.下一页 必填,,
        page_size: "20", //页行数 ,必填
      }
    }, (res, code) => {
      if (code === 0) {
        console.log(res)
        this.setState({
          data: res.data.data.rows?res.data.data.rows:[],
          datanull:'1'
        })
      }
    })
  }
  callback = (value) => {
    if(localStorage.userInfo&&value==='2'){

      this.history_data()
    }
  }
  //撤销淡定
  Cancel_order = (data) => {
    console.log(data)
    Xfn({
      _u: "bbordercancel",
      _m: "post",
      _p: {
        order_id: data.id,// 委托id,必填
        asset: data.asset,// 资产 USD,必填
        symbol: data.symbol,// 交易对,必填
        bid_flag: data.bid_flag,// 1.买入,0.卖出,必填
      }
    }, (res, code) => {

    },'撤单成功')
  }
  render() {
    const {
      data,datanull
    } = this.state
    const {
      bbactive_order
    }=this.props
    return (
      <div className="bbtablefoot_warp">
        <Tabs defaultActiveKey="1" style={{height:"100%"}} onChange={this.callback}>
          <TabPane style={{height:"100%",overflow:'auto'}} tab={"当前委托["+(localStorage.userInfo?bbactive_order.order_total?bbactive_order.order_total:'--':'0')+"]"} key="1">
          {this.dangqianchipang(bbactive_order.data&&bbactive_order.data.length,'1')}

            {
              localStorage.userInfo&&bbactive_order.data&&bbactive_order.data.map((itme, index) => {
                return <Onesingle Cancel_order={this.Cancel_order} data={itme} type='1' key={index + itme}></Onesingle>

              })
            }
             {
              localStorage.userInfo&&bbactive_order.data&&bbactive_order.order_total-bbactive_order.data.length >0? <NavLink className="chak" to="/histororder/bbhistry">
                查看更多
              </NavLink>:''
             }
          </TabPane>
          <TabPane tab="历史委托" key="2">
          {this.dangqianchipang(data,datanull)}
             {
               console.log(data,'[[[[[')
             }
            <div className="bbtablefoot_warp_box">
            {localStorage.userInfo&&data.map((itme, index) => {
              return <Onesingle Cancel_order={this.Cancel_order} data={itme} type='2' key={index + itme}></Onesingle>

            })}

            </div>
          </TabPane>

        </Tabs>
      </div>
    )
  }
}
export default BbTablefoot