import React, { Component } from 'react';
import "./index.scss"
import { Table, message } from 'antd';
import lang from '@/utils/language';
import { Link } from "react-router-dom"
import { dangqianchipang } from '@/utils/dangqianchipang'
import { FormattedMessage } from 'react-intl';
import store from '@/scripts/store.js'
import { Xfn } from '../../../../utils/axiosfn';
import number_format from '../../../../utils/renyinumber';
import Modeltrund from '../../bbtrander/placeorder/modeltrund';

class Yongxu extends Component {
  constructor() {
    super()
    this.state = {
      columns: [],
      data: [
      ],
      pc_account: [],
      valuation_symbol: "",
      visible: false, 
      available: {},
      bbasset:""
    }
  }
  componentDidMount() {
    if (this.props.ctype !== 'bb') {
      this.setState({
        columns: [
          {
            title: <FormattedMessage id="currency" defaultMessage={'币种'} />,
            dataIndex: 'asset',
            render: text => <span className="huazhuan-table-tr" > {text}</span >
          },
          {
            title: <FormattedMessage id="Available_balance" defaultMessage={'可用余额'} />,
            dataIndex: 'available',
            render: text => <span className="huazhuan-table-tr" > {number_format(text, 8, ".", ",")} </span >
          },
          {
            title: <FormattedMessage id="Warehouse_margin" defaultMessage={'仓位保证金'} />,
            dataIndex: 'pos_margin',
            render: text => <span className="huazhuan-table-tr" >{number_format(text, 8, ".", ",")} </span >
          },
          {
            title: <FormattedMessage id="Entrusted_margin" defaultMessage={'委托保证金'} />,
            dataIndex: 'order_margin',
            render: text => <span className="huazhuan-table-tr" > {number_format(text, 8, ".", ",")} </span >
          },
          {
            title: <FormattedMessage id="Total" defaultMessage={'总额'} />,
            dataIndex: 'total',
            render: text => <span className="huazhuan-table-tr" > {number_format(text, 8, ".", ",")} </span >
          },
          {
            title: <FormattedMessage id="operation" defaultMessage={'操作'} />,
            align: "right",
            dataIndex: 'addrescaozuo',
            render: (text, record) => <div>
              <Link to="/finance/huazhuan" onClick={() => this.tiaozhuan(record)} style={{ textAlign: "left" }}><
                FormattedMessage id="Transfer_of_funds" defaultMessage={'资金划转'} />
              </Link>
            </div>,
          },

        ]
      })
    } else {
      this.setState({
        columns: [
          {
            title: '币种',
            dataIndex: 'asset',
            render: text => <span className="huazhuan-table-tr" > {text}</span >
          },
          {
            title: '可用余额',
            dataIndex: 'available',
            render: text => <span className="huazhuan-table-tr" >{number_format(text, 8, ".", ",")} </span >
          },
          {
            title: '冻结',
            dataIndex: 'lock',
            render: text => <span className="huazhuan-table-tr" > {number_format(text, 8, ".", ",")} </span >
          },
          {
            title: '总额',
            dataIndex: 'total',
            render: text => <span className="huazhuan-table-tr" > {number_format(text, 8, ".", ",")} </span >
          },
          {
            title: <FormattedMessage id="operation" defaultMessage={'操作'} />,
            align: "right",
            dataIndex: 'addrescaozuo',
            render: (text, record) => <div>
              <span className="span88"  onClick={() => this.visibleFn(true, 1, record)} style={{ textAlign: "left" }}><
                FormattedMessage id="Transfer_of_funds" defaultMessage={'资金划转'} />
              </span>
              <span className="span88">交易</span>
            </div>,
          },

        ]
      })
    }

    if (this.props.ctype === 'bb') {
      Xfn({
        _u: "bbaccountquery",
        _m: 'get',
        _p: {}
      }, (res, code) => {
        if (code == 0) {
          var arr = res.data.data.bb_accounts
          for (var i in arr) {
            arr[i].key = arr[i] + i + this.state.current_page
          }
          this.setState({
            pc_account: res.data.data.total_bb_account,
            data: arr,
            valuation_symbol: res.data.data.valuation_asset,
          })
        }
      })
    } else {
      Xfn({
        _u: "hyzhquery",
        _m: 'get',
        _p: {}
      }, (res, code) => {
        if (code == 0) {
          var arr = res.data.data.pc_account
          for (var i in arr) {
            arr[i].key = arr[i] + i + this.state.current_page
          }
          this.setState({
            pc_account: res.data.data.total_pc_account,
            data: res.data.data.pc_account,
            valuation_symbol: res.data.data.valuation_asset,
          })
        }
      })
    }


  }
  tiaozhuan = (a) => {
    store.dispatch({ type: "tiaozhuanzijinhuanzhuan", tiaozhuanzijinhuanzhuan: a.asset })
  }
  // 点击划转
  visibleFn = (flg, type, data) => {
    // type ===1  点击划转
    if (type === 1) {
      this.setState({
        bbasset:data.asset
      })
      this.bboaccountavailablefn('1',data.asset)
    } else if (type === 2) {

    }
    this.setState({
      visible: flg
    })
  }
  bboaccountavailablefn = (type,data) => {
    console.log(type,data)
    Xfn({
      _u: "bboaccountavailable",
      _m: "get",
      _p: {
        asset: data,
        account_type: type
      }
    }, (res, code) => {
      if (code !== 0) {
        return false
      }
      this.setState({
        available: res.data.data
      })
      console.log(res)
    })
  }
  render() {
    const {
      columns,
      data,
      pc_account,
      valuation_symbol,
      available,
      asset,
      visible,
      bbasset
    } = this.state
    const {
      ctype
    } = this.props
    return (
      <div className="Yongxu-warp">
        <div className="asset-title">
          {
            ctype === 'bb' ? <h1>币币交易账户</h1> : <h1>永续合约账户</h1>
          }

        </div>

        <div className="yongxu-content-box">
          <div className="box-a">
            <div className="title">
              {
                ctype === 'bb' ? '币币资产估值' : <FormattedMessage id="Asset_Valuation_of_Sustainable_Contracts" defaultMessage={'永续合约资产估值'} />
              }

            </div>
            <div className="content">
              <span>{typeof pc_account == 'object' ? "0.00000000" : number_format(pc_account, 8, ".", ",")}</span>
              <span>{valuation_symbol}</span>
            </div>
          </div>

          <Table pagination={1 == 2} columns={columns} dataSource={data} />
          {dangqianchipang(data.length)}
        </div>
        <Modeltrund type={9} bboaccountavailablefn={this.bboaccountavailablefn} available={available} asset={bbasset} visible={visible} visibleFn={this.visibleFn}></Modeltrund>
      </div>
    );
  }
}
export default Yongxu;