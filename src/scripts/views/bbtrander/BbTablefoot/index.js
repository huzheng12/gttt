import React, { Component } from 'react'
import { Tabs } from 'antd';
import Onesingle from './onesingle';
import { Xfn } from '../../../../utils/axiosfn';
let url_bb = 'bborderquery'
const { TabPane } = Tabs;
export default class BbTablefoot extends Component {
  constructor() {
    super()
    this.state = {
      data: [{
        "id": "1",
        "status": "1",                 //委托状态  1:已创建未匹配 2:新建未成交 4:待取消 8:已取消 16:部分成交 32:全部成交           
        "fee": "0.001",                //手续费     
        "price": "10035",              //委托价            
        "qty": "2",                    //量
        "bid_flag": "1",               //1.多 0.空
        "asset": "USD",                  //资产
        "symbol": "BTC_USD",            //交易对
        "ctime": "1564482914569",      //委托创建时间
        "avg_price": "10025",          //平均价
        "filled_qty": "1.1",           //已成交量
        "trade_ratio": "0.01",         //成交比例,表示 1%
        "order_type": "1"              //委托类型 1:限价
      }]
    }
  }
  componentDidMount() {
    this.history_data('bborderquery')
  }
  history_data = (url) => {

    Xfn({
      _u: url,
      _m: 'get',
      _p: {
        asset: this.props.bbasset,// 资产 USD,必填,
        symbol: this.props.bbaymbol, //交易对,非必填,
        // bid_flag: '1', //1.买入,0.卖出,非必填,
        // last_order_id: 'id', //当前页最后一张委托的id, 非必填,
        next_page: "-1", //翻页标记,-1 上一页 , 1.下一页 必填,,
        page_size: "20", //页行数 ,必填
      }
    }, (res, code) => {
      if (code === 0) {
        this.setState({
          data: res.data.data.rows
        })
      }
    })
  }
  callback = (value) => {

    if (value === '2') {
      url_bb = "bborderquery_history"
    } else {
      url_bb = "bborderquery"
    }
    this.history_data(url_bb)
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
      this.history_data(url_bb)
    })
  }
  render() {
    const {
      data
    } = this.state
    return (
      <div className="bbtablefoot_warp">
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="当前持仓[0]" key="1">
            {
              data.map((itme, index) => {
                return <Onesingle Cancel_order={this.Cancel_order} data={itme} type='1' key={index + itme}></Onesingle>

              })
            }
          </TabPane>
          <TabPane tab="历史委托" key="2">
            {data.map((itme, index) => {
              return <Onesingle Cancel_order={this.Cancel_order} data={itme} type='2' key={index + itme}></Onesingle>

            })}
          </TabPane>

        </Tabs>
      </div>
    )
  }
}
