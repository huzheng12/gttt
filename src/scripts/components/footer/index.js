import React, { Component } from 'react'
import './index.scss'
import { FormattedMessage } from 'react-intl';
import { NavLink, Link } from "react-router-dom";
import { Xfn } from '../../../utils/axiosfn';
import lang from '../../../utils/language';
class Footer extends Component {
  constructor() {
    super();
    this.state = {
      imgArr: {
        io: require("../../img/bottom_logo.png"),
        f: require("../../img/facebook.png"),
        n: require("../../img/twitter.png"),
        g: require("../../img/telegram.png"),
        z: require("../../img/Instagram.png"),
      },
      timew: ""
    }
  }
  componentDidMount() {
    // Xfn({
    //   _u: "GetPersonalCenterHelpCenterAddress",
    //   _m: 'get',
    //   _p: {

    //   }
    // }, (res, code) => {
    //   if (code == 0) {
    //     console.log(res, 'footer')
    //   }
    // })
    let timew = new Date().getFullYear()
    this.setState({
      timew
    })
  }
  render() {
    const {
      imgArr, timew
    } = this.state
    return (
      <div className="footer-warp">
        <div className="footer-box">
          <div className="top clear">
            <div className="left">
              <img src={imgArr.io} alt="" />
              <p style={{ marginBottom: 40 }}>
                ©{timew - 1}-{timew} GTE
             </p>


            </div>
            <div className="right_boxq">
              <div className="tilt_biaoti">
                在线客服
                </div>
              <p>
                GTE  24小时专业客服为您提供及时帮助。
                </p>
            </div>
          </div>
          <div className="right clear">
            <ul>
              <li><FormattedMessage id="about" defaultMessage={'关于'} /></li>
              <li><a href="https://gtehelp.zendesk.com/hc/zh-cn" target="_blank">
                <FormattedMessage id="Help_Center" defaultMessage={'帮助中心'} /></a></li>
              <li><a href="https://gtehelp.zendesk.com/hc/zh-cn/sections/360005456733" target="_blank">
                <FormattedMessage id="Common_problem" defaultMessage={'常见问题'} /></a></li>
              <li>
                <NavLink className="full-trade-btn" to="/iosdownload" target="_blank">
                  <FormattedMessage id="Client_Download" defaultMessage={'客户端下载'} />
                </NavLink>
              </li>
            </ul>
            <ul>
              <li><FormattedMessage id="Business_affairs" defaultMessage={'商务'} /></li>
              <li><a href="https://gteapp.github.io/api/#introduction" target="_blank"><FormattedMessage id="API_Access" defaultMessage={'API接入'} /></a></li>
              <li>
                <a href={localStorage.language && localStorage.language !== 'zh' ? "https://gtehelp.zendesk.com/hc/en-us/articles/360040336313" : "https://gtehelp.zendesk.com/hc/zh-cn/articles/360040336313"} target="_blank">
                  <FormattedMessage id="Business_cooperation" defaultMessage={'商务合作'} />
                </a>
              </li>
            </ul>
            <ul>
              <li><FormattedMessage id="clause" defaultMessage={'条款'} /></li>
              <li>
                <a href={localStorage.language && localStorage.language !== 'zh' ? "https://gtehelp.zendesk.com/hc/en-us/articles/360039733734" : "https://gtehelp.zendesk.com/hc/zh-cn/articles/360039733734"} target="_blank">
                  <FormattedMessage id="Service_Agreement" defaultMessage={'服务协议'} />
                </a>
              </li>
              <li>
                <a href={localStorage.language && localStorage.language !== 'zh' ? "https://gtehelp.zendesk.com/hc/en-us/articles/360039838894" : "https://gtehelp.zendesk.com/hc/zh-cn/articles/360039838894"} target="_blank">
                  <FormattedMessage id="Privacy_protocol" defaultMessage={'隐私协议'} />
                </a>
              </li>
              <li>
                <a href={localStorage.language && localStorage.language !== 'zh' ? "https://gtehelp.zendesk.com/hc/en-us/articles/360039839014" : "https://gtehelp.zendesk.com/hc/zh-cn/articles/360039839014"} target="_blank">
                  <FormattedMessage id="Disclaimer" defaultMessage={'免责声明'} />
                </a>
              </li>
            </ul>
            <ul>
              <li><FormattedMessage id="data" defaultMessage={'数据'} /></li>
              <li><a href="https://gtehelp.zendesk.com/hc/zh-cn/articles/360036038434" target="_blank">
                <FormattedMessage id="Rate_standard" defaultMessage={'费率标准'} />
              </a></li>
            </ul>
            <div className="footer-imgArr">
              <li>社区</li>
              <li>
                我们在全球拥有几十万社区用户，加入他们一起交流吧。
                </li>

              <li style={{ marginTop: 10 }}>
                <div className=" clear">
                  <a href=" https://www.facebook.com/gte.io.my " target="_blank">
                    <span className="iconfont biaotiaicm">&#xe605;</span>
                  </a>
                  <a href="https://twitter.com/gte_io_official" target="_blank">
                    <span className="iconfont biaotiaicm">&#xe608;</span>
                  </a>
                  <a href="https://t.me/gteioex  " target="_blank">
                    <span className="iconfont biaotiaicm">&#xe604;</span>
                  </a>
                  <img src={imgArr.z} alt="" style={{ display: "none" }} />
                </div>
              </li>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer