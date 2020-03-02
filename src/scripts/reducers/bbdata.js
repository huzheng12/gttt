import { BBASSETFN, BBSYMBOLFN, BBINSTRUMENTFN, BBORDERBOOKLFN, BBACTIVEORDERFN, BBACCOUNTEXPFN, BBTRADEFN } from "../action/bbtion";
import reduxFnData from "./reduxFnData";
let iasdjflkajsd = 1
const defaultState = {
  bbassetArr: [],
  bbasset: '',
  bbsymbolArr: [],
  bbaymbol: '',
  bb_switch_ok: 0,
  bbinstrumentArr: [],
  bbinstrument: {},
  bborder_book: {
    arrAsks: [],
    arrBids: [],
  },
  bborder_book_data_one:'',
  bborder_book_data_teo:'',
  bborder_book_data_teoo:false,
  order_bookshu: 1,
  bbactive_order: {},
  bb_account_exp: {},
  bb_trade_exp: [],
  bb_trade_exp_html: '',
}


export const bbdata = (state = defaultState, action) => {
  switch (action.type) {
    case BBASSETFN:
      return { ...state, bbassetArr: action.data, bbasset: "USDT" }
    case BBSYMBOLFN:
      return { ...state, bbsymbolArr: action.data, bbaymbol: action.data.length > 0 ? action.data[0].symbol : '', bb_switch_ok: 1 }
    case 'bbassetgaibaian':
      // localStorage.bbasset = state.bbasset
      // localStorage.bbaymbol = state.bbaymbol
      return { ...state, bbasset: action.data, bb_switch_ok: 1 }
    case 'bbsymbolgaibaian':
      localStorage.bbasset = state.bbasset
      localStorage.bbaymbol = state.bbaymbol
      return { ...state, bbaymbol: action.data, bb_switch_ok: 1 }
    case 'bbsymbolgaibaianIs':
      return { ...state, bb_switch_ok: action.data }
    case 'paricefn':
      return { ...state, bborder_book_data_teo: action.data,bborder_book_data_teoo:action.isof }
    case BBACTIVEORDERFN:
      return { ...state, bbactive_order: action.data }
    case BBACCOUNTEXPFN:
     
      return { ...state, bb_account_exp: action.data }
    case 'trandefnnnn':
      return { ...state, bb_trade_exp: [],bb_trade_exp_html:'' }
    case BBTRADEFN:
      let arr = action.language.concat(state.bb_trade_exp)
      arr = arr.slice(0, 33);
      arr.sort(function (a, b) {
          return b.trade_time - a.trade_time;
      })

      reduxFnData.d(arr, action, state, (htmls) => {
          state.bb_trade_exp_html = htmls
      })
      if (action.language == []) {
          arr = []
      }
      return { ...state, bb_trade_exp: arr,bb_trade_exp_html:state.bb_trade_exp_html }
    case BBINSTRUMENTFN:
      for (let i = 0; i < action.data.length; i++) {
        if (action.data[i].symbol === state.bbaymbol) {
          state.bbinstrument = action.data[i]
        }
      }
      return { ...state, bbinstrumentArr: action.data, bbinstrument: state.bbinstrument }
    case BBORDERBOOKLFN:
      if (iasdjflkajsd > 100000000) {
        iasdjflkajsd = iasdjflkajsd - 1
      } else {
        iasdjflkajsd = iasdjflkajsd + 1
      }
      if (action.data.action === "partial") {
        state.bborder_book.arrAsks = []
        state.bborder_book.arrBids = []
        for (let i = 0; i < action.data.data.length; i++) {
          if (action.data.data[i].side === 'sell') {
            state.bborder_book.arrAsks.push(action.data.data[i])
          } else {
            state.bborder_book.arrBids.push(action.data.data[i])
          }
        }
      } else if (action.data.action === "update") {
        reduxFnData.color_size(action.data.data, state.bborder_book)
      } else if (action.data.action === "insert") {
        reduxFnData._insert(action.data.data, state.bborder_book)
      } else if (action.data.action === 'delete') {
        reduxFnData._delete(action.data.data, state.bborder_book)
      }
      reduxFnData.peixu(state.bborder_book)
      reduxFnData.color_ljl(state.bborder_book.arrAsks)
      reduxFnData.color_ljl(state.bborder_book.arrBids)
      if( state.bborder_book.arrBids.length>0){
        state.bborder_book_data_one = state.bborder_book.arrBids[0].price
      }
      return { ...state, bborder_book: state.bborder_book, order_bookshu: iasdjflkajsd,bborder_book_data_one:state.bborder_book_data_one }
    default:
      return state;
  }
}