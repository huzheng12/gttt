import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl';
import { Tooltip} from 'antd';
import './index.scss'

export default class Comtabletitle extends Component {
  render() {
    return (
      <div className="fultrade-box-table fultrade-box-table-title" >
        <div className="code-li-box">
          <div className="title">

            < FormattedMessage id="contract" defaultMess age={'合约'} />

          </div>

        </div>
        <div className="code-li-box">
          <div className="title">
            < FormattedMessage id="direction" defaultMess age={'方向'} />
          </div>

        </div>
        <div className="code-li-box">
          <div className="title">
            < FormattedMessage id="lever" defaultMess age={'杠杆'} />
          </div>
         
        </div>
        <div className="code-li-box">
          <Tooltip placement="topLeft" title={<FormattedMessage id="Total_Cont" defaultMessage={'交易单位为BTC等币种时，显示的持仓与挂单数量是根据实际张数换算的，所显示的持仓量数值会根据最新成交价变动而变动。'} />}>
            <div className="title">
              <span className="span_dashed_box">
                <FormattedMessage id="Holding_positions_Zhang" defaultMessage={'持仓(张)'} />
              </span>
            </div>
          </Tooltip>
        
        </div>
        <div className="code-li-box">
          <div className="title">
            < FormattedMessage id="Parity" defaultMess age={'可平量'} />
          </div>
        
        </div>
        <div className="code-li-box"  style={{minWidth: 77}}>
          <div className="title">
            < FormattedMessage id="Margin" defaultMessage={'保证金'} />
          </div>
        
        </div>
        <div className="code-li-box">
          <div className="title">
            < FormattedMessage id="Margin_rate" defaultMessage={'保证金率'} />
          </div>
     
        </div>
        <div className="code-li-box">
          <Tooltip placement="topLeft" title={<FormattedMessage id="PL_Ratio" defaultMessage={'收益率 = 已实现盈亏 / 仓位初始保证金'} />}>
            <div className="title">
              <span className="span_dashed_box">
                < FormattedMessage id="Rate_of_return" defaultMessage={'收益率'} />
              </span>
            </div>

          </Tooltip>
     
        </div>
        <div className="code-li-box">
          <Tooltip placement="topLeft" title={<FormattedMessage id="Avg_Price" defaultMessage={'开仓均价指的是用户的开仓平均成本价格，该价格不会随着结算发生变动，可以准确的显示用户的实际开仓成本。'} />}>
            <div className="title">
              <span className="span_dashed_box">
                < FormattedMessage id="Opening_average_price" defaultMessage={'开仓均价'} />
              </span>
            </div></Tooltip>
      
        </div>
        <div className="code-li-box">
          <Tooltip placement="topLeft" title={< FormattedMessage id="Liquidation_Price" defaultMessage={'当您的保证金率=维持保证金率+强平手续费率时的价格，若市场触发此价格，您的仓位将被强平系统接管。'} />}>
            <div className="title">
              <span className="span_dashed_box">
                < FormattedMessage id="Estimated_strong_parity" defaultMessage={'预估强平价'} />
              </span>
            </div></Tooltip>
      
        </div>
        <div className="code-li-box">
          <Tooltip placement="topLeft" title={< FormattedMessage id="Settled_Earnings" defaultMessage={'该仓位已经结算到用户余额中的已实现盈亏'} />}>
            <div className="title">
              <span className="span_dashed_box">
                < FormattedMessage id="Achieved_Profits_and_Losses" defaultMessage={'已实现盈亏'} />
              </span>
            </div></Tooltip>
       
        </div>
        <div className="code-li-box">

          <Tooltip placement="topLeft" title={< FormattedMessage id="Unrealized_P" defaultMessage={'用户未平仓的仓位的收益。在每天结算时，用户仓位的未实现盈亏将会转入用户的余额，未实现盈亏归零后重新计算。'} />}>
            <div className="title">
              <span className="span_dashed_box">
                < FormattedMessage id="Unrealized_Profit_and_Loss" defaultMessage={'未实现盈亏'} />
              </span>
            </div></Tooltip>
       
        </div>
        <div className="code-li-box minwidthb" style={{minWidth:'90'}}>
          <Tooltip placement="topLeft" title={< FormattedMessage id="Maint_Margin" defaultMessage={'当仓位的保证金率小于等于维持保证金率+强平手续费率时，将会触发强制平仓。'} />}>
            <div className="title">
              <span className="span_dashed_box">
                < FormattedMessage id="Maintenance_margin_rate" defaultMessage={'维持保证金率'} />
              </span>
            </div></Tooltip>
        </div>


        <div className="cod-li-box" style={{
          width: '383px',
          display: 'flex',
        }}>
          <div className="fenkgx"></div>
          <div className="code-li-boxa">
            <div className="title">
              < FormattedMessage id="close_rate" defaultMessage={'平仓价格'} />
            </div>
          
          </div>
          <div className="code-li-boxa" style={{paddingLeft:20}}>
            <div className="title">
              < FormattedMessage id="Closing_Quantity" defaultMessage={'平仓数量'} />
            </div>
           
          </div>
          <div className="code-li-boxa">
            <div className="title" style={{ height: 13,width:60 }}>

            </div>
        
          </div>
        </div>
      
      </div>
    
    )
  }
}
