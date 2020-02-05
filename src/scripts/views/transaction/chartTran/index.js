import React, { Component } from 'react';
import './index.scss'
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { thousands } from '@/utils/prit'
import Depthmap from '@/scripts/components/depthmap';
import EchartKline from '@/scripts/components/echart_kline';
import { NavLink } from "react-router-dom";
import EventFN from '../../../../utils/eventfn';
import Tvchart from '../../../components/tvchart';


@connect(
  state => {
    return {
      instrument: state.data.instrument,
      Decimal_point: state.data.Decimal_point,
    }
  }
)
class Chart extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        "kaif": require('../../../img/treaty_price.png'),
        "xian": require('../../../img/xian.png'),
        "biao": require('../../../img/biao.png'),
        "quanping": require('../../../img/quanping.png'),
      },
      ceshi: "",
      tickershuju: {},
      visible: true,
    }
  }
  changChartStyle = (v) => {
    this.setState(
      state => {
        return {
          visible: v
        }

      })
  }

  render() {
    const {
      imgArr,
    } = this.state
    const {
      instrument
    } = this.props
    return (
      <div className="chart-warp">
        <div className="chart-top clear">
          <div style={{ color: instrument.change_rate_24h >= 0 ? "#26994E" : "#E53F39" }}>
            {
              EventFN.CurrencyDigitLimit({
                content: instrument.last_price,
                type: this.props.Decimal_point
              })
            }
          </div>
          <div style={{ backgroundColor: instrument.change_rate_24h >= 0 ? "#26994E" : "#E53F39", padding: "0 6px" }}>
            {
              (() => {
                if (instrument.change_rate_24h) {
                  return instrument.change_rate_24h > 0 ? "+" + String(instrument.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") + "%" : String(instrument.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") + "%"
                } else {
                  return "--"
                }
              })()
            }
          </div>
          <div className="div-last-warp">
            <img src={imgArr.xian} alt="" />
            <span> {
              EventFN.CurrencyDigitLimit({
                type: this.props.Decimal_point,
                content: instrument.index_price
              })
            }</span>
            <p></p>
          </div>
          <div>
            <img src={imgArr.biao} alt="" />
            <span className="biao"> {
              EventFN.CurrencyDigitLimit({
                type: this.props.Decimal_point,
                content: instrument.mark_price
              })
            }</span>
          </div>
        </div>
        <div className="chart-heyue">
          <div>
            <span style={{ marginRight: 88 }}>
              <FormattedMessage id="Contract_position" defaultMessage={'合约持仓量'} />
            </span>
            <span>
              {instrument.volume_pos_hold ? thousands(instrument.volume_pos_hold) : "--"}
            </span>
          </div>
          <div>
            <span>
              <FormattedMessage id="About_24-hour_turnover" defaultMessage={'合约24小时成交量'} />
            </span>
            <span>
              {instrument.volume_24h ? thousands(instrument.volume_24h) : "--"}
            </span>
          </div>
        </div>
        <div className="tuxing" >
          <div className="chart-nav">
            <span className={this.state.visible ? 'active' : ''} onClick={() => { this.changChartStyle(true) }}><FormattedMessage id="Quotation" defaultMessage={'行情'} /></span>
            <span className={!(this.state.visible) ? 'active' : ''} onClick={() => { this.changChartStyle(false) }}>  <FormattedMessage id="depth" defaultMessage={'深度'} /></span>
            <NavLink className="full-trade-btn" to="/fulltrade" target="_blank"><img src={imgArr.quanping} alt="" /><FormattedMessage id="FullScreenTransaction" defaultMessage={'全屏交易'} /></NavLink>
          </div>
          {this.state.visible ? <EchartKline></EchartKline> : <Depthmap></Depthmap>}
        </div>
      </div>
    );
  }
}

export default Chart;