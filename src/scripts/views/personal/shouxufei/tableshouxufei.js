import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl';

 function Tableshouxufei(props){
   const {
    getPcFeeListData
   }=props
    return (
      <div>
        <table >
              <tbody>
                <tr>
                  <td colSpan="5">    < FormattedMessage id="Ordinary_users" defaultMessage={'普通用户'} /></td>
                </tr>
                {/* <tr className="tr1">
                  <td rowSpan="2"> < FormattedMessage id="User_Level" defaultMessage={'用户等级'} /></td>
                  <td colSpan="3"> </td>
                  <td rowSpan="2">
                    < FormattedMessage id="hour_cash_withdrawal" defaultMessage={'24小时提现额度'} />
                    <p>(BTC)</p>
                  </td>
                </tr> */}
                <tr className="tr1">
                <td > < FormattedMessage id="User_Level" defaultMessage={'用户等级'} /></td>

                  <td> < FormattedMessage id="Trading_volume_in_the_past_30_days" defaultMessage={'近30天交易量'} />(BTC)</td>
                  <td>< FormattedMessage id="Payment_fee_for_bill_of_lading" defaultMessage={'挂单成交手续费'} /></td>
                  <td>< FormattedMessage id="Processing_fee_for_eating_order_and_transaction" defaultMessage={'吃单成交手续费'} /></td>
                  <td>
                    < FormattedMessage id="hour_cash_withdrawal" defaultMessage={'24小时提现额度'} />
                   (BTC)
                  </td>

                </tr>
                {
                  getPcFeeListData.map((item, index) => {
                    return (
                      <tr key={item + index}>
                        <td>Lv{item.tier}</td>
                        <td> {item.compare + item.trading_volume} </td>
                        <td>{item.maker_fee}%</td>
                        <td>{item.taker_fee}%</td>
                        <td>{item.withdraw_limit}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
      </div>
    )
}
export default Tableshouxufei