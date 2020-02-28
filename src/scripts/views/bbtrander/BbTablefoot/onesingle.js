import React, { Component } from 'react'
import { timehuansuan } from '../../../../utils/time'
import { FormattedMessage } from 'react-intl';
import { Xfn } from '../../../../utils/axiosfn';


export default class Onesingle extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
 
  render() {
    const {
      data,Cancel_order,type
    } = this.props

    return (
      <div className="onesingle_warp">
        <div className="clo1 clo">
          <div className="spl1">交易对</div>
          <div className="spl2">
            {data.symbol}
          </div>
        </div>
        <div className="clo2 clo">
          <div className="spl1">委托时间</div>
          <div className="spl2">
            {timehuansuan(data.ctime).date}
            &emsp;
            {timehuansuan(data.ctime).dates}
          </div></div>
        <div className="clo3 clo">
          <div className="spl1">方向</div>
          <div className="spl2">
            <span className="spanl2" style={{ color: data.bid_flag === '1' ? '#339F58' : '#E53F39', backgroundColor: data.bid_flag === '1' ? 'rgba(38,153,78,.3)' : 'rgba(229,63,57,.3)' }}>
              {data.bid_flag ? "买入" : "卖出"}
            </span>

          </div>
        </div>
        <div className="clo4 clo">
          <div className="spl1">成交比例</div>
          <div className="spl2">
            {String(data.trade_ratio * 100).replace(/^(.*\..{2}).*$/, "$1")}%
          </div>
        </div>
        <div className="clo5 clo">
          <div className="spl1">以成交量 | 委托总量</div>
          <div className="spl2">
            {data.filled_qty + ' | ' + data.qty}
          </div>
        </div>
        <div className="clo6 clo">
          <div className="spl1">成交均价 | 委托价</div>
          <div className="spl2">
            {data.avg_price + ' | ' + data.price}
          </div>
        </div>
        <div className="clo7 clo">
          <div className="spl1">状态</div>
          <div className="spl2">
            {(() => {
              switch (data.status) {
                case "1": return < FormattedMessage id="Mismatches_have_been_created" defaultMessage={'待报'} />; break;
                case "2": return < FormattedMessage id="To_close_a_deal" defaultMessage={'已报'} />; break;
                case "4": return < FormattedMessage id="To_be_cancelled" defaultMessage={'待撤销'} />; break;
                case "8": return < FormattedMessage id="rescinded" defaultMessage={'已撤销'} />; break;
                case "16": return < FormattedMessage id="Partial_Transaction" defaultMessage={'部分成交'} />; break;
                case "32": return < FormattedMessage id="Complete_deal" defaultMessage={'全部成交'} />; break;
                default: return data.status;
              }
            }
            )()}
          </div>
        </div>
       {
         type==='1'? <div className="clo8 clo">
         <div className="spl1">操作</div>
         <div className="spl2" onClick={() => Cancel_order(data)} style={{ color: "#2f6fed", cursor: 'pointer' }}>
           撤单
         </div>
       </div>: <div className="clo8 clo">
          <div className="spl1">手续费</div>
          <div className="spl2">
            撤单
          </div>
        </div>
       }
      </div>
    )
  }
}
