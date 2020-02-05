import React, { Component } from 'react';
import './index.scss'
import lang from '@/utils/language';
class IOSDownloadto extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        xiazai_logo: require('./img/xiazai_logo.png'),
        ios_store_tips_1: require('./img/ios-store-tips-1.png'),
        biaoti_icon: require('./img/biaoti_icon.png'),
        biaoti_icon1: require('./img/today.png'),
        biaoti_store: require('./img/ios-store-tips-1-3.png'),
        biaoti_icon2: require('./img/ios-store-tips-2.png'),
        biaoti_icon21: require('./img/ios-store-tips-2-1.png'),
        but_ios03: require('./img/but_ios03.png'),
      },
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
      <div className="iosdownloadto-warp">
        <header>
          <img class="logo_img" src={imgArr.xiazai_logo} alt="" />
          <div class="h1_title">
            <p class="tiele">
              {
                lang(language).GTE_app_store_installation
              }
            </p>
            <p class="p1">
              {
                lang(language).If_you_have_an_Apple_ID
              }
            </p>
          </div>
        </header>
        <section class="content">
          <img class="img-1" src={imgArr.ios_store_tips_1} alt="" />
          <div>
            <div class="aside">
              <div class="tei">
                <img src={imgArr.biaoti_icon} alt="" class="tou" />
                <span class="title-span">
                  {
                    lang(language).Enter_app_store_app
                  }
                </span>
              </div>
              <img src={imgArr.biaoti_icon} alt="" class="store-tipss" />
            </div>
          </div>
          <div>
            <div class="aside">
              <div class="tei">
                <img src={imgArr.biaoti_icon} alt="" class="tou" />
                <span class="title-span">
                  {
                    lang(language).Click_the_top_right_picture_of_the_app
                  }
                </span>
              </div>
              <img src={imgArr.biaoti_icon1} alt="" class="store-tipss store-tipss780" />
            </div>
          </div>
          <div>
            <div class="aside">
              <div class="tei">
                <img src={imgArr.biaoti_icon} alt="" class="tou" />
                <span class="title-span">
                  {
                    lang(language).Click_exit_to_log_in_and
                  }
                </span>
              </div>
              <img src={imgArr.biaoti_store} alt="" class="store-tipss store-tips-1-3" />
            </div>
          </div>
          <div>
            <div class="aside">
              <div class="tei">
                <img src={imgArr.biaoti_icon} alt="" class="tou" />
                <span class="title-span">
                  {
                    lang(language).Enter_non_mainland_China_Apple_account
                  }
                </span>
              </div>
              <p class="xianggang">
                {
                  lang(language).Enter_the_following_Hong_Kong
                }
              </p>
              <div class="table">
                <div class="tr">
                  <div class="td th">
                    {
                      lang(language).Account_number
                    }
                  </div>
                  <div class="td th">

                    {
                      lang(language).Password
                    }
                  </div>
                </div>
                <div class="tr">
                  <div class="td">
                    zaqy80a6@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    qffa2p18@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    mf83c338@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    lnlf6h10@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    oy44mq3h@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    xz7x1npo@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    jl1y8uc7@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    d79b4z6y@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td">
                    y188t17y@icloud.com
            </div>
                  <div class="td">
                    Dd112211
            </div>
                </div>
                <div class="tr">
                  <div class="td tdborder">
                    b27y8u2v@icloud.com
            </div>
                  <div class="td tdborder">
                    Dd112211
            </div>
                </div>
              </div>
              <p class="fangzhi">
                {
                  lang(language).To_prevent_your_mobile_phone_information
                }


              </p>
            </div>
          </div>
        </section>
        <div class="content">
          <img class="img-1" src={imgArr.biaoti_icon2} alt="" />
          <div>
            <div class="aside">
              <div class="tei">
                <img src={imgArr.biaoti_icon} alt="" class="tou" />
                <span class="title-span">
                  {
                    lang(language).After_successful_login
                  }
                </span>
              </div>
              <img src={imgArr.biaoti_icon21} alt="" class="store-tipss tips-2-1" />
            </div>
          </div>
          <div>
            <div class="aside">
              <div class="tei">
                <img src={imgArr.biaoti_icon} alt="" class="tou" />
                <span class="title-span">
                  {
                    lang(language).Click_the_get_button
                  }

                </span>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <a>
            <img src={imgArr.but_ios03} class="footer_img" />
          </a>
        </footer>
      </div>
    );
  }
}

export default IOSDownloadto;