import React, { Component } from 'react';
import './index.scss'
import { Link } from "react-router-dom"
import { history } from '@/utils/history'
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';
import lang from '@/utils/language';
let times
class Rechengg extends Component {
  constructor() {
    super()
    this.state = {
      chengg: require('../../../img/login/box_success.png'),
      nub: 3
    }
  }

  componentDidMount() {
    times = setInterval(() => {
      this.setState({
        nub: this.state.nub - 1
      })
      if (this.state.nub <= 0) {
        clearInterval(times)
        history.push("/transaction")
      }
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(times)
  }
  render() {
    const { chengg, nub } = this.state
    return (
      <div>
        <Header></Header>
        <div className="rechenggong-warp">
          <div className="box">
            <div className="title-img clear">
              <img src={chengg} alt="" />
            </div>
            <div className="wenzi">
              <p>
                {
                  lang().Thanks_for_your_trust_in_GTE
                }
              </p>
              <div className="wenzi-s">
                <span>{nub}s</span>
                <span>{lang().Auto_jump_or}</span>
                <Link to="/transaction">{lang().Jump_immediately}</Link>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div >
    );
  }
}

export default Rechengg;