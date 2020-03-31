import React, { Component } from 'react';
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';
import { Button, Popover, Input, Tooltip } from 'antd';
import { history } from '@/utils/history'
import './index.scss'
import { FormattedMessage } from 'react-intl';

import store from '../../store';
import { wsreconnect, candlefunallction, assetfn } from '../../action';
import { NavLink } from "react-router-dom";
import { Xfn } from '../../../utils/axiosfn';
import Qrcode from "qrcode.react";
import { downloadgeturlfn } from '../../action/tction';
import Bg_xx from './bg_xx';
import Firstloading from '../../components/Firstloading';
import { connect } from "react-redux";
import LoginPhoneEmail from '../../components/login';
import Echartscont from './echartscont';
import { numberHandle } from '../../../utils/numberHandle';
const { Search } = Input;
@connect(
  state => {
    return {
      ...state.data,
      ...state.datum,
      ...state.bbdata,
      downloadget_url: state.tction.downloadget_url,
      downloadget_url_flg: state.tction.downloadget_url_flg,

    }
  }
)
class Sices extends Component {
  constructor() {
    super()
    this.state = {
      imgarr: {
        banner02: require('../../img/shouji.png'),
        banner03: require('../../img/android.png'),
        banner04: require('../../img/ios.png'),
        banner05: require('../../img/bulletin.png'),
        banner06: require('../../img/slices/yuhangyuan.png'),
        banner07: require('../../img/home_bg.png'),
      },
      mp4: require('../../img/slices/bg.mp4'),
      heyuenameischange: 1,
      kline_datas: [],
      dataRes: null,
      flg: true,
      content: 'https://test-gte.s3-ap-northeast-1.amazonaws.com/安卓/gte_1.0.apk',
      information: [],
      isInsement: true,
      input_acc: '',
      arr_data: [{ symbol: "ETH_USDT", a: '7.00' }, { symbol: "EOS_USDT" }],
      a: true,
      c2cmin:{},
      exchange_rate_data:{}
    }
  }
  input_acc = (val) => {
    this.setState({
      input_acc: val.target.value
    })
  }
  componentDidMount() {
    const bodys = document.getElementsByTagName("body")[0]
    bodys.className = "theme-dark"
    this.sendMessage()
    store.dispatch({ type: "differentiatedtransactions", num: 1 })
    Xfn({
      _u: 'information_url',
      _m: "get",
      _p: {
        type: "2",
        limit: "3"
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          information: res.data.data.rows
        })
      }
    })
    Xfn({
      _u:"c2min_query",
      _m:"get",
      _p:{}
    },(res,code)=>{
      if(code===0){
        console.log(res.data.data,'00000')
        this.setState({
          c2cmin:res.data.data
        })
      }
    })
    Xfn({
      _u: 'c2crate_query',
      _m: "get",
      _p: {
        source_asset: 'CNY',// 原资产 必填
        target_asset: 'USDT',// 兑换资产 必填
      }
    }, (res, code) => {
      if (code === 0) {
        this.setState({
          exchange_rate_data: res.data.data
        })
      }
    })
  }
  componentDidUpdate() {
    if (this.props.downloadget_url_flg === 1) {
      for (let i = 0; i < this.props.downloadget_url.app_list.length; i++) {
        if (this.props.downloadget_url.app_list[i].id === "3") {
          this.setState({
            content: this.props.downloadget_url.app_list[i].link_url
          })
        }
      }
      store.dispatch(downloadgeturlfn({
        downloadget_url_flg: 0
      }))
    }
    if ((this.props.ws_connect == 1 || this.props.isLogin == 1) && this.props.bbasset) {
      setTimeout(() => {
        if (window.wss.OPEN == 1) {
          if (this.state.isInsement) {
            this.setState({
              isInsement: false
            })
            window.wss.send(JSON.stringify({
              "op": "sub",
              "args": { "instrument_type": "bb", "table": "instrument_all_full", "settle_currency": this.props.bbasset }
            }))
            window.wss.send(JSON.stringify({
              "op": "sub",
              "args": { "instrument_type": "pc", "table": "instrument_all_full", "settle_currency": this.props.asset }
            }))
          } else {
            if (this.props.bbsymbolArr.length !== 0) {
              for (let i = 0; i < this.props.bbsymbolArr.length; i++) {
                window.wss.send(JSON.stringify({
                  "op": "sub",
                  "args": { "instrument_type": "bb", "table": "candle", "settle_currency": this.props.bbsymbolArr[i].settle_currency, "symbol": this.props.bbsymbolArr[i].symbol, "interval": "1" }
                }))
              }
              store.dispatch(wsreconnect(0))
            }
          }
        }
        this.sendMessage()
      }, 100)
    } else {
      if (this.props.isHistory === 0 && this.props.asset) {
        if (window.wss.OPEN == 1) {
          setTimeout(() => {
            window.wss.send(JSON.stringify({
              "op": "sub",
              "args": { "instrument_type": "bb", "table": "instrument_all_full", "settle_currency": this.props.bbasset }
            }))
            for (let i = 0; i < this.props.instrumentArr.length; i++) {
              window.wss.send(JSON.stringify({
                "op": "sub",
                "args": { "instrument_type": "bb", "table": "candle", "settle_currency": this.props.bbsymbolArr[i].settle_currency, "symbol": this.props.bbsymbolArr[i].symbol, "interval": "1" }
              }))
            }
            store.dispatch({ type: "isHistory", isHistory: 1 })
          }, 100)
        }
      }
    }
  }
  sendMessage = () => {
    setTimeout(() => {
      for (let i = 0; i < this.props.bbsymbolArr.length; i++) {
        Xfn({
          _u: "bbcandlehistory",
          _m: "get",
          _p: {
            asset: "USDT",
            symbol: this.props.bbsymbolArr[i].symbol,
            start_time: (new Date().getTime() - 400 * 60 * 1000).toString(), //开始时间毫秒,
            end_time: (new Date().getTime()).toString(),
            interval: "1"
          }
        }, (res, code) => {
          if (code == 0) {
            store.dispatch(candlefunallction(res.data, this.props.bbsymbolArr[i].symbol))
          }
        })
      }
    }, 100)

  }
  componentWillUnmount() {
    window.scrollTo(0,0)
    store.dispatch({ type: "differentiatedtransactions", num: 0 })
    if (window.wss.OPEN == 1) {
      for (let i = 0; i < this.props.bbsymbolArr.length; i++) {
        window.wss.send(JSON.stringify({
          "op": "unsub",
          "args": { "instrument_type": "pc", "table": "candle", "settle_currency": this.props.asset, "symbol": this.props.bbsymbolArr[i].symbol, "interval": "1" }
        }))
      }
      window.wss.send(JSON.stringify({
        "op": "unsub",
        "args": { "instrument_type": "pc", "table": "instrument_all_full", "settle_currency": this.props.asset }
      }))
    }
  }
  goumaitiao = (val) => {
    store.dispatch({ type: "goumaitiao", data: val })
    history.push('/BBTradePage')
  }
  render() {
    const {
      imgarr,
      mp4,
      content,
      information,
      arr_data,
      c2cmin,
      exchange_rate_data
    } = this.state
    const {
      instrumentArr,
      k_line_home_page, bbinstrumentArr
    } = this.props
    return this.props.a ? <Firstloading></Firstloading> : (<div className="sices-warp">
      <Header></Header>
      <div className="sices-warp-box" style={{ height: 398 }}>
        <div className="vidage">
          <Bg_xx></Bg_xx>
          <div className="img_gb_png_box">
            <img className="img_gb_png" src={imgarr.banner06} alt="" />

          </div>
        </div>
        <div className="img-box" >
          <div className="hezi clear">
            <div className="hezi-left" >
              <div className="x" style={{ marginTop: localStorage.language == "en" ? "71px" : "91px" }}>
                <FormattedMessage id="Next_Generation_Encrypted_Asset_Trading_Platform" defaultMessage={'下一代加密资产交易平台'} />
              </div>
              <div className="g">
                <FormattedMessage id="Welcome_to_the_most" defaultMessage={'高达100倍杠杆。交易永续合约。业界领先的安全性。欢迎来到最先进的比特币交易平台。'} />
              </div>
              <div className="b">
                <Button className="bglanse" onClick={() => {
                  store.dispatch({ type: "isHistory", isHistory: 1 })
                  localStorage.userInfo ? history.push('/transaction/cont') : history.push('/fulltrade')
                }}>
                  <FormattedMessage id="View_Real_time_Market" defaultMessage={'查看实时行情'} />
                </Button>
              </div>
            </div>

          </div>

        </div>


      </div>
      <div className="c2cjioaiyisj">
        <div className="c3ctiaozhuan_box clear">
          <div className="left">
            <div>
              我要买
            </div>
            <div className="lefttext">
              参考价：{exchange_rate_data.exchange_rate&&numberHandle((1 / exchange_rate_data.exchange_rate + exchange_rate_data.fee * 1), 2, 2)}CNY/USDT
            </div>
          </div>
          <div className="right clear">
            <Search
              placeholder={c2cmin.min_in&&c2cmin.min_in+"USDT起"}
              enterButton={"立即购买 "}
              style={{ height: 44 }}
              size="large"
              suffix={
                <Tooltip className="tooltip-001">
                  USDT
              </Tooltip>}
              onSearch={value => {
                if (localStorage.userInfo) {

                  if (value) {
                    history.push('/C2Cdeal/index?account=' + value)

                  } else {
                    history.push('/C2Cdeal/index')
                  }
                } else {
                  history.push('/login')
                }
              }}
            />

          </div>
        </div>
        <div className="tongzhilan" style={{ textAlign: 'center' }}>
          {information ? information.map((item, index) => {
            if (index < 3) {
              return <div className="tongzhilangg" key={item + index}>
               
                <a style={{ color: "#fff", display: "inline-block" }} href={item.link_url} target="_blank" dangerouslySetInnerHTML={{ __html: item.title }}></a>
              </div>
            }
          }) : ""}
        </div>
      </div>
      <div className="jiaoyiwss_box">
        <div className="cneten_box">
          <div className="tiole">
            主流币
          </div>
          <div className="cow_box">
            <div className="cow_box_title">
              <div className="tr" style={{ width: 233 }}>USDT市场</div>
              <div className="tr" style={{ width: 238 }}>价格</div>
              <div className="tr" style={{ width: 313, textAlign: "center" }}>涨跌幅</div>
              <div className="tr" style={{ width: 233, textAlign: "center" }}>行情</div>
              <div className="tr" style={{ textAlign: 'right', width: 233 }}>交易</div>
            </div>
            {
              bbinstrumentArr.length > 0 && bbinstrumentArr.map((item, index) => {
                return <div onClick={() => this.goumaitiao(item.symbol)} className="instrument" key={item + index}>
                  <div className="tr" style={{ width: 233, color: "#fff" }}>
                    <img src={item.icon_url} alt="" />
                    <span className="bb">
                      {item.symbol.split('/')[0]}
                    </span>
                    <span className="zc">
                      {item.symbol_chinese}
                    </span>
                  </div>
                  <div className="tr" style={{ width: 238, color: "#fff" }}>
                    $ {item.last_price}


                  </div>
                  <div className="tr" style={{ width: 313, color: item.change_rate_24h && item.change_rate_24h >= 0 ? "#26994E" : "#E53F39", textAlign: "center" }}>

                    {
                      item.change_rate_24h && item.change_rate_24h >= 0 ? "+ " + String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1")+'%': String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1")+'%'
                    }

                  </div>
                  <div className="tr" style={{ width: 233 }}>
                    <Echartscont _id={"chartmain" + index} dataRes={k_line_home_page[item.symbol]} hhv={item.change_rate_24h} candle={this.props.candles[item.symbol] && this.props.candles[item.symbol].data}></Echartscont>

                  </div>
                  <div className="tr" style={{ textAlign: 'right', width: 233 }}> <Button >购买</Button></div>

                </div>
              })
            }
          </div>
        </div>
      </div>
      <div className="bottom-box">
        <div className="flacol clear" >
          <div className="cow" style={{ marginTop: 81 }}>
            <div className="span-tit">
              $4.05B
                </div>
            <div className="span-cos-1">
              24<FormattedMessage id="hour" defaultMessage={'小时'} />
            </div>
          </div>
          <div className="cow" style={{ marginTop: 81 }}>
            <div className="span-tit">
              $110.60B
                </div>
            <div className="span-cos-1">
              30<FormattedMessage id="day" defaultMessage={'天'} />
            </div>
          </div>
          <div className="cow" style={{ marginTop: 81 }}>
            <div className="span-tit">
              $1.06T
                </div>
            <div className="span-cos-1">
              365<FormattedMessage id="day" defaultMessage={'天'} />
            </div>
          </div>

        </div>
        <div className="flacol clear">
          <div className="cow">
            <div className="span-tit">
              $1500%
                </div>
            <div className="span-cos-1">
              <FormattedMessage id="Our_Bitcoin_Dollar_products" defaultMessage={'我们的 比特币/美元 产品比其他任何平台拥有更多的流动性。GTE 的比特币美元市场是全球流动性最好。'} />
            </div>
          </div>
          <div className="cow">
            <div className="span-tit">
              100
                </div>
            <div className="span-cos-1">
              <FormattedMessage id="Number_of_audits_per_second" defaultMessage={'每秒审计次数。GTE 的引擎不间断地审核所有账户的余额和历史纪录。'} />
            </div>
          </div>
          <div className="cow">
            <div className="span-tit">
              0
                </div>
            <div className="span-cos-1">
              <FormattedMessage id="BitcoinLostByInvasionOrBlackout" defaultMessage={'通过入侵或被黑而丢失的比特币。GTE 在冷钱包中安全地保持所有资金。'} />
            </div>
          </div>

        </div>
        <div className="flacol clear">
          <div className="cow">
            <div className="span-tit" >
              <FormattedMessage id="UniqueProducts" defaultMessage={'独特的产品'} />
            </div>
            <div className="span-cos-1">
              <FormattedMessage id="GTEProvidesUpTo100TimesLeverag" defaultMessage={'GTE 对于比特币合约提供高达 100 倍的杠杆，同时也对于山寨币合约提供高杠杆。'} />
            </div>
          </div>
          <div className="cow">
            <div className="span-tit">
              <FormattedMessage id="Advanced" defaultMessage={'进阶'} /> API
                </div>
            <div className="span-cos-1">
              <FormattedMessage id="OurTradingEngineUsesThe" defaultMessage={'我们的交易引擎使用的技术与投资银行和对冲基金所使用的技术相同。'} />

            </div>
          </div>
          <div className="cow">
            <div className="span-tit" >
              <FormattedMessage id="LeadingSecurity" defaultMessage={'领先的安全性'} />
            </div>
            <div className="span-cos-1">
              <FormattedMessage id="GTEAdoptsTheLatestMulti" defaultMessage={' GTE 自内而外采用最新的多重因素安全机制。安全是我们首要的任务。'} />
            </div>
          </div>

        </div>
      </div>
      <div className="footdkdkdk">
        <div className="warp_img_se">

          <div className="toofot">
            <div className="left">
              <div className="capsn-1">
                <FormattedMessage id="AllPlatformTerminalAccess" defaultMessage={'全平台终端接入'} />
              </div>
              <div className="capsn-2">
                iOS、Android、Web   <FormattedMessage id="MultiplePlatformsSupportFullBusinessFunctions" defaultMessage={'多个平台支持全业务功能'} />
              </div>
            </div>
            <div className="right">
              <div className="imgclear clear">
                <div>
                  <img src={imgarr.banner02} alt="" />
                </div>
                <div>
                  <Popover content={<Qrcode value={content} size={100} />} >
                    <div className="imga clear">
                      <img src={imgarr.banner03} alt="" />
                      <FormattedMessage id="DownloadForAndroid" defaultMessage={'Android版下载'} />
                    </div>
                  </Popover>
                  <div className="imga clear">
                    <img src={imgarr.banner04} alt="" />
                    <NavLink className="ios_Download" to="/iosdownload" >
                      <FormattedMessage id="DownloadiOSVersion" defaultMessage={'iOS版下载'} />
                    </NavLink>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="img_box_sices">
            <img src={imgarr.banner07} alt="" />
          </div>
        </div>
      </div>
      <div className="footlogin_box">
        <div className="footlogin_box_warp">
          <div className="tiole">
            开始您的交易
            </div>
          <div className="min_liang">
            仅需要2分钟，您就可以开始自由地交易比特币和数百种资产
            </div>
          <div className="input_box">
            <Input placeholder="您的手机号或邮箱地址" onChange={this.input_acc} style={{ width: 540, height: 60 }}></Input>
            <Button onClick={() => {
              if (this.state.input_acc) {
                history.push('/register?account=' + this.state.input_acc)

              } else {
                history.push('/register')
              }
            }} type="primary" style={{ width: 150, height: 60, marginLeft: 20 }}>创建账户</Button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div >
    )




  }
}
export default Sices;