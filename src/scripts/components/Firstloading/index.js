import React, { Component } from 'react'
import './index.scss'
import { connect } from "react-redux";
import store from '../../store';
@connect(
  state => {
    return {
      instrumentArr: state.data.instrumentArr,
    }
  }
)

class Firstloading extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        jiazai: require('../../img/jiazai_bg.png'),
        MG000: require('../../img/MG000.gif'),
        jiazai_logo01: require('../../img/jiazai_logo01.png'),
      },
      a: "img_box",
      isOk: true,
      b: "firstloading_warp"
    }
  }
  componentDidUpdate() {
    if (this.state.isOk && this.props.instrumentArr.length > 0) {
      this.setState({
        b: "firstloading_warp demo-fading",
        isOk: false
      })
    }
  }
  componentDidMount() {
    let tt = document.getElementById('animations')
    tt.addEventListener("webkitAnimationEnd", () => {
      store.dispatch({ type: "a", a: 3 })
    })
  }
  render() {
    const {
      imgArr, b
    } = this.state
    return (
      <div className={b} id="animations">
        <div className={this.state.a}>
          <img className="img1" src={imgArr.MG000} alt="" />
          <img className="img2" src={imgArr.jiazai_logo01} alt="" />
        </div>
      </div>
    )
  }
}




export default Firstloading