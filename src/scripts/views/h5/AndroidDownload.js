import React, { Component } from 'react';
import './index.scss'
import { Popover, Button } from 'antd';
import lang from '@/utils/language';
class AndroidDownload extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        logo_img: require('./img/xiazai_logo.png'),
        xiazai_img01: require('./img/xiazai_img01.png'),
        xiazai_img02: require('./img/xiazai_img02.png'),
        xiazai_img03: require('./img/xiazai_img03.png'),
        but_ios01: require('./img/but_android.png'),

      },
      content: "46546",
      language: "zh"
    }
  }
  componentDidMount() {
    this.setState({
      language: navigator.language
    })
    document.getElementsByTagName("body")[0].id = "h5html"
  }
  componentWillUnmount() {
    document.getElementsByTagName("body")[0].id = ""
  }
  render() {
    const {
      imgArr, language
    } = this.state
    return (
      <div className='androiddownload-warp'>
        <header>
          <img class="logo_img" src={imgArr.logo_img} alt="" />
          <div class="h1_title">
            {
              lang(language).Global_leading_digital_contract_trading_platform
            }

          </div>
          <div class="sub_h3">
            {
              lang(language).Safety_stability_and_credibility
            }
          </div>
        </header>

        <section class="content">
          <div class="list">
            <img src={imgArr.xiazai_img01} alt="" class="img_list" />
            <div class="size">
              <p>
                {
                  lang(language).More_secure
                }
              </p>
              <p class="p2">
                {
                  lang(language).Old_stock_exchange
                }
              </p>
            </div>
          </div>
          <div class="list">
            <img src={imgArr.xiazai_img02} alt="" class="img_list" />
            <div class="size">
              <p>
                {
                  lang(language).More_candy
                }
              </p>
              <p class="p2">
                {
                  lang(language).Diversified_incentive_mechanism
                }
              </p>
            </div>
          </div>
          <div class="list">
            <img src={imgArr.xiazai_img03} alt="" class="img_list" />
            <div class="size">
              <p>
                {
                  lang(language).More_samples
                }
              </p>
              <p class="p2">
                {
                  lang(language).Support_multiple_transaction_types_such_as_contracts
                }
              </p>
            </div>
          </div>
        </section>

        <footer>
          <a href="https://test-gte.s3-ap-northeast-1.amazonaws.com/安卓/gte_1.0.apk">
            <img src={imgArr.but_ios01} alt="" class="footer_img" />
          </a>
        </footer>
      </div>
    );
  }
}

export default AndroidDownload;