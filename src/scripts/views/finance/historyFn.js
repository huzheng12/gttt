import { Xfn } from "../../../utils/axiosfn"

// _processingFn.cbquery_historyFn({
//   _this: this,
//   _data: _data,
//   _url: "tbquery_history",
//   _type: "WithdrawMoney",
// }, (_res) => {
//   this.setState({
//     data: _res.rows,
//     lishilength: _res.total,
//     last_withdraw_address: _res.last_withdraw_address,
//   })
// })


const _processingFn = {
  cbquery_historyFn: (_data, fn) => {
    var obj
    var withdraw_time
    var withdraw_id
    var _asset
    if (_data._type === 1) {
      _asset = _data._this.state.symbols
    } else if (_data._type === 2) {
      _asset = _data._this.state.zxhzzhanghuname
    }
    var _dataArr = _data._this.state.data
    if (_data._data && _data._data.asset) { _asset = _data._data.asset }
    if (_data._data && _data._data.ctime === '0') {
      if (_data._type === 1) {
        withdraw_time = _dataArr[_dataArr.length - 1].withdraw_time
        withdraw_id = _dataArr[_dataArr.length - 1].id
      } else if (_data._type === 2) {
        withdraw_time = _dataArr[_dataArr.length - 1].ctime
        withdraw_id = _dataArr[_dataArr.length - 1].transfer_id
      }
      obj = {
        asset: _asset,
        page_size: "10",
        query_time: withdraw_time,
        query_id: withdraw_id,
        page_status: '1'
      }
    } else {
      obj = {
        asset: _asset,
        current_page: "1",
        page_size: "10",
      }

      

    }
    Xfn({
      _u: _data._url,
      _m: "get",
      _p: obj
    }, (res, code) => {
      if (code == 0) {
        fn(res.data.data)
      }
    })
  }
}

export default _processingFn