import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import number_format from '../../../../utils/renyinumber';
const Rand = (props) => {
  const { heyuename, pc_account, position, instrument, allposiont, asset } = props.props
  return (
    <div className="rand-warp contractdetails-warp">
      <div className="title-cd drag-handle">

        <FormattedMessage id="MyContractualAssets" defaultMessage={'我的合约资产'} />
      </div>
      <div className="content-cd module-body g-scrollbar">
        <div className="cond-tr">
          <div className="le">
            <FormattedMessage id="TotalAssets" defaultMessage={'资产总额'} />
          </div>
          <div className="ri">
          
            {localStorage.userInfo && pc_account.total ? number_format(pc_account.total, 4, ".", ",") + " " + asset : "--"}
            
          </div>
        </div>
        <div className="cond-tr">
          <div className="le" >
            <FormattedMessage id="AvailableBalance" defaultMessage={'可用余额'} />

          </div>
          <div className="ri">
            {localStorage.userInfo && pc_account.available ?number_format(pc_account.available, 4, ".", ",") + " " + asset : "--"}
          </div>
        </div>
        <div className="cond-tr">
          <div className="le" >
            <FormattedMessage id="RealizedProfitAndLoss" defaultMessage={'已实现盈亏'} />

          </div>
          <div className="ri">
            {
              (() => {
                var realised_pnlshuju = 0
                for (let i = 0; i < position.length; i++) {
                  if (position[i].symbol == heyuename) {
                    realised_pnlshuju += position[i].realised_pnl * 1
                  }
                }
                return localStorage.userInfo ? allposiont == 0 ? "--" :number_format(realised_pnlshuju, 4, ".", ",")  + " " + asset : "--"
              })()
            }
          </div>
        </div>
        <div className="cond-tr">
          <div className="le">
            <FormattedMessage id="UnrealizedProfitAndLoss" defaultMessage={'未实现盈亏'} />

          </div>
          <div className="ri">
            {
              (() => {
                var realised_pnlshuju = 0
                for (let i = 0; i < position.length; i++) {
                  if (position[i].symbol == heyuename) {
                    realised_pnlshuju += position[i].pnl * 1
                  }
                }
                return localStorage.userInfo ? allposiont == 0 ? "--" :number_format(realised_pnlshuju, 4, ".", ",")  + " " + asset : '--'
              })()
            }
          </div>
        </div>
        <div className="cond-tr">
          <div className="le">
            {/* 收益率 */}
          </div>
          <div className="ri">

          </div>
        </div>
      </div>
    </div>
  );
}


export default Rand;