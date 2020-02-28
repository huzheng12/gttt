
// import sendMessage from '@/utils/ws_send_message';

export default function sendMessage(props, objdata) {
    // console.log(props)
    var asset
    var heyuename
    if (objdata && objdata.heyuename) {
        heyuename = objdata.heyuename
        asset = objdata.asset
    } else {
        heyuename = props.heyuename
        asset = props.asset
    }

    const obj = {
        instrument_all: {
            "op": "sub",
            "args": { "instrument_type": "pc", "table": "instrument_all_full", "settle_currency": asset }
        }
        ,
        orderbookz: {
            "op": "sub",
            "args": { "instrument_type": "pc", "table": "order_book", "settle_currency": asset, "symbol": heyuename }
        },
        position_all: {
            "op": "sub",
            "args": { "instrument_type": "pc", "table": "active_position_all", "settle_currency": asset, "token": localStorage.userInfo }
        },
        order_all: {
            "op": "sub",
            "args": { "instrument_type": "pc", "table": "active_order_all", "settle_currency": asset, "token": localStorage.userInfo }
        },
        pc_account: {
            "op": "sub",
            "args": { "instrument_type": "pc", "table": "pc_account", "settle_currency": asset, "symbol": heyuename, "token": localStorage.userInfo }
        },
        trade: {
            "op": "sub",
            "args": { "instrument_type": "pc", "table": "trade", "settle_currency": asset, "symbol": heyuename }
        }
    }
 
    const objunsub = {
        instrument_all: {
            "op": "unsub",
            "args": { "instrument_type": "pc", "table": "instrument_all_full", "settle_currency": props.asset }
        },
        orderbookz: {
            "op": "unsub",
            "args": { "instrument_type": "pc", "table": "order_book", "settle_currency": props.asset, "symbol": props.heyuename }
        },
        position_all: {
            "op": "unsub",
            "args": { "instrument_type": "pc", "table": "active_position_all", "settle_currency": props.asset, "token": localStorage.userInfo }
        },
        order_all: {
            "op": "unsub",
            "args": { "instrument_type": "pc", "table": "active_order_all", "settle_currency": props.asset, "token": localStorage.userInfo }
        },
        pc_account: {
            "op": "unsub",
            "args": { "instrument_type": "pc", "table": "pc_account", "settle_currency": props.asset, "symbol": props.heyuename, "token": localStorage.userInfo }
        },
        trade: {
            "op": "unsub",
            "args": { "instrument_type": "pc", "table": "trade", "settle_currency": props.asset, "symbol": props.heyuename }
        }
    }

    return {
        obj,
        objunsub,
    }
}