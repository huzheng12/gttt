import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Spin, Icon } from 'antd';
import { thousands } from '@/utils/prit'
import { pricenubkaicang, pricenubpingcangduo, pricenubpingcangkong } from '../../../action';
import store from '@/scripts/store.js'
import EventFN from '../../../../utils/eventfn';
import { bbinstrumentfn } from '../../../action/bbtion';
var scrollBar_switch = true;
@connect(
  state => {
    return {
      orderBookL2_25obj: state.data.orderBookL2_25obj,
      orderBookL2_25: state.data.orderBookL2_25,
      heyuename: state.data.heyuename,
      instrument: state.data.instrument,
      asset: state.data.asset,
      Decimal_point: state.data.Decimal_point,
      bborder_book: state.bbdata.bborder_book,
      order_bookshu: state.bbdata.order_bookshu,
      bbinstrument: state.bbdata.bbinstrument,
      bbaymbol: state.bbdata.bbaymbol,
      bbasset: state.bbdata.bbasset,
    }
  })

class Weituoliebiao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgArr: {
        jt1: require('../../../img/treaty_price_down01.png'),
        jt2: require('../../../img/treaty_price_down02.png'),
        jt3: require('../../../img/treaty_price_up01.png'),
        jt4: require('../../../img/treaty_price_up02.png'),
        biao: require('../../../img/biao.png'),
        xian: require('../../../img/xian.png'),
      },
      a1heiget:'calc((100% - 70px) / 2)',
      iconbuys:"1"
    }
  }
  imgdongtaijia = () => {
    const { imgArr } = this.state
    const { instrument, bbinstrument } = this.props
    let instrumentaaa
    if (this.props.type !== 'bb') {
      instrumentaaa = instrument
    } else {
      instrumentaaa = bbinstrument
    }

    if (instrumentaaa && instrumentaaa.flgz == "1") {
      return imgArr.jt4
    }
    if (instrumentaaa && instrumentaaa.flgz == "0") {
      return imgArr.jt2
    }
    if (instrumentaaa && instrumentaaa.flgz == "10") {
      return imgArr.jt3
    }
    if (instrumentaaa && instrumentaaa.flgz == "20") {
      return imgArr.jt1
    }
  }
  parice = (b) => {
    store.dispatch(pricenubkaicang(b))
    store.dispatch(pricenubpingcangduo(b))
    store.dispatch(pricenubpingcangkong(b))
  }
  componentDidUpdate() {
    if (this.props.type !== 'bb' && this.props.orderBookL2_25obj.arrAsks[0] && this.props.orderBookL2_25obj.arrBids[0]) {
      if (this.props.orderBookL2_25obj.arrAsks[0].price - this.props.orderBookL2_25obj.arrBids[0].price <= 0) {
        window.wss.send(JSON.stringify({
          "op": "unsub",
          "args": { "instrument_type": "pc", "table": "order_book", "settle_currency":this.props.asset, "symbol": this.props.heyuename }
      }));
        window.wss.send(JSON.stringify({
          "op": "sub",
          "args": { "instrument_type": "pc", "table": "order_book", "settle_currency":  this.props.asset, "symbol": this.props.heyuename }
      }));
      }

    }
    // if (this.props.type == 'bb' && this.props.bborder_book.arrAsks[0] && this.props.bborder_book.arrBids[0]) {
    //   if (this.props.bborder_book.arrAsks[0].price - this.props.bborder_book.arrBids[0].price <= 0) {
    //     window.wss.send(JSON.stringify({
    //       "op": "unsub",
    //       "args": { "instrument_type": "bb", "table": "order_book", "settle_currency":this.props.bbasset, "symbol": this.props.bbaymbol }
    //   }));
    //     window.wss.send(JSON.stringify({
    //       "op": "sub",
    //       "args": { "instrument_type": "bb", "table": "order_book", "settle_currency":  this.props.bbasset, "symbol": this.props.bbaymbol }
    //   }));
    //   }

    // }

  }
 
  paricefn = (data) => {
    store.dispatch({ type: "paricefn", data: data, isof: true })
  }
  render() {
    const {
      heyuename,
      orderBookL2_25obj,
      instrument,
      Decimal_point, bborder_book, order_bookshu, type, bbinstrument

    } = this.props
    const {
      imgArr,a1heiget,iconbuys
    } = this.state
    return (
      <div className="weituo-bable-warp">
        <div className="title-cd drag-handle">
          <FormattedMessage id="DelegationList" defaultMessage={'委托列表'} />
          <span onClick={()=>{
            this.setState({
              a1heiget:'calc((100% - 70px) / 2)',
              iconbuys:'1'
            })
          }}> 
          <svg className={iconbuys=='1'?'icon iconbuyandsale iconbuys':"icon iconbuyandsale"} aria-hidden="true">
          <use xlinkHref="#iconbuyandsale"></use>
        </svg>
        </span>
          <span  onClick={()=>{
            this.setState({
              a1heiget:'0px',
              iconbuys:'2'
            })
          }}> <svg className={iconbuys=='2'?'icon iconbuy iconbuys':"icon iconbuy"} aria-hidden="true">
          <use xlinkHref="#iconbuy"></use>
        </svg></span>
         
          <span  onClick={()=>{
            this.setState({
              a1heiget:'calc(100% - 65px)',
              iconbuys:'3'
            })
          }}> <svg className={iconbuys=='3'?'icon iconbuy iconbuys':"icon iconbuy"} aria-hidden="true">
          <use xlinkHref="#iconsale"></use>
        </svg></span>
        </div>
        <div className="title-boxtou">
          <div className="tite-biaoti" style={{
            textAlign:'left',paddingLeft:16,wordBreak:'break-all'
          }}><FormattedMessage id="Price" defaultMessage={'价格'} />(USDT)&emsp;</div>
          <div className="tite-biaoti"><FormattedMessage id="Number" defaultMessage={'数量'} />({type === 'bb' ?bbinstrument.symbol && bbinstrument.symbol.split(bbinstrument.split_char)[0]:<FormattedMessage id="Zhang" defaultMessage={'张'} />})</div>
          <div className="tite-biaoti"><FormattedMessage id="Cumulants" defaultMessage={'累积量'} /></div>
        </div>
        <div className="module-body g-scrollbar" id="scrollBar">
          <ul className="ul-a1" style={{height:a1heiget,overflow:'hidden'}}>
            {
              (type === 'bb' ? bborder_book : orderBookL2_25obj).arrAsks.map((item, i) => {
             
                return (
                  <div key={"1321321" + i} className={item.size ? "div-liweituo" : "liweituo-div"}>
                    <div onClick={type !== 'bb' && item.size ? () => this.parice(item.price) : () => this.paricefn(item.price)}
                      className="section-tou"
                      style={{ fontSize: 12, cursor: "pointer" }}>
                      {
                        // EventFN.CurrencyDigitLimit({
                        //   type: type !== 'bb' ? Decimal_point : bbinstrument.price_precision,
                        //   content: item.price
                        // })
                        item.price
                      }&emsp;</div>
                    <div style={{ fontSize: 12 }}
                      className={
                        item.color_size == 1 ? "section-red1 bg-change-red" :
                          item.color_size == 2 ? "section-red1 bg-change-green" :
                            item.color_size == 11 ? "section-red1 bg-change-reds" :
                              item.color_size == 22 ? "section-red1 bg-change-greens" :
                                "section-red1"
                      }>

                      {
                        EventFN.CurrencyDigitLimit({
                          type: type !== 'bb' ? '0' : bbinstrument.number_precision,
                          content: item.size
                        })
                      }
                    </div>
                    {
                      item.price ? <div className="section-foot">
                        <div className="b" style={{
                          width: item.bgcolor * 100 + '%', backgroundColor:
                            i % 2 == 0 ? "rgba(140,42,42,.3)" : "rgba(140,42,42,.15)"
                        }}></div>
                        <div className="w">
                          {
                            EventFN.CurrencyDigitLimit({
                              type: type !== 'bb' ? '0' : bbinstrument.number_precision,
                              content: item.ljl
                            })
                          }

                        </div>
                      </div> : ""
                    }
                  </div>
                )
              })
            }
          </ul>

          {
            type !== 'bb' ? orderBookL2_25obj.arrBids ? <div className="section-titlt ul-a2" style={{ height: 55 }}>
              <div className="section-img-box" style={{
                color: (() => {
                  let instrumentaaa
                  if (this.props.type !== 'bb') {
                    instrumentaaa = instrument
                  } else {
                    instrumentaaa = bbinstrument
                  }
                  if (instrumentaaa.flgz === "1" || instrumentaaa.flgz === "10") {
                    return "rgba(38, 153, 78, 1)"
                  } else {
                    return "#EE6560"
                  }
                })(), whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontWeight: 900
              }}>
                {
                  EventFN.CurrencyDigitLimit({
                    type: type !== 'bb' ? Decimal_point : bbinstrument.price_precision,
                    content: type === 'bb' ? bbinstrument.last_price : instrument.last_price
                  })
                }
                <img src={this.imgdongtaijia()} alt="" />
              </div>

              <div className="section-titless">
                <div className="diqiu-img-l" style={{ height: 24 }}>
                  <div style={{
                    fontSize: 12, color: "rgba(153,149,145,1)", whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis', overflow: 'hidden'
                  }}>{
                      EventFN.CurrencyDigitLimit({
                        type: type !== 'bb' ? Decimal_point : bbinstrument.price_precision,
                        content: type === 'bb' ? bbinstrument.index_price : instrument.index_price
                      })

                    }</div>
                  <img src={imgArr.xian} alt="" />
                </div>
                <span className="gangg"></span>
                <div className="diqiu-img-r" style={{ height: 24 }}>
                  <img src={imgArr.biao} alt="" />
                  <div style={{
                    fontSize: 12, color: "#4D4D4D",
                    whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'
                  }}>{
                      EventFN.CurrencyDigitLimit({
                        type: type === 'bb' ? Decimal_point : bbinstrument.price_precision,
                        content: type === 'bb' ? bbinstrument.mark_price : instrument.mark_price
                      })
                    }</div>
                </div>
              </div>
            </div> : <Spin /> : bborder_book.arrBids ? <div className="section-titlt ul-a2" style={{ height: 55 }}>
              <div className="bbsection-img-box" style={{
                color: (() => {
                  if (bbinstrument.change_rate_24h * 1 >= 0) {
                    return "#26994E"
                  } else {
                    return "#E53F39"
                  }
                })(), whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontWeight: 900
              }}>
                {
                  // EventFN.CurrencyDigitLimit({
                  //   type: type !== 'bb' ? Decimal_point : bbinstrument.price_precision,
                  //   content: type === 'bb' ? bbinstrument.last_price : instrument.last_price
                  // })
                  type === 'bb' ? bbinstrument.last_price : instrument.last_price
                }
                &nbsp;
                 {
                  (type === 'bb' ? bbinstrument : instrument).change_rate_24h ? (type === 'bb' ? bbinstrument : instrument).change_rate_24h >= 0 ? <span className="iconfont imgastd" style={{ color: "#26994E" }}>&#xe60e;</span> : <span className="iconfont imgastd" style={{ color: "#E53F39" }}>&#xe610;</span> : ""
                }
                {/* <img src={this.imgdongtaijia()} alt="" /> */}
              </div>
            </div> : <Spin />
          }
          <ul className="ul-a2">
            {
              (type === 'bb' ? bborder_book : orderBookL2_25obj).arrBids.map((item, i) => {
                return (
                  <div key={"1321321" + i} className={item.size ? "div-liweituo uli-a10" : "liweituo-div"} >
                    <div onClick={type !== 'bb' && item.size ? () => this.parice(item.price) : () => this.paricefn(item.price)}
                      className="section-tou"
                      style={{ color: "#26994E", fontSize: 12, cursor: "pointer" }}>{
                        // EventFN.CurrencyDigitLimit({
                        //   type: type !== 'bb' ? Decimal_point : bbinstrument.price_precision,
                        //   content: item.price
                        // })
                        item.price
                      }&emsp;</div>
                    <div style={{ fontSize: 12 }} className={
                      item.color_size == 1 ? "section-red1 bg-change-red" :
                        item.color_size == 2 ? "section-red1 bg-change-green" :
                          item.color_size == 11 ? "section-red1 bg-change-reds" :
                            item.color_size == 22 ? "section-red1 bg-change-greens" :
                              "section-red1"
                    }>
                      {
                        EventFN.CurrencyDigitLimit({
                          type: type !== 'bb' ? '0' : bbinstrument.number_precision,
                          content: item.size
                        })
                      }
                    </div>
                    {
                      item.price ? <div className="section-foot">
                        <div className="b" style={{ width: item.bgcolor * 100 + '%', backgroundColor: i % 2 == 0 ? "rgba(38,153,78,.3)" : "rgba(38,153,78,.15) " }}></div>
                        <div className="w">
                          {

                            EventFN.CurrencyDigitLimit({
                              type: type !== 'bb' ? '0' : bbinstrument.number_precision,
                              content: item.ljl
                            })

                          }
                        </div>
                      </div> : ""
                    }

                  </div>
                )
              })
            }
          </ul>
        </div>
      </div >
    );
  }
}

export default Weituoliebiao;

