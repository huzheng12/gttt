import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss'
import store from './scripts/store'
import { Provider } from 'react-redux'
import Index from './scripts/router';
import Intl from './Intl';
import ReconnectingWebsocket from 'reconnecting-websocket';
import { wsreconnect } from './scripts/action';
// 兼容ie
import "react-app-polyfill/ie11";
// import  "react-app-polufill/stable";
const options = {
    connectionTimeout: 20000,
    maxReconnectAttempts: 3,
};
let wsurl = "wss://wss.icocrop.io"
// let wsurl = 'wss://wss.gte.io'
var i = 0
window.wss = new ReconnectingWebsocket(wsurl, null, options);
window.wss.maxRetries = 3
window.wss.connectionTimeout = 20000
window.IntervalWS = setInterval(() => {
    if (window.wss && window.wss.readyState === 1) {
        try {
            window.wss.send(JSON.stringify({
                "op": "ping",
            }));
        } catch (e) {
            console.error(`ws has error: ${e}`)
        }
    }
}, 20 * 1000);
window.wss.onopen = function () {
    localStorage.ws_connect = "1"
    store.dispatch(wsreconnect(1))
}
window.wss.onclose = function () {
    i = i + 1
    window.wss.close()
    store.dispatch(wsreconnect(0))
    localStorage.ws_connect = "0"
    if (i < 5) {
        window.wss.reconnect();
    }
}
window.onbeforeunload = function () {
    var n = window.event.screenX - window.screenLeft;
    var b = n > document.documentElement.scrollWidth - 20;
    if (b && window.event.clientY < 0 || window.event.altKey) {
        window.wss.close()
        window.wss = null
        window.event.returnValue = ""; //这里可以放置你想做的操作代码
    } else {
        window.wss = null
        window.wss.close()
    }
}
window.minHeith = document.documentElement.clientHeight-415
console.log(window.minHeith)
function hotRender() {
    ReactDOM.render(
        <Provider store={store}>
            <Intl>
                <Index />
            </Intl>
        </Provider>
        , document.getElementById('root'));
}

hotRender()
store.subscribe(hotRender)
serviceWorker.unregister();
