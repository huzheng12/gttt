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
import EventFN from '../../../utils/eventfn';
import Firstloading from '../../components/Firstloading';
import Subscribe from '../../../utils/ws_sub_unsub';
import TitleFullk from '../fulltradepage/titeFull';
import BbTablefoot from './BbTablefoot';
import Placeorder from './placeorder';
import bbsendMessage from '../../../utils/bb_ws_send';
import Weituoliebiao from '../fulltradepage/weituoliebao';
import ChengjiaoLiebiao from '../fulltradepage/chengjiao';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("bblayouts") || {};
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
      ...state.bbdata,
      ...state.data,

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
class BBTradePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
    };
  }
  componentDidMount() {
 
    document.getElementsByTagName("body")[0].className = "theme-dark"
    this.send_wss()
  }
  componentWillUnmount() {
    titletoubu.innerHTML = "GTE比特币合约交易所"
    document.getElementsByTagName("body")[0].className = 'theme-light'

  }
  componentDidUpdate() {

    if (this.props.ws_connect == 1 || this.props.isLogin == 1) {
      if (this.props.bbasset&&this.props.bbaymbol) {
        this.send_wss()
        this.props.wsrecOnnect(0)
        this.props.chongxinkaiqi(1)
      }
    }
  }
  send_wss=()=>{
    let options = bbsendMessage(this.props).bbobj

    if (window.wss.readyState === 1) {
      if(this.props.bbshouye==='0'){
        window.wss.send(JSON.stringify(options.bbinstrument_all));

      }
      if (localStorage.userInfo) {
        // window.wss.send(JSON.stringify(options.bb_account_exp));
        window.wss.send(JSON.stringify(options.bb_active_order));
        window.wss.send(JSON.stringify({
          "op": "sub",
          "args": { "instrument_type": "bb", "table": "bb_account_exp", "settle_currency": this.props.bbaymbol&&this.props.bbaymbol.split('/')[0], "token": localStorage.userInfo }
        }));
        window.wss.send(JSON.stringify({
          "op": "sub",
          "args": { "instrument_type": "bb", "table": "bb_account_exp", "settle_currency": this.props.bbaymbol&&this.props.bbaymbol.split('/')[1], "token": localStorage.userInfo }
        }));
      }
      window.wss.send(JSON.stringify(options.bborder_book));
      window.wss.send(JSON.stringify(options.bb_trade));
    }
  }
  static get defaultProps() {
    return {
      className: "bblayouts",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    };
  }
  resetLayout() {
    this.setState({ layouts: {} });
  }
  onLayoutChange(layout, layouts) {
    saveToLS("bblayouts", layouts);
    this.setState({ layouts });
  }
  render() {
    const { bbasset, bbaymbol ,bb_trade_exp_html} = this.props
    console.log(bbasset,'0000')
    return this.props.a ? <Firstloading></Firstloading> : (
      <div className="fulltra-warp-d full-page">
        <Header></Header>
        <div className="ticker-info-box">
          {/* <Heeader _props={this.props}></Heeader> */}
          <TitleFullk ctype="bb" resetLayouts={this.resetLayout.bind(this)}></TitleFullk>
        </div>
        <ResponsiveReactGridLayout
          className="bblayouts"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          draggableHandle=".drag-handle"
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          <div key="1" data-grid={{ w: 6, h: 11, x: 0, y: 0, i: "1", minW: 2, minH: 3 }} style={{ padding: 5 }}>
            <Tvchart ctype="bb"></Tvchart>
          </div>
          <div key="2" data-grid={{ w: 3, h: 20, x: 6, y: 0, i: "2", minW: 2, minH: 3, }}>
            <Weituoliebiao type='bb'></Weituoliebiao>
          </div>
          <div key="3" data-grid={{ w: 3, h: 20, x: 9, y: 0, i: "3", minW: 2, minH: 3, }}>
            {/* <ChengjiaoLiebiao pcaccoundtnumflg={pcaccoundtnumflg} pcaccounddt={pcaccounddt} instrument={instrument}></ChengjiaoLiebiao> */}
            <ChengjiaoLiebiao pcaccoundtnumflg={1} pcaccounddt={bb_trade_exp_html}></ChengjiaoLiebiao>
          </div>
          <div key="4" data-grid={{ w: 6, h: 9, x: 0, y: 11, i: "4", minW: 4, minH: 9, }}>
          <Placeorder></Placeorder>
          </div>
      
          <div key="6" data-grid={{ w: 12, h: 9, x: 0, y: 20, i: "6", minW: 2, minH: 3, }}>
          <BbTablefoot bbasset={bbasset} bbaymbol={bbaymbol}></BbTablefoot>
          </div>
        </ResponsiveReactGridLayout>
        <Footer></Footer>
      </div>
    );
  }
}

export default BBTradePage