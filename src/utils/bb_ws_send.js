
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
    const bbobj = {
        bbinstrument_all: {
            "op": "sub",
            "args": { "instrument_type": "bb", "table": "instrument_all_full", "settle_currency": asset }
        },
        bborder_book: {
            "op": "sub",
            "args": { "instrument_type": "bb", "table": "order_book", "settle_currency": asset, "symbol": heyuename }
        },
        bb_account_exp: {
            "op": "sub",
            "args": { "instrument_type": "bb", "table": "bb_account_exp", "settle_currency": asset, "symbol": heyuename, "token": localStorage.userInfo }
        },
        bb_active_order:{
            "op":"sub",
            "args":{"instrument_type":"bb","table":"active_order","settle_currency":asset,"symbol":heyuename,"token": localStorage.userInfo}
         },
         bb_trade:{
            "op":"sub",
             "args":{"instrument_type":"bb","table":"trade","settle_currency":asset,"symbol":heyuename}          
        },
    }
    const bbobjunsub = {
        bbinstrument_all: {
            "op":"unsub",
            "args":{"instrument_type":"bb","table":"instrument_all_full","settle_currency":localStorage.bbasset}
        },
        bborder_book: {
            "op":"unsub",
            "args":{"instrument_type":"bb","table":"order_book","settle_currency":localStorage.bbasset,"symbol":localStorage.bbaymbol}
        },
        bb_account_exp: {
            "op":"unsub",
            "args":{"instrument_type":"bb","table":"bb_account_exp","settle_currency":localStorage.bbasset,"symbol":localStorage.bbaymbol, "token":localStorage.userInfo}
        },
        bb_active_order: {
            "op":"unsub",
            "args":{"instrument_type":"bb","table":"active_order","settle_currency":localStorage.bbasset,"symbol":localStorage.bbaymbol,"token":localStorage.userInfo}
         },
         bb_trade:{
            "op":"unsub",
            "args":{"instrument_type":"bb","table":"trade","settle_currency":localStorage.bbasset,"symbol":localStorage.bbaymbol}   
        },
    }

    return {
        bbobj,
        bbobjunsub,
    }
}