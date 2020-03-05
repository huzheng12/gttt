import React, { Component } from 'react';
import './index.scss'
import Biaoti from '../componetn/biaoti';
import { Xfn } from '../../../../utils/axiosfn';
import lang from '@/utils/language';
import { FormattedMessage } from 'react-intl';
import { Tabs } from 'antd';
import Tableshouxufei from './tableshouxufei';

const { TabPane } = Tabs;
class Shouxufei extends Component {
  constructor() {
    super()
    this.state = {
      tou: lang().Fee_Level,
      imgArr: {
        lv1: require('../../../img/lv1.png'),
        lv2: require('../../../img/lv2.png'),
        lv3: require('../../../img/lv3.png'),
        lv4: require('../../../img/lv4.png'),
        lv5: require('../../../img/lv5.png'),
        lv6: require('../../../img/lv6.png'),
        lv7: require('../../../img/lv7.png'),
        lv8: require('../../../img/lv8.png'),
      },
      lll: "<5000",
      getPcFeeListData: [],
      bbgetPcFeeListData: [],
      getUserFeeObj: {},
      zsxx: {}
    }
  }
  componentDidMount() {
    Xfn({
      _u: "aqguci",
      _p: { time: new Date().getTime().toString() },
      _m: "post"
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          zsxx: res.data.data,
        })
      }
    })
    Xfn({
      _u: "getPcFeeList",
      _m: 'get',
      _p: {
        fee_level_type:'2'
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          getPcFeeListData: res.data.data.rows
        })
      }
    })
    Xfn({
      _u: "getPcFeeList",
      _m: 'get',
      _p: {
        fee_level_type:'1'
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          bbgetPcFeeListData: res.data.data.rows
        })
      }
    })
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
  callback = (value) => {
    console.log(value)
  }
  render() {
    const { tou, getPcFeeListData, bbgetPcFeeListData,getUserFeeObj, imgArr, zsxx } = this.state
    return (
      <div className="sxf-warp">
        <Biaoti flg={false} title={tou} ></Biaoti>
        <div className="content-box">
          <div className="content-box-li">
            <div className="li_span_h1">
              {lang().Current_transaction_handling_rate}
            </div>
            <div className="clear" style={{ marginBottom: 15 }}>
              <div className="tr-guadan ">
               <p className="row-tr-guadan">近30天交易量(截止到昨天)</p>
               <p className="row-tr-guadan">
                 <div className="left">币币</div>
                 <div className="right">{getUserFeeObj.volume?getUserFeeObj.bb_volume:"--"} BTC</div>
               </p>
               <p className="row-tr-guadan row-tr-guadans">
                 <div className="left">永续合约</div>
                 <div className="right">{getUserFeeObj.volume?getUserFeeObj.volume:"--"} BTC</div>
               </p>              </div>
              {/* <div className="tr-guadan ">
                <p>Maker（{lang().List}）</p>
                <p className="span-tr-guad">{getUserFeeObj.maker_fee}%</p>
              </div>
              <div className="tr-guadan ">
                <p>Taker（{lang().Bill_of_fare}）</p>
                <p className="span-tr-guad">{getUserFeeObj.taker_fee}%</p>
              </div> */}
              <div className="tr-guadan tr-guadans ">
                <p className="row_pans">
                  <span>
                  提现额度
                    </span>
                    <span className="shul">
                    {getUserFeeObj.maker_fee?getUserFeeObj.withdraw_limit:"--"} BTC
                    </span>
                </p>
                <div className="row_pans">
                  <span>币币手续费</span>
                  <span>挂单成交{getUserFeeObj.maker_fee?String(getUserFeeObj.bb_maker_fee * 100).replace(/^(.*\..{2}).*$/, "$1"):"--" + '%'}</span>
                  <span>吃单成交{getUserFeeObj.maker_fee?String(getUserFeeObj.bb_taker_fee * 100).replace(/^(.*\..{2}).*$/, "$1"):'--' + '%'}</span>
                </div>
                <div className="row_pans">
                  <span>永续合约手续费</span>
                  <span>挂单成交{getUserFeeObj.maker_fee?String(getUserFeeObj.maker_fee * 100).replace(/^(.*\..{2}).*$/, "$1"):'--' + '%'}</span>
                  <span>吃单成交{getUserFeeObj.maker_fee?String(getUserFeeObj.taker_fee * 100).replace(/^(.*\..{2}).*$/, "$1"):'--' + '%'}</span>
                </div>
              </div>
            </div>
            <div className="p-gd ">

              < FormattedMessage id="Fee_Level_notice_text_1" defaultMessage={'*Maker是以指定价格下单，未立即与订单簿中其他订单成交，而是进入订单列表，等待交易对手单的行为；'} />
            </div>
            <div className="p-gd ">
              < FormattedMessage id="Fee_Level_notice_text_2" defaultMessage={'*Taker是以指定价格(同时订单簿存在相同价格)下单，并立即与订单簿中其他订单成交的行为；'} />
            </div>
            <div className="p-gd ">
              < FormattedMessage id="Fee_Level_notice_text_3" defaultMessage={'*基础费率变动请以相关公告为准。'} />

            </div>
            <img src={(() => {
              switch (zsxx.user_level) {
                case "1": return imgArr.lv1
                case "2": return imgArr.lv2
                case "3": return imgArr.lv3
                case "4": return imgArr.lv4
                case "5": return imgArr.lv5
                case "6": return imgArr.lv6
                case "7": return imgArr.lv7
                case "8": return imgArr.lv8
                default: return imgArr.lv1;
              }
            })()} alt="" />
          </div>


          {/* <div className="content-box-li" style={{ marginTop: 53 }}>
            <div className="li_span_h1">
              < FormattedMessage id="Level_rate_description" defaultMessage={'等级费率说明'} />

            </div>
            <div className="yige clear">
              <div className="tr-sfx">
                <div className="t">
                  < FormattedMessage id="Trading_volume_in_the_past_30_days" defaultMessage={'近30天交易量'} />
                </div>
                <div className="n">
                  < FormattedMessage id="Sustainable_contract" defaultMessage={'永续合约'} />
                  {getUserFeeObj.volume}BTC
                  </div>
              </div>
              <div className="tr-sfx">
                <div className="t">
                  < FormattedMessage id="Withdrawal_limit_used" defaultMessage={'已用提现额度'} />

                </div>
                <div className="n">
                  {getUserFeeObj.withdraw_limit}BTC
                  </div>
              </div>
            </div>
          </div> */}
        
          <div className="content-box-li" style={{ marginTop: 53 }}>
            <div className="li_span_h1" style={{ marginBottom: 30 }}>
              < FormattedMessage id="Hierarchical_description" defaultMessage={'等级说明'} />

            </div >
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="币币交易" key="1">
                <Tableshouxufei getPcFeeListData={bbgetPcFeeListData}></Tableshouxufei>
              </TabPane>
              <TabPane tab="永续合约" key="2">

                <Tableshouxufei getPcFeeListData={getPcFeeListData}></Tableshouxufei>

              </TabPane>

            </Tabs>

          </div>
        </div>
      </div>
    );
  }
}

export default Shouxufei;