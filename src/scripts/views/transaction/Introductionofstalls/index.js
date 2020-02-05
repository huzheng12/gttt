import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.scss'
import { FormattedMessage } from 'react-intl'
import { Select, Table, Spin } from 'antd';
import { NavLink } from "react-router-dom"
import { Xfn } from '../../../../utils/axiosfn';
import number_format from '../../../../utils/renyinumber';
const { Option } = Select;

let asset = null
export class Introductionofstalls extends Component {
  state = {
    asset: 'BTC',
    assetData: [],
    symbol: "BTC_USD",
    symbolData: [],
    face_value: null,
    columns: [{
      title: < FormattedMessage id="Gear_position" defaultMessage={'档位'} />,
      width: 150,
      dataIndex: 'gear',
      render: (text, data) => <span className="huazhuan-table-tr" >   {text}  </span >
    },
    {
      title: < FormattedMessage id="Zhang_number" defaultMessage={'张数'} />,
      dataIndex: 'target_address',
      width: 270,
      render: (text, data) => <span className="huazhuan-table-tr" > {data.minAmt + " - " + data.maxAmt}
      </span >
    },
    {
      title: < FormattedMessage id="Maintenance_deposit" defaultMessage={'维持保证金'} />,
      dataIndex: 'posHoldMarginRatio',
      width: 220,
      render: text => <span className="huazhuan-table-tr" > {number_format(text * 100, 2, ".", ",")} %</span >
    },
    {
      title: < FormattedMessage id="Minimum_initial_margin" defaultMessage={'最低初始保证金率'} />,
      dataIndex: 'minHoldMarginRatio',
      width: 220,
      render: text => <span className="huazhuan-table-tr" >
        {number_format(text * 100, 2, ".", ",")} %
      </span >
    }, {
      title: < FormattedMessage id="maximum_leverage_available" defaultMessage={'最高可用杠杆倍数'} />,
      align: "right",
      dataIndex: 'maxLeverage',
      render: text => <span className="huazhuan-table-tr" >
        {number_format(text, 2, ".", ",")}
      </span >
    },],
    data: null,
    total: "",
    totalFlg: true
  };
  handleProvinceChange = value => {
    Xfn({
      _u: 'pairQuery',
      _m: 'get',
      _p: {
        asset: value
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          symbolData: res.data.data.rows,
          symbol: res.data.data.rows[0].symbol,
          asset: value
        })
        Xfn({
          _u: "marketsquery",
          _m: "get",
          _p: {
            asset: value,
            symbol: res.data.data.rows[0].symbol,
            time: new Date().getTime().toString()
          }
        }, (res, code) => {
          if (code == 0) {
            this.setState({
              face_value: res.data.data.face_value
            })
          }
        })
        Xfn({
          _u: "storinglevelquery_list",
          _m: 'get',
          _p: {
            asset: value,
            symbol: res.data.data.rows[0].symbol,
            page_size: "20",
            current_page: "1"
          }
        }, (res, code) => {
          if (code === 0) {
            this.setState({
              data: res.data.data.rows,
              total: res.data.data.total,
              totalFlg: true
            })
          }
        })
      }
    })
  };
  // this.setState({
  //   total: res.data.data.total,
  //   data: res.data.data.rows,
  //   totalFlg: false
  // })
  onSecondCityChange = value => {
    Xfn({
      _u: "storinglevelquery_list",
      _m: 'get',
      _p: {
        asset: this.state.asset,
        symbol: value,
        page_size: "20",
        current_page: "1"
      }
    }, (res, code) => {
      if (code === 0) {
        this.setState({
          total: res.data.data.total,
          data: res.data.data.rows
        })
      }
    })
  };
  assets_data = (_obj) => {
    Xfn({
      _u: 'pcAssetQuery',
      _m: 'get',
      _p: {}
    }, (res, code) => {
      if (code == 0) {
        asset = res.data.data.asset[0].asset
        this.setState({
          assetData: res.data.data.asset,
          asset: res.data.data.asset[0].asset
        })
        Xfn({
          _u: 'pairQuery',
          _m: 'get',
          _p: {
            asset: asset
          }
        }, (res, code) => {
          if (code == 0) {
            this.setState({
              symbolData: res.data.data.rows,
              symbol: res.data.data.rows[0].symbol
            })
            Xfn({
              _u: "marketsquery",
              _m: "get",
              _p: {
                asset: asset,
                symbol: res.data.data.rows[0].symbol,
                time: new Date().getTime().toString()
              }
            }, (res, code) => {
              if (code == 0) {
                this.setState({
                  face_value: res.data.data.face_value
                })
              }
            })
            Xfn({
              _u: "storinglevelquery_list",
              _m: 'get',
              _p: {
                asset: asset,
                symbol: res.data.data.rows[0].symbol,
                page_size: "20",
                current_page: "1"
              }
            }, (res, code) => {
              if (code === 0) {
                this.setState({
                  total: res.data.data.total,
                  data: res.data.data.rows
                })
              }
            })
          }
        })
      }
    })
  }
  viewMore = () => {
    Xfn({
      _u: "storinglevelquery_list",
      _m: 'get',
      _p: {
        asset: this.state.asset,
        symbol: this.state.symbol,
        page_size: this.state.total,
        current_page: "1"
      }
    }, (res, code) => {
      if (code === 0) {
        this.setState({
          total: res.data.data.total,
          data: res.data.data.rows,
          totalFlg: false
        })
      }
    })
  }
  componentDidMount() {
    this.assets_data({
      asset: this.state.asset
    })
  }
  // stallFormula = (val) => {

  // }
  // initializationStatus = (a) => {
  //   if (localStorage.userInfo) {
  //     if (a === null) {
  //       return <Spin style={{ width: '100%', textAlign: "center", lineHeight: "500px" }} />
  //     } else {
  //       if (a.length <= 0) {
  //         return <div className="tablemeishuju">
  //           <img src={this.state.imgArr.ioo} alt="" />
  //           <div>
  //             < FormattedMessage id="You_dont_have_data" defaultMessage={'您暂时还没有相关数据'} />
  //           </div>
  //         </div>
  //       }
  //     }
  //   }
  // }
  render() {
    const { assetData, asset, symbolData, symbol, face_value, columns, data, total, totalFlg } = this.state;
    // console.log(assetData)
    return (
      <div className='introduction_of_stalls_warp'>
        <div className="ar-title">
          <h3> < FormattedMessage id="Perpetual_contract_position" defaultMessage={'永续合约仓位档位'} /></h3>
        </div>
        <div className="content_box">
          <div className="title_select_box clear">
            <Select
              className="select_asset_l1"
              value={asset}
              style={{ width: 120 }}
              onChange={this.handleProvinceChange}
            >
              {assetData.map(province => (
                <Option key={province.asset}>{province.asset}</Option>
              ))}
            </Select>
            <Select
              className="select_asset_l2"
              style={{ width: 120 }}
              value={symbol}
              onChange={this.onSecondCityChange}
            >
              {symbolData.map(city => (
                <Option key={city.symbol}>{city.symbol}</Option>
              ))}
            </Select>
            <div className="usd_face">
              1< FormattedMessage id="Zhang" defaultMessage={'张'} /> = {face_value}< FormattedMessage id="dollar" defaultMessage={'美元'} />
            </div>
          </div>
          <div className="hr_custom">
            < FormattedMessage id="Corresponding_information_of_all_positions" defaultMessage={'全部仓位档位对应信息'} />
          </div>
          <div className="h3_words">
            < FormattedMessage id="The_current_maximum" defaultMessage={'当前最高可开杠杆倍数由您的持仓、挂单及开仓时新的下单张数决定'} />

          </div>
          <div className="stall_formula">
            <p className="span_title">
              < FormattedMessage id="Stall_formula" defaultMessage={'档位公式'} />
              :
            </p>
            <p className="span_li">
              < FormattedMessage id="Maximum_opening_number" defaultMessage={'每档最高可开张数 = 第一档最高可开张数 + (档位数 - 1) * 1000000'} />

            </p>
            <p className="span_li">
              < FormattedMessage id="Maintenance_margin_rates" defaultMessage={'每档维持保证金率 = 第一档维持保证金率 + (档位数 - 1) * 0.50%'} />

            </p>
            <p className="span_li">
              < FormattedMessage id="Minimum_initial_margin_rate_of_each_file" defaultMessage={'每档最低初始保证金率 = 第一档最低初始保证金率 + (档位数 - 1) * 0.50%'} />

            </p>
            <p className="span_li">
              < FormattedMessage id="Maximum_leverage_ratio_of_each_gear" defaultMessage={' 每档最高可用杠杆倍数 = 1 / 每档最低初始保证金率'} />

            </p>
          </div>

          <Table className="table_stalls" pagination={false} columns={columns} dataSource={data} showHeader={data && data.length > 0 ? true : false} />
          {
            totalFlg && total * 1 > 20 ? <div className="view_more" onClick={this.viewMore}>
              < FormattedMessage id="ViewMore" defaultMessage={'查看更多'} />
            </div> : ""
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Introductionofstalls)
