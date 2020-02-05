import { DOWNLOADGETURL } from "../action/tction";

const defaultState = {
  downloadget_url: {},
  downloadget_url_flg: 0
}


export const tction = (state = defaultState, action) => {
  switch (action.type) {
    case DOWNLOADGETURL:
      console.log(action.data, ']]]]]]]]]]]]]]')
      if (action.data.downloadget_url) {
        state.downloadget_url = action.data.downloadget_url
      }
      if (action.data.downloadget_url_flg != undefined) {
        state.downloadget_url_flg = action.data.downloadget_url_flg
        console.log(state.downloadget_url_flg)
      }
      return { ...state, downloadget_url: state.downloadget_url, downloadget_url_flg: state.downloadget_url_flg }
    default:
      return state;
  }
}