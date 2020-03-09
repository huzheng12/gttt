import store from '@/scripts/store'
import bbsendMessage from './bb_ws_send';

export default function bbSubscribe(obj) {
  localStorage.bbasset_data = obj.bbasset
  localStorage.bbsymbol_data = obj.bbaymbol
  console.log(obj, '-------',localStorage.bbaymbol)
  store.dispatch({ type: "trandefnnnn", date: '' })
  let options = bbsendMessage(obj._por, {
    bbaymbol: obj.bbaymbol, bbasset: obj.bbasset
  }).bbobj;
  let unoptions = bbsendMessage(obj._por, {
    bbaymbol: obj.bbaymbol, bbasset: obj.bbasset
  }).bbobjunsub;
  // 取消
  if (window.wss.readyState === 1) {

    if (localStorage.userInfo) {
      // window.wss.send(JSON.stringify(unoptions.bb_account_exp));
      window.wss.send(JSON.stringify(unoptions.bb_active_order));
      window.wss.send(JSON.stringify({
        "op":"unsub",
        "args":{"instrument_type":"bb","table":"bb_account_exp","settle_currency":localStorage.bbaymbol.split('/')[0], "token":localStorage.userInfo}
    }));
      window.wss.send(JSON.stringify({
        "op":"unsub",
        "args":{"instrument_type":"bb","table":"bb_account_exp","settle_currency":localStorage.bbaymbol.split('/')[1], "token":localStorage.userInfo}
    }));
    }
    window.wss.send(JSON.stringify(unoptions.bborder_book));
    window.wss.send(JSON.stringify(unoptions.bb_trade));
  }
  // 发送
  if (window.wss.readyState === 1) {
    if (localStorage.userInfo) {
      // window.wss.send(JSON.stringify(options.bb_account_exp));
      window.wss.send(JSON.stringify(options.bb_active_order));
      window.wss.send(JSON.stringify({
        "op": "sub",
        "args": { "instrument_type": "bb", "table": "bb_account_exp", "settle_currency": obj.bbaymbol.split('/')[0], "token": localStorage.userInfo }
      }));
      window.wss.send(JSON.stringify({
        "op": "sub",
        "args": { "instrument_type": "bb", "table": "bb_account_exp", "settle_currency": obj.bbaymbol.split('/')[1], "token": localStorage.userInfo }
      }));
    }
    window.wss.send(JSON.stringify(options.bborder_book));
    window.wss.send(JSON.stringify(options.bb_trade));
  }



}