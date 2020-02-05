import React, { Component } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Drawer, Button } from 'antd';
import { history } from '@/utils/history'
var time = null

export default class SuccessfulPayment extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        ao: require('../../../img/box_success.png')
      },
      width: document.documentElement.clientHeight - 50 - 365,
      daojishi: 3
    }
  }
  componentDidMount() {

    time = setInterval(() => {
      this.setState({
        daojishi: this.state.daojishi - 1
      })
      if (this.state.daojishi === 0) {
        clearInterval(time)
        time = null
        history.push('/C2Cdeal/index')
      }
    }, 1000);
  }
  componentWillUnmount() {
    if (time !== null) {
      clearInterval(time)
    }
  }
  render() {
    const {
      imgArr, width, daojishi
    } = this.state
    return (
      <div >
        <Header></Header>


        <div className="mian_warp" style={{ height: width }}>
          <img src={imgArr.ao} alt="" className="img_box" />
          <span>
            支付成功
          </span>
          <div className='title_fanhui'>
            <span className="daojishi_box">{daojishi}s</span>
            <span>后自动返回GTE</span>
          </div>
          <Button type="primary" style={{ width: 120, marginTop: 30 }} className="primary_custom" onClick={() => {
            if (time !== null) {
              clearInterval(time)
            }
            history.push('/C2Cdeal/index')
          }}>
            <div className="but_font">
              立即返回
              </div>
          </Button>
        </div>

        <Footer></Footer>


      </div>
    )
  }
}
