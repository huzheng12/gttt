import React, { Component } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { HashRouter as Hash, Route, Switch, Redirect, NavLink } from "react-router-dom"
import Deaalindex from './Dealindex'
import './index.scss'
import Current from './Current'
import Completed from './c2cCompleted'
import Disabled from './c2cDisabled'
import Receivingset from './Receivingset'
import Newguidance from './Newguidance'
export default class C2Crouter extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        assets: ""
      }
    }
  }
  componentDidMount() {
    const bodys = document.getElementsByTagName("body")[0]
    bodys.className = 'theme-light'
  }
  render() {
    const {
      imgArr
    } = this.state
    return (
      <div className="c2crouter_warp">
        <Header></Header>
        <div className="box_c2c">
          <nav>
            <div className="nav">
              <div className="nav-fist">
                <i className="iconfont iconicon-test5"></i>
                <span>
                  C2C交易
                </span>
              </div>
              <NavLink to="/C2Cdeal/index" className="navlinkuo" activeClassName="selected">交易</NavLink>
              <NavLink to="/C2Cdeal/current" className="navlinkuo" activeClassName="selected">当前订单</NavLink>
              <NavLink to="/C2Cdeal/completed" className="navlinkuo" activeClassName="selected">已完成订单</NavLink>
              <NavLink to="/C2Cdeal/disabled" className="navlinkuo" activeClassName="selected">已取消订单</NavLink>
            </div>
            <div className="nav">
              <div className="nav-fist">
                <i className="iconfont iconicon-test3"></i>
                <span>
                  用户中心
                </span>
              </div>
              <NavLink to="/C2Cdeal/receivingset" className="navlinkuo" activeClassName="selected">收款设置</NavLink>

            </div>
            <div className="nav">
              <div className="nav-fist">
                <i className="iconfont iconicon-test"></i>
                <span>
                  帮助中心
                </span>
              </div>
              <a href="https://gtehelp.zendesk.com/hc/zh-cn" target="view_window" className="navlinkuo">新手指导</a>

            </div>
          </nav>
          <Switch>
            <Route path="/C2Cdeal/index" component={Deaalindex}></Route>
            <Route path="/C2Cdeal/current" component={Current}></Route>
            <Route path="/C2Cdeal/completed" component={Completed}></Route>
            <Route path="/C2Cdeal/disabled" component={Disabled}></Route>
            <Route path="/C2Cdeal/receivingset" component={Receivingset}></Route>
            <Route path="/C2Cdeal/newguidance" component={Newguidance}></Route>
            <Redirect from="/C2Cdeal" to="/C2Cdeal/index" />
          </Switch>
        </div>
        <Footer></Footer>
      </div>
    )
  }
}
