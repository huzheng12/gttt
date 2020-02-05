import React, { Component } from 'react';
import { HashRouter as Hash, Route, Switch, Redirect } from "react-router-dom"
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';
import { connect } from "react-redux";
import Zback from '@/scripts/components/zuoyi';
import ContractsCommissioned from './ContractsCommissioned';
import sendMessage from '@/utils//ws_send_message';
import Innercangs from './table';
import AuthRouter from '../../authrouter';
import {
	objjj, wsreconnect, tokenfun, marketsquery
} from '../../action';
import AccountRecords from './accountrecords';
import './index.scss'
import EventFN from '../../../utils/eventfn';
import Introductionofstalls from './Introductionofstalls';
import Firstloading from '../../components/Firstloading';

@connect(
	state => {
		return {
			time: state.data.times,
			ticker_all: state.data.ticker_all,
			ws_connect: state.data.ws_connect,
			isLogin: state.data.isLogin,
			heyuename: state.data.heyuename,
			asset: state.data.asset,
			instrumentArr: state.data.instrumentArr,
			isHistory: state.datum.isHistory,
			a: state.datum.a,
		}
	},
	dispatch => {
		return {
			tokenFun: (n, a) => dispatch(tokenfun(n, a)),
			wsrecOnnect: (a) => dispatch(wsreconnect(a)),
			obJjj: (a) => dispatch(objjj(a)),
			marketsQuery: (a) => dispatch(marketsquery(a)),
			isHistoryfn: (a) => dispatch({ type: "isHistory", isHistory: a }),
		}
	}
)
class Transaction extends Component {
	constructor() {
		super()
		this.state = {
			isData: true,
			isHistory: true
		}
	}
	componentDidUpdate() {
		if ((this.props.ws_connect == 1 || this.props.isLogin == 1)) {
			if (this.props.asset === null) {
				return

			}
			this.props.tokenFun(localStorage.userInfo, 0)
			let options = sendMessage(this.props).obj
			if (window.wss.readyState === 1) {
				window.wss.send(JSON.stringify(options.instrument_all));
				window.wss.send(JSON.stringify(options.orderbookz));
				window.wss.send(JSON.stringify(options.trade));
				if (localStorage.userInfo) {
					window.wss.send(JSON.stringify(options.position_all));
					window.wss.send(JSON.stringify(options.pc_account));
					window.wss.send(JSON.stringify(options.order_all));
				}
			}
			this.props.wsrecOnnect(0)
		} else {
			if (this.props.isHistory === 1) {
				this.props.isHistoryfn(0)
				let options = sendMessage(this.props).obj
				if (window.wss.readyState === 1) {
					window.wss.send(JSON.stringify(options.instrument_all));
					window.wss.send(JSON.stringify(options.orderbookz));
					window.wss.send(JSON.stringify(options.trade));
					if (localStorage.userInfo) {
						window.wss.send(JSON.stringify(options.position_all));
						window.wss.send(JSON.stringify(options.pc_account));
						window.wss.send(JSON.stringify(options.order_all));
					}
				}
			}
		}
	}
	componentWillUnmount() {
		const bodys = document.getElementsByTagName("body")[0]
		bodys.className = 'theme-light'
		var objunsub = sendMessage(this.props).objunsub
		for (let i in objunsub) {
			window.wss.send(JSON.stringify(objunsub[i]))
		}
	}
	render() {
		const {
			instrumentArr
		} = this.props
		return this.props.a ? <Firstloading></Firstloading> : (
			<div className="transaction-warp clear">
				<Header></Header>
				{/* {
					(() => {
						if (localStorage.userInfo) {
							return <div className="transaction-row">
								{
									instrumentArr.map((item, index) => {
										return (
											<span key={index}>
												<span>
													{item.symbol.split(item.split_char)[0] + item.symbol.split(item.split_char)[1]}
												</span>
												<span>
													{
														EventFN.CurrencyDigitLimit({
															content: item.last_price,
															heyuename: item.symbol
														})
													}
												</span>
												<span style={{ color: item.change_rate_24h >= 0 ? "#82D9A0" : "#E63F39" }}>
													{item.change_rate_24h > 0 ? "+" + String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") : String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1")}%
											</span>
											</span>
										)
									})

								}
							</div>
						}
					})()
				} */}
				{/* 导航下边栏 */}
				<div className="transaction-content clear" style={{ minHeight: 749 }}>
					<div className="content-left">
						{
							(() => {
								if (localStorage.userInfo) {
									return <Zback ws={window.wss} obj={sendMessage(this.props).objss}></Zback>
								}
							})()
						}
					</div>
					<div className="content-right" >
						<Switch>
							<Route path="/transaction/inner" component={Innercangs}></Route>
							<Route path="/transaction/cont" component={ContractsCommissioned}></Route>
							<Route path="/transaction/accountrecords" component={AccountRecords}></Route>
							<Route path="/transaction/introductionofstalls" component={Introductionofstalls}></Route>
							<Redirect from="/transaction" to="/transaction/cont" />
						</Switch>
					</div>
				</div>
				{/* 主体 */}
				<Footer></Footer>
			</div >
		);
	}
}

export default Transaction