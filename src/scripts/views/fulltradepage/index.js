import React, { Component } from 'react';
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';
import { connect } from "react-redux";
import store from '@/scripts/store.js'
import _ from "lodash";
import './index.scss'
import Tvchart from '@/scripts/components/tvchart';
import { WidthProvider, Responsive } from "react-grid-layout";
import { objjj, wsreconnect, tokenfun } from '../../action';
import ContractDetails from './ContractDetails';
import MyContract from './MyContract';
import ChengjiaoLiebiao from './chengjiao';
import Weituoliebiao from './weituoliebao';
import TitleFullk from './titeFull';
import TableFoot from './tablefoot';
import Heeader from './titeFull/heerder';
import sendMessage from '../../../utils/ws_send_message';
import EventFN from '../../../utils/eventfn';
import Firstloading from '../../components/Firstloading';
import Subscribe from '../../../utils/ws_sub_unsub';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("hylayouts") || {};
var titletoubu = document.getElementById('titletoubu')
function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}
function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}
@connect(
  state => {
    return {
      ...state.data,
      ...state.datum
    }
  },
  dispatch => {
    return {
      tokenFun: (n, a) => dispatch(tokenfun(n, a)),
      wsrecOnnect: (a) => dispatch(wsreconnect(a)),
      obJjj: (a) => dispatch(objjj(a)),
      chongxinkaiqi: (a) => dispatch({ type: "chongxinkaiqi", chongxinkaiqi: a }),
    }
  }
)
class FullTradePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
    };
  }
  componentDidMount() {
    if (localStorage.heyuename) {
      Subscribe({
        _por: this.props,
        _this: this,
        _pair: localStorage.heyuename,
        // _index: b,
        _type: "2",
        _asset: this.props.asset,
      })
      localStorage.heyuename = ""
    }

    titletoubu.innerHTML = (this.props.instrument.last_price ? EventFN.CurrencyDigitLimit({
      content: this.props.instrument.last_price,
      type: this.props.Decimal_point
    }) : "") + "(" + this.props.heyuename + ")" + "交易 - GTE"
    const bodys = document.getElementsByTagName("body")[0]
    bodys.className = "theme-dark"
  }
  componentWillUnmount() {
    titletoubu.innerHTML = "GTE比特币合约交易所"
    const bodys = document.getElementsByTagName("body")[0]
    bodys.className = 'theme-light'
    var objunsub = sendMessage(this.props).objunsub
    for (let i in objunsub) {
      window.wss.send(JSON.stringify(objunsub[i]))
    }
  }
  componentDidUpdate() {
    titletoubu.innerHTML = (this.props.instrument.flgz == '1' || this.props.instrument.flgz == '10' ? "▲" : "▼") + (this.props.instrument.last_price ? EventFN.CurrencyDigitLimit({
      content: this.props.instrument.last_price,
      type: this.props.Decimal_point
    }) : "") + "(" + this.props.heyuename + ")" + "交易 - GTE"

    if (this.props.ws_connect == 1 || this.props.isLogin == 1) {
      if (this.props.asset) {
        let options = sendMessage(this.props).obj
        if (window.wss.readyState === 1) {
          window.wss.send(JSON.stringify(options.instrument_all));
          window.wss.send(JSON.stringify(options.orderbookz));
          window.wss.send(JSON.stringify(options.trade));
          if (localStorage.userInfo) {
            window.wss.send(JSON.stringify(options.position_all));
            window.wss.send(JSON.stringify(options.pc_account));
            window.wss.send(JSON.stringify(options.order_all));
          }
        }
        this.props.wsrecOnnect(0)
        this.props.chongxinkaiqi(1)
      }
    } else {
      if (this.props.isHistory === 1) {
        store.dispatch({ type: "isHistory", isHistory: 0 })
        let options = sendMessage(this.props).obj
        if (window.wss.readyState === 1) {
          window.wss.send(JSON.stringify(options.instrument_all));
          window.wss.send(JSON.stringify(options.orderbookz));
          window.wss.send(JSON.stringify(options.trade));
          if (localStorage.userInfo) {
            window.wss.send(JSON.stringify(options.position_all));
            window.wss.send(JSON.stringify(options.pc_account));
            window.wss.send(JSON.stringify(options.order_all));
          }
        }
      }

    }
  }
  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    };
  }
  resetLayout() {
    this.setState({ layouts: {} });
  }
  onLayoutChange(layout, layouts) {
    saveToLS("hylayouts", layouts);
    this.setState({ layouts });
  }
  render() {
    const { pcaccounddt, instrument, pcaccoundtnumflg } = this.props
    return this.props.a ? <Firstloading></Firstloading> : (
      <div className="fulltra-warp-d full-page">
        <Header></Header>
        <div className="ticker-info-box">
          <Heeader _props={this.props}></Heeader>
          <TitleFullk resetLayouts={this.resetLayout.bind(this)}></TitleFullk>
        </div>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          draggableHandle=".drag-handle"
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          <div key="1" data-grid={{ w: 6, h: 11, x: 0, y: 0, i: "1", minW: 2, minH: 3 }} style={{ padding: 5 }}>
            <Tvchart></Tvchart>
          </div>
          <div key="2" data-grid={{ w: 3, h: 20, x: 6, y: 0, i: "2", minW: 2, minH: 3, }}>
            <Weituoliebiao></Weituoliebiao>
          </div>
          <div key="3" data-grid={{ w: 3, h: 20, x: 9, y: 0, i: "3", minW: 2, minH: 3, }}>
            <ChengjiaoLiebiao pcaccoundtnumflg={pcaccoundtnumflg} pcaccounddt={pcaccounddt} instrument={instrument}></ChengjiaoLiebiao>
          </div>
          <div key="4" data-grid={{ w: 2, h: 9, x: 0, y: 11, i: "4", minW: 2, minH: 8, }}>
            <ContractDetails></ContractDetails>
          </div>
          <div key="5" data-grid={{ w: 4, h: 9, x: 2, y: 11, i: "5", minW: 4, minH: 8, }}>
            <MyContract pro={this.props}> </MyContract>
          </div>
          <div key="6" data-grid={{ w: 12, h: 9, x: 0, y: 20, i: "6", minW: 2, minH: 3, }}>
            <TableFoot></TableFoot>
          </div>
        </ResponsiveReactGridLayout>
        <Footer></Footer>
      </div>
    );
  }
}

export default FullTradePage