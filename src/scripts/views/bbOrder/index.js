import React, { Component } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './index.scss'
import { NavLink } from "react-router-dom"
import { HashRouter as Hash, Route, Switch,Redirect } from "react-router-dom"
import Heyuehistry from './heyuehist'
import Bbhistry from './bbhist'



export default class Bborder extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        a3: require('../../img/taadeinfo0.png'),
      }
    }
  }
  componentDidMount(){
    const bodys = document.getElementsByTagName("body")[0]
    bodys.className = "theme-light"
    console.log(222)
  }
  render() {
    const {
      imgArr
    } = this.state
    return (
      <div className="bborder_warp">
        <Header></Header>
        <div className="main">
          <div className="left_box">

            <div className="content-tow">
              <p>
                <img src={imgArr.a3} alt="" />
                订单中心
						</p>
              <NavLink className="navlinkuo" activeClassName="selected" to="/histororder/bbhistry">
                币币订单
					  </NavLink>
              <NavLink className="navlinkuo" activeClassName="selected" to="/histororder/heyuehistry">
                合约订单
					</NavLink>
            </div>

          </div>
          <div className="right_box" style={{minHeight:window.minHeith}}>
            <Switch>
              <Route path="/histororder/heyuehistry" component={Heyuehistry}></Route>
              <Route path="/histororder/bbhistry" component={Bbhistry}></Route>
              <Redirect from="/histororder" to="/histororder/bbhistry" />

            </ Switch>
          </div>
        </div>


        <Footer></Footer>

      </div>
    )
  }
}
