import { BBASSETFN, BBSYMBOLFN } from "../action/bbtion";

const defaultState = {
  bbassetArr: [],
  bbasset: '',
  bbsymbolArr: [],
  bbaymbol: '',
  bb_switch_ok:0
}


export const bbdata = (state = defaultState, action) => {
  switch (action.type) {
    case BBASSETFN:
      return { ...state, bbassetArr: action.data, bbasset: "USDT" }
    case BBSYMBOLFN:
      return { ...state, bbsymbolArr: action.data, bbaymbol:action.data.length>0? action.data[0].symbol:'',bb_switch_ok:1 }
    case 'bbassetgaibaian':
      localStorage.bbasset = state.bbasset
      localStorage.bbaymbol = state.bbaymbol
      return  { ...state, bbasset: action.data,bb_switch_ok:1 }
    case 'bbsymbolgaibaian':
      localStorage.bbasset = state.bbasset
      localStorage.bbaymbol = state.bbaymbol
      return  { ...state, bbaymbol: action.data ,bb_switch_ok:1}
    case 'bbsymbolgaibaianIs':
      return  { ...state, bb_switch_ok:action.data}
      default:
      return state;
  }
}