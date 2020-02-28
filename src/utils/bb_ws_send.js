
// import sendMessage from '@/utils/ws_send_message';

export default function bbsendMessage(props, objdata) {
  // console.log(props)
  var asset
  var heyuename
  if (objdata && objdata.bbaymbol) {
      heyuename = objdata.bbaymbol
      asset = objdata.bbasset
  } else {
      heyuename = props.bbaymbol
      asset = props.bbasset
  }


  // localStorage.userInfo
  const bbobj ={
     bbinstrument_all: {
          "op":"sub",
          "args":{"instrument_type":"bb","table":"instrument_all_full","settle_currency":asset}
      },
      bborder_book: {
          "op":"sub",
          "args":{"instrument_type":"bb","table":"order_book","settle_currency":asset,"symbol":heyuename}
      },
      // bbinstrument_all= {
      //     "op":"sub",
      //     "args":{"instrument_type":"bb","table":"instrument_all_full","settle_currency":"BTC"}
      // },
      // bbinstrument_all= {
      //     "op":"sub",
      //     "args":{"instrument_type":"bb","table":"instrument_all_full","settle_currency":"BTC"}
      // },
      // bbinstrument_all= {
      //     "op":"sub",
      //     "args":{"instrument_type":"bb","table":"instrument_all_full","settle_currency":"BTC"}
      // },
  }
  const bbobjunsub = {

  }

  return {
      bbobj,
      bbobjunsub,
  }
}