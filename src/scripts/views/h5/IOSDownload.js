import React, { Component } from 'react';
import './index.scss'
import { history } from '@/utils/history'
import { connect } from "react-redux";
import store from '../../store';
import { downloadgeturlfn } from '../../action/tction';
import lang from '@/utils/language';
@connect(
  state => {
    return {
      downloadget_url: state.tction.downloadget_url,
      downloadget_url_flg: state.tction.downloadget_url_flg,
    }
  }
)
class IOSDownload extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        logo_img: require('./img/xiazai_logo.png'),
        xiazai_img01: require('./img/xiazai_img01.png'),
        xiazai_img02: require('./img/xiazai_img02.png'),
        xiazai_img03: require('./img/xiazai_img03.png'),
        but_ios01: require('./img/but_ios01.png'),
        but_ios02: require('./img/but_ios02.png'),
      },
      content: "https://app.1fenfa.com/app/ISKa",
      language: ""
    }
  }
  componentDidUpdate() {
    if (this.props.downloadget_url_flg === 1) {
      for (let i = 0; i < this.props.downloadget_url.app_list.length; i++) {
        console.log(this.props.downloadget_url)
        if (this.props.downloadget_url.app_list[i].id === "4") {
          this.setState({
            content: this.props.downloadget_url.app_list[i].link_url
          })
        }
      }
      store.dispatch(downloadgeturlfn({
        downloadget_url_flg: 0
      }))
    }
  }
  componentDidMount() {
    this.setState({
      language: navigator.language
    })
    document.getElementsByTagName("body")[0].id = "h5html"
    function isAndroid() {
      var u = navigator.userAgent;
      if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        return true;
      }
      return false;
    }
    // 判断设备为 iosa
    if (isAndroid() === true) {
      history.push('/h5androiddownload')
    }
  }
  componentWillUnmount() {
    document.getElementsByTagName("body")[0].id = ""
  }
  render() {
    const {
      imgArr,
      content,
      language
    } = this.state
    if (document.getElementById("launcher")) {
      document.getElementById("launcher").style.display = 'none'
    }
    return (
      <div className="iosdownload-warp">
        <div className="herder">
          <img class="logo_img" src={imgArr.logo_img} />
          <div class="h1_title">
            {/* < FormattedMessage id="Global_leading_digital_contract_trading_platform" defaultMessage={'全球领先的数字合约交易平台'} /> */}
            {
              lang(language).Global_leading_digital_contract_trading_platform
            }
          </div>
          <div class="sub_h3">
            {/* < FormattedMessage id="Safety_stability_and_credibility" defaultMessage={'安全 · 稳定 · 可信'} /> */}
            {
              lang(language).Safety_stability_and_credibility
            }
          </div>

        </div>
        <section class="content">
          <div class="list">
            <img src={imgArr.xiazai_img01} class="img_list" />
            <div class="size">
              <p>
                {
                  lang(language).More_secure
                }
                {/* < FormattedMessage id="More_secure" defaultMessage={'更安全'} /> */}
              </p>
              <p class="p2">
                {/* < FormattedMessage id="Old_stock_exchange" defaultMessage={'老牌交易所'} /> */}
                {
                  lang(language).Old_stock_exchange
                }
              </p>
            </div>
          </div>
          <div class="list">
            <img src={imgArr.xiazai_img02} class="img_list" />
            <div class="size">
              <p>
                {
                  lang(language).More_candy
                }
                {/* < FormattedMessage id="More_candy" defaultMessage={'更多糖果'} /> */}
              </p>
              <p class="p2">
                {
                  lang(language).Diversified_incentive_mechanism
                }
                {/* < FormattedMessage id="Diversified_incentive_mechanism" defaultMessage={'多元化奖励机制'} /> */}

              </p>
            </div>
          </div>
          <div class="list">
            <img src={imgArr.xiazai_img03} class="img_list" />
            <div class="size">
              <p>
                {
                  lang(language).More_samples
                }
                {/* < FormattedMessage id="More_samples" defaultMessage={'更多样'} /> */}

              </p>
              <p class="p2">
                {
                  lang(language).Support_multiple_transaction_types_such_as_contracts
                }
                {/* < FormattedMessage id="Support_multiple_transaction_types_such_as_contracts" defaultMessage={'支持合约等多种交易类型'} /> */}

              </p>
            </div>
          </div>
        </section>

        <footer>
          <div class="foorter-box">
            <div class="img-but">
              <img src={imgArr.but_ios01} onClick={() => {
                history.push('h5iosdownloadto')
              }} />
            </div>
            <div class="foot-p1 p1">
              {
                lang(language).Stable_safe_and_convenient_to_update
              }
              {/* < FormattedMessage id="Stable_safe_and_convenient_to_update" defaultMessage={'稳定安全，更新方便快捷'} /> */}

            </div>
            <div class="foot-p2 p1">
              {
                lang(language).Free_public_Apple_ID
              }
              {/* < FormattedMessage id="Free_public_Apple_ID" defaultMessage={'免费提供公共Apple ID'} /> */}

            </div>
          </div>
          <div class="foorter-box">
            <div class="img-but imgbg">
              <a href={content}>
                <img src={imgArr.but_ios02} />
              </a>
            </div>
            <div class="foot-p1 p1">
              {
                lang(language).Easy_and_fast_installation
              }
              {/* < FormattedMessage id="Easy_and_fast_installation" defaultMessage={'安装简便快捷'} /> */}
            </div>
            <div class="foot-p2 p1">
              {
                lang(language).Update_needs_to_be_installed_again
              }
              {/* < FormattedMessage id="Update_needs_to_be_installed_again" defaultMessage={'更新需要再次安装'} /> */}
            </div>
          </div>

        </footer>
      </div>
    );
  }
}

export default IOSDownload;