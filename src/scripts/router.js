import React, { Component } from 'react';
import { HashRouter as Hash, Route, Switch } from "react-router-dom"
import Transaction from './views/transaction';
import Finance from './views/finance';
import Login from './views/login';
import Register from './views/register';
import Personal from './views/personal';
import AuthRouter from './authrouter';
import Resetpass from './views/ResetPassword';
import Rechengg from './views/register/rechenggong';
import Sices from './views/slices';
import Verify_type from './views/verifytype';
import fanyongBanner from './views/fanyongbanner';
import FullTradePage from './views/fulltradepage';
import { Xfn } from '../utils/axiosfn';
import { candlefunction, pcassetqueryfn, pairqueryfn, marketsquery, instrumentfn, pacaccoundt, orderBookLfn, positionfunction, pcaccount, orderfuntion, candlefunallction, assetfn } from './action';
import { bbassetfn, bbsymbolfn, bbinstrumentfn, bborderBookLfn, bbactive_orderfn, bb_account_expfn, bbtradefn, bbcandlefunction } from './action/bbtion';
import store from './store';
import { connect } from "react-redux";
import IosDownload from './views/IOSdownload';
import IOSDownload from './views/h5/IOSDownload';
import IOSDownloadto from './views/h5/IOSDownloadto';
import AndroidDownload from './views/h5/AndroidDownload';
import Appregister from './views/h5/Appregister';
import { time } from '@/utils/times.js'
import Error from './views/error/e404';
import C2Crouter from './views/c2c';
import SuccessfulPayment from './views/c2c/SuccessfulPayment';
import BBTradePage from './views/bbtrander';
import Bborder from './views/bbOrder';
let asset
@connect(
	state => {
		return {
			heyuename: state.data.heyuename,
			asset: state.data.asset,
			asset_switch: state.data.asset_switch,
			differentiatedtransactions: state.datum.differentiatedtransactions,
			change_language_flg: state.datum.change_language_flg,
		}
	}
)
class Index extends Component {
	constructor() {
		super()
		this.state = {
			a: true
		}
	}
	componentDidUpdate() {
		if (this.props.asset_switch === 1) {
			Xfn({
				_u: 'pairQuery',
				_m: 'get',
				_p: {
					asset: this.props.asset
				}
			}, (res, code) => {
				if (code == 0) {
					store.dispatch(pairqueryfn(res))
				}
			})
			Xfn({
				_u: "marketsquery",
				_m: "get",
				_p: {
					asset: this.props.asset,
					symbol: this.props.heyuename,
					time: new Date().getTime().toString()
				}
			}, (res, code) => {
				if (code == 0) {
					store.dispatch(marketsquery(res.data.data.face_value))
					store.dispatch(assetfn(this.props.asset, 0))
				}
			})
		}
	}
	// bb资产和交易对
	bbassetFn = () => {
		Xfn({
			_u: "bbassetquery",
			_m: 'get',
			_p: {

			}
		}, (res, code) => {
			if (code === 0) {
				store.dispatch(bbassetfn(res.data.data.asset))
				Xfn({
					_u: "bbsymbolquery",
					_m: "get",
					_p: {
						asset: "USDT"
					}
				}, (res, code) => {
					if (code === 0) {
						store.dispatch(bbsymbolfn(res.data.data.rows))
					}
				})
			}
		})
	}
	componentDidMount() {
		this.bbassetFn()
		if (this.props.change_language_flg === 0) {
			Xfn({
				_u: 'pcAssetQuery',
				_m: 'get',
				_p: {}
			}, (res, code) => {
				if (code == 0) {
					asset = res.data.data.asset[0].asset
					store.dispatch(pcassetqueryfn(res))
					Xfn({
						_u: 'pairQuery',
						_m: 'get',
						_p: {
							asset: asset
						}
					}, (res, code) => {
						if (code == 0) {
							store.dispatch(pairqueryfn(res))
							Xfn({
								_u: "marketsquery",
								_m: "get",
								_p: {
									asset: asset,
									symbol: res.data.data.rows[0].symbol,
									time: new Date().getTime().toString()
								}
							}, (res, code) => {
								if (code == 0) {
									store.dispatch(marketsquery(res.data.data.face_value))
								}
							})
						}
					})
				}
			})
		}
		window.wss.onmessage = e => {
			const _data = JSON.parse(e.data)
			if (_data.instrument_type === 'bb') {
				switch (_data.table) {
					case 'instrument_all_full':
						store.dispatch(bbinstrumentfn(_data.data))
						break;
					case 'order_book':
						store.dispatch(bborderBookLfn(_data))
						break;
					case 'active_order':
						store.dispatch(bbactive_orderfn(_data))
						break;
					case 'bb_account_exp':
						store.dispatch(bb_account_expfn(_data.data))
						break;
					case 'trade':
						store.dispatch(bbtradefn(_data.data))
						break;
					case 'candle':
						store.dispatch(bbcandlefunction(_data, 0))
						break;
				}
			} else {
				switch (_data.table) {
					case 'instrument_all_full':
						store.dispatch(instrumentfn(_data.data))
						break;
					case 'order_book'://解决

						store.dispatch(orderBookLfn(_data))
						break;
					case 'pc_account':
						store.dispatch(pcaccount(_data))
						break;
					case 'active_order_all':
						window.orderlength = "1"
						store.dispatch(orderfuntion(_data))
						break;
					case 'trade':
						store.dispatch(pacaccoundt(_data.data))
						break;
					case 'active_position_all':
						store.dispatch({ type: 'allposiont', allposiont: "1" })
						store.dispatch(positionfunction(_data.data))
						break;
					case 'candle':
						if (this.props.differentiatedtransactions === 1) {
							store.dispatch(candlefunallction(_data, _data.symbol))
						} else {
							store.dispatch(candlefunction(_data, 0))
						}
						break;
				}
			}
			// console.log(_data,'ssd')

		};
	}
	render() {
		return (<Hash basename="/">
			<div>
				<Switch>
					<Route exact path="/" component={Sices}></Route>
					<Route path="/transaction" component={Transaction}></Route>
					<Route path="/login" component={Login}></Route>
					<Route path="/verifytype" component={Verify_type}></Route>
					<Route path="/register" component={Register}></Route>
					<Route path="/resetpass" component={Resetpass}></Route>
					<Route path="/fanyonganner" component={fanyongBanner}></Route>
					<Route path="/registerwin" component={Rechengg} ></Route>
					<Route path="/sices" component={Sices} ></Route>
					<Route path="/iosdownload" component={IosDownload} ></Route>
					<Route path="/h5iosdownload" component={IOSDownload} ></Route>
					<Route path="/h5iosdownloadto" component={IOSDownloadto} ></Route>
					<AuthRouter path="/finance" component={Finance}></AuthRouter>
					<AuthRouter path="/C2Cdeal" component={C2Crouter} ></AuthRouter>
					<AuthRouter path="/personal" component={Personal}></AuthRouter>
					<Route path="/h5androiddownload" component={AndroidDownload} ></Route>
					<Route path="/appregister/:name" component={Appregister} ></Route>
					<Route path="/fulltrade" component={FullTradePage} ></Route>
					<Route path="/BBTradePage" component={BBTradePage} ></Route>
					<Route path="/histororder" component={Bborder} ></Route>
					<Route path="/error" component={Error} ></Route>
					<Route path="/successfulpayment" component={SuccessfulPayment}></Route>
				</Switch>
			</div>
		</Hash>);
	}
}
export default Index;