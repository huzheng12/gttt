import { resolutionFormat } from './tradingView'
import { SymbolInfo } from './tvConfig'
import { candlefunction } from '../../scripts/action';
import store from '../../scripts/store';
import { Xfn } from '../axiosfn';
const DataFeeds = {};
DataFeeds.Tv = function () { };
DataFeeds.Tv.prototype.onReady = function (callback) {
    const defaultConfiguration = {
        symbols_type: [],
        supported_resolutions: ['1', '5', '15', '30', '60', '360', '1D'],
        supports_marks: false,
        supports_timescale_marks: false,
        supports_time: false
    };

    callback(defaultConfiguration);
};
DataFeeds.Tv.prototype.getBars = function (symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback, firstDataRequest) {
    //赋值回调
    if (firstDataRequest) {
        window.historyBarsUpdate = onDataCallback;
        window.barTo = null;
    }
    resolution = resolutionFormat(resolution); //tradingView.js
    let to = parseInt(Date.now());
    if (window.barTo) to = window.barTo;
    const from = to - 400 * parseInt(resolution) * 60 * 1000;
    window.barTo = from;
    Xfn({
        _u: "candlequeryhistory",
        _m: "get",
        _p: {
            asset: sessionStorage.asset,
            symbol: symbolInfo.name,
            start_time: from,
            end_time: to,
            interval: resolution
        }
    }, (res, code) => {
        if (code == 0) {
            store.dispatch(candlefunction(res.data, 1))
        }
    })

};
// 订阅K线数据。图表库将调用onRealtimeCallback方法以更新实时数据。
DataFeeds.Tv.prototype.subscribeBars = function (symbolInfo, resolution, onRealTimeCallback, listenerGUID, onResetCacheNeededCallback) {
    window.realtimeBarUpdate = onRealTimeCallback;
    window.listenerGuid = {
        name: symbolInfo.name,
        resolution: resolutionFormat(resolution)
    }
    if (window.wss) {
        window.wss.send(JSON.stringify({
            "op": "sub",
            "args": { "instrument_type": "pc", "table": "candle", "settle_currency": sessionStorage.asset, "symbol": symbolInfo.name, "interval": resolution }
        }))
    }
};
// 取消订阅K线数据。在调用subscribeBars方法时,图表库将跳过与subscriberUID相同的对象。
DataFeeds.Tv.prototype.unsubscribeBars = function (listenerGUID) {
    if (window.wss && window.wss.readyState === 1) {
        const time = Date.now();
        window.wss.send(JSON.stringify({
            "op": "unsub",
            "args": { "instrument_type": "pc", "table": "candle", "settle_currency": sessionStorage.assetOLd, "symbol": window.listenerGuid.name, "interval": window.listenerGuid.resolution }
        }))
    }
};
// 通过商品名称解析商品信息
DataFeeds.Tv.prototype.resolveSymbol = function (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    // const precision =  getRoundByPair(symbolName);
    const newSymbol = Object.assign({}, SymbolInfo, { //tvConfig.js
        symbol: symbolName,
        ticker: symbolName,
        name: symbolName,
        pricescale: Math.pow(10, 4) || 8, //todo
        volume_precision: 4 || 3
    });

    onSymbolResolvedCallback(newSymbol);
};
export default DataFeeds


