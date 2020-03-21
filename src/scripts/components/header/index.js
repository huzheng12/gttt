import React, { Component } from 'react'
import "./index.scss"
import store from '@/scripts/store'
import { connect } from "react-redux";
import { change_language, tokenfun, positionfunction, orderfuntion, zhutiyanzheng, pcaccount, heyuename } from "../../action";
import { FormattedMessage } from 'react-intl';
import { NavLink, Link } from "react-router-dom"
import { Select, Button } from 'antd';
import Qrcode from "qrcode.react";
import { history } from '@/utils/history'
import Subscribe from '../../../utils/ws_sub_unsub';
import { Xfn } from '../../../utils/axiosfn';
import { downloadgeturlfn } from '../../action/tction';
import lang from '@/utils/language';
const { Option } = Select;
@connect(
  state => {
    return {
      language: state.data.language,
      token: state.data.token,
      heyuename: state.data.heyuename,
      pcassetquery: state.data.pcassetquery,
      headerZX: state.datum.headerZX,
      asset: state.data.asset,
    }
  }
)
class Header extends Component {
  constructor() {
    super()
    this.state = {
      downloadapp: "https://www.gte.io/#/h5iosdownload",
      imgArr: {
        log1: require("../../img/logo.png"),
        log2: require("../../img/nav_head.png"),
        log3: require("../../img/nav_info.png"),
        log4: require("../../img/top_hot.png"),
        log5: require("../../img/top_download01.png"),
        a1: require('../../img/treaty_up.png'),
        a2: require('../../img/treaty_down.png'),
      },
      selecta: [
        { imgUrl: require("../../img/login/flag_chain.png"), tiile: "zh", conten: "中文" },
        { imgUrl: require("../../img/login/flag_english.png"), tiile: "en", conten: "英文" },
        // { imgUrl: require("../../img/login/flag_japan.png"), tiile: "ja", conten: "日文" },
        // { imgUrl: require("../../img/login/flag_russia.png"), tiile: "fr", conten: "法文" },
      ],
      liArr: [
        { text: <FormattedMessage id="home_page" defaultMessage={'首页'} />, routerurl: "/" },
        { text: <FormattedMessage id="Trade" defaultMessage={'合约交易'} />, routerurl: "/transaction" },
        { text: <FormattedMessage id="Currency_trading" defaultMessage={'币币交易'} />, routerurl: "/transaction" },
        { text: <FormattedMessage id="Financial_Center" defaultMessage={'财务中心'} />, routerurl: "/finance" },
        { text: <FormattedMessage id="Help_Center" defaultMessage={'帮助中心'} />, routerurl: "https://gtehelp.zendesk.com/hc/zh-cn" },
        { text: <FormattedMessage id="Invite_Commission" defaultMessage={'邀请返佣'} />, routerurl: "/fanyonganner" }
      ],
      quanbu: true,
      information: [],
      bbasset: [],
      openflg: false
    }
  }
  componentDidMount() {
    Xfn({
      _u: 'bbassetquery',
      _m: "get",
      _p: {}
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          bbasset: res.data.data.asset
        })
      }
    })
    this.changeLanguage(localStorage.language ? localStorage.language : "zh")
    Xfn({
      _u: 'information_url',
      _m: "get",
      _p: {
        type: "2",
        limit: "5"
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          information: res.data.data.rows
        })
      }
    })
    // document.getElementsByTagName("body")[0].className = "theme-light"
    Xfn({
      _u: 'downloadget_url',
      _m: 'get',
      _p: {}
    }, (res, code) => {
      if (code == 0) {
        store.dispatch(downloadgeturlfn({
          downloadget_url: res.data.data,
          downloadget_url_flg: 1
        }))
        this.setState({
          downloadapp: res.data.data.h5_download_url
        })
      }
    })

  }
  tuichudenglu = () => {
    store.dispatch({ type: "TransactionPage", TransactionPage: "1" })
    store.dispatch(positionfunction([]))
    document.getElementsByTagName("body")[0].className = "theme-dark"
    this.setState({
      zhuti: "dark"
    })
    localStorage.theme = "dark"
    store.dispatch(zhutiyanzheng('dark', 1))
    localStorage.userInfo = "";
    localStorage.userName = "";
    history.push('/transaction')
  }
  tiaozhuan = () => {
    history.push('/personal')
  }
  atz = () => {
    history.push('/personal/security')
  }

  dengluyanzheng = () => {
    if (localStorage.userInfo) {
      return (
        <div className="longin">
          <NavLink to='/finance' className="navlinkuo" activeClassName="selectedaaa">
            资产
            </NavLink>
          <NavLink to='/histororder' className="navlinkuo" activeClassName="selectedaaa">
            订单
          </NavLink>
          <div className="loginHover" onClick={this.tiaozhuan}>
            <div className="halflsk">
              <span className="iconfont colormy" >&#xe615;</span>
              {/* {
                (() => {
                  if (localStorage.userName) {
                    if (localStorage.userName == "null" || localStorage.userName == "") {
                      return false
                    }
                    if (localStorage.userName.indexOf("@") == -1) {
                      return <span>{localStorage.userName.substr(0, 3) + "****" + localStorage.userName.substr(-4)}</span>
                    } else {
                      let a = localStorage.userName
                      return <div>
                        <span>
                          {a.substr(0, 3) + "****"}
                        </span>
                        <span>
                          {a.split("@")[1]}
                        </span>
                      </div>
                    }
                  } else {
                    localStorage.userInfo = "";
                    localStorage.userName = "";
                    store.dispatch(tokenfun(''))
                    store.dispatch(positionfunction([]))
                    store.dispatch(orderfuntion([]))
                    history.push('/login')
                  }
                })()
              } */}
            </div>
            <div className="loginHoverhezi">
              <div className="neiloginHOoverhezi">
                <li onClick={this.atz}><FormattedMessage id="Account_security" defaultMessage={'账户安全'} /></li>
                <Link to="/personal/grsecurity"><FormattedMessage id="identity_authentication" defaultMessage={'身份认证'} /></Link>
                <Link to="/personal/fxs"><FormattedMessage id="Fee_Level" defaultMessage={'手续费等级'} /></Link>
                <Link to="/personal/apiguanli"><FormattedMessage id="APIManagement" defaultMessage={'API管理'} /></Link>
                <li onClick={this.tuichudenglu}><FormattedMessage id="Log_out" defaultMessage={'退出登录'} /></li>
              </div>
            </div>

          </div>
          {/* <div className="gangg">

          </div> */}

          <div className="imgtupian1 img5" style={{ cursor: 'pointer' }}>
            <span className="iconfont">&#xe603;</span>
            <article className="hexizbox" style={{
              top: '46px',
              left: '-224px'
            }}>
              <article style={{ width: 100, height: 100, margin: 10, backgroundColor: "#fff" }}>
                <Qrcode
                  style={{ margin: 6 }}
                  value={this.state.downloadapp}
                  size={88}
                ></Qrcode>
              </article>
              <article className="androidclass">
                <p><FormattedMessage id="ScanCodeToDownloadApp" defaultMessage={'扫码下载App'} /></p>
                <p>Android & iOS</p>
                <Button onClick={() => {
                  history.push('/iosdownload')
                }} type="primary" style={{ width: 100, height: 30, marginTop: 5, marginLeft: 10 }}>
                  <article className="div-chakangengduo ">
                    <FormattedMessage id="ViewMore" defaultMessage={'查看更多'} />>>
                  </article>
                </Button>
              </article>
            </article>
          </div>
          <div className="imgtupian1 img6" style={{ cursor: 'pointer' }}>
            <span className="iconfont">&#xe607;</span>
            <div className="notice_box" style={{left:"-262px"}}>
              <div className="title_box">
                <FormattedMessage id="Platform_Bulletin" defaultMessage={'平台公告'} />
              </div>
              <div className="content_box">
                {
                  this.state.information.map((item, index) => {
                    return <a href={item.link_url} target="_blank" className="itend_information" key={index + item}>
                      {
                        item.title
                      }
                    </a>
                  })
                }
              </div>
              <div className="footder_box">
                <a href="https://gtehelp.zendesk.com/hc/zh-cn" target="_blank"><FormattedMessage id="ViewMore" defaultMessage={'查看更多'} /></a>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        < div className="longin1" >
          <NavLink to="/login" className="cheze2 ziticolor" activeClassName="selected"><FormattedMessage id="Sign_in" defaultMessage={'登录'} /></NavLink>
          <NavLink to="/register" className="cheze" activeClassName="selected"><FormattedMessage id="register" defaultMessage={'注册'} />  </NavLink>
          <div className="gangg a"></div>
          <div className="imgtupian1 img5" style={{ cursor: 'pointer' }}>
            <span className="iconfont hoverxiazai">&#xe603;</span>
            <div className="hexizbox">
              <div style={{ width: 100, height: 100, margin: 10, backgroundColor: "#fff" }}>
                <Qrcode
                  style={{ margin: 6 }}
                  value={this.state.downloadapp}
                  size={88}
                ></Qrcode>
              </div>
              <div className="androidclass">
                <p><FormattedMessage id="ScanCodeToDownloadApp" defaultMessage={'扫码下载App'} /></p>
                <p>Android & iOS</p>

                <Button onClick={() => {
                  history.push('/iosdownload')
                }} type="primary" style={{ width: 100, height: 30, marginTop: 5, marginLeft: 10 }}>
                  <div className="div-chakangengduo " >
                    <FormattedMessage id="ViewMore" defaultMessage={'查看更多'} /> >>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className="imgtupian1 img6" style={{ cursor: 'pointer' }}>
            <span className="iconfont">&#xe607;</span>
            <div className="notice_box">
              <div className="title_box">
                <FormattedMessage id="Platform_Bulletin" defaultMessage={'平台公告'} />
              </div>
              <div className="content_box">
                {
                  this.state.information.map((item, index) => {
                    return <a href={item.link_url} target="_blank" className="itend_information" key={index + item}>
                      {
                        item.title
                      }
                    </a>
                  })
                }
              </div>

              <div className="footder_box">
                <a href="https://gtehelp.zendesk.com/hc/zh-cn" target="_blank">
                  <FormattedMessage id="ViewMore" defaultMessage={'查看更多'} /></a>
              </div>
            </div>
          </div>
        </div >
      )
    }
  }
  jiaoyiyemian = () => {
    store.dispatch({ type: "TransactionPage", TransactionPage: "1" })
    store.dispatch({ type: "isHistory", isHistory: 1 })
  }
  changeLanguage = (val) => {
    if (val == 'zh') {
      window.zEzn()
    } else {
      window.zEen()
    }
    store.dispatch(change_language(val));
    localStorage.setItem('language', val);
  }
  handleChangeguoji = (val) => {
    store.dispatch({ type: 'change_language_flg', change_language_flg: 1 });
    this.changeLanguage(val)
  }
  dianjiquanbu = () => {
    if (this.state.quanbu) {
      this.setState({ quanbu: false })
      if (this.state.quanbu) {
        var that = this
        var para = document.createElement("div");
        para.id = "bud"
        var element = document.getElementById("root");
        element.appendChild(para);
        var bud = document.getElementById("bud");
        bud.onclick = () => {
          that.setState({
            quanbu: true
          })
          element.removeChild(bud);
        }
      }
    } else {
      var element = document.getElementById("root");
      var bud = document.getElementById("bud");
      this.setState({ quanbu: true })
      element.removeChild(bud);
    }
  }
  qiehuanusd = (a) => {
    Xfn({
      _u: 'pairQuery',
      _m: 'get',
      _p: {
        asset: a
      }
    }, (res, code) => {
      if (code === 0 && res.data.data.rows[0]) {
        Subscribe({
          _por: this.props,
          _this: this,
          _asset: a,
          _pair: res.data.data.rows[0].symbol,
          _typt: 9//切换资产
        })
      }
    })
  }
  openflg = () => {
    this.setState({
      openflg: true
    })
  }
  render() {
    const {
      imgArr,
      selecta,
      quanbu,
      bbasset,
      openflg
    } = this.state
    const {
      language,
      pcassetquery,
      asset
    } = this.props
    return (
      <div className="header-warp">
        <div className="header-left clear">
          <img onClick={() => history.push('/sices')} src={imgArr.log1} alt="" />
          <ul>
            <NavLink to='/sices' className="navlinkuo" activeClassName="selectedaaa">
              <FormattedMessage id="home_page" defaultMessage={'首页'} />
            </NavLink>
            <NavLink onClick={this.jiaoyiyemian} to={localStorage.userInfo ? '/transaction' : "/fulltrade"} className={window.location.hash.indexOf("cont") != -1 ? "navlinkuo selectedaaa" : "navlinkuo"} activeClassName="selectedaaa">
              <FormattedMessage id="Trade" defaultMessage={'合约交易'} />
              <span className="iconfont biaotiaicm">&#xe609;</span>
            </NavLink>
            {/* <a href="https://exchange.gte.io/Trade/index/market/bys_usdt" target="view_window" className="navlinkuo" >
              <FormattedMessage id="Currency_trading" defaultMessage={'币币交易'} />
            </a> */}
            <NavLink to='/BBTradePage' className="navlinkuo" activeClassName="selectedaaa">
              <FormattedMessage id="Currency_trading" defaultMessage={'币币交易'} />
            </NavLink>
            {/* <NavLink to='/finance' className="navlinkuo" activeClassName="selectedaaa">
              <FormattedMessage id="Financial_Center" defaultMessage={'财务中心'} />
            </NavLink> */}
            {/* <a href="https://gtehelp.zendesk.com/hc/zh-cn" target="view_window" className="navlinkuo" >
              <FormattedMessage id="Help_Center" defaultMessage={'帮助中心'} />
            </a> */}
            <NavLink to='/C2Cdeal' className="navlinkuo" activeClassName="selectedaaa">
              C2C交易
            </NavLink>
            <NavLink to='/fanyonganner' className="navlinkuo" activeClassName="selectedaaa">
              <FormattedMessage id="Invite_Commission" defaultMessage={'邀请返佣'} />
            </NavLink>
          </ul>
        </div>
        <div className="header-right">
          {
            this.dengluyanzheng()
          }
          {
            (window.location.href.indexOf('sices') !== -1 ||
              window.location.href.indexOf('transaction') !== -1 ||
              window.location.href.indexOf('fulltrade') !== -1) && <div className="xuanxiang">
              <div className="ggang"></div>
              <div className="inputxiala">
                {
                  this.props.asset ? this.props.asset + " " + lang().Trading_area : ""
                }
              </div>
              <div className="sximg" />
              <div className="ggang">
              </div>
              <div className="inpusll_wawrp_box">
                <div className="inpusll-wawrp">
                  {
                    pcassetquery.map((item, index) => {
                      return <li key={item + index} onClick={() => this.qiehuanusd(item.asset)} className={item.asset === this.props.asset ? "action-inputxiala" : ""}>
                        <div className='bizhong' style={{ borderColor: item.asset === this.props.asset ? "#2F6FED" : "" }}>
                          <img className="icon_img_box" src={item.icon_img} alt="" />
                        </div>
                        <div>
                          {item.asset ? item.asset + " " + lang().Trading_area : ""}
                        </div>
                      </li>
                    })
                  }
                </div>
              </div>
            </div>
          }
          <div className="guojihua">
            <div className="guojihuaone">
                {
                  (()=>{
                    for(let i=0;i<selecta.length;i++){
                      if(selecta[i].tiile===language){
                        return <li>
                        <img style={{ display: "inline-block", marginRight: 10 }} src={selecta[i].imgUrl} alt="" />
                        <span style={{ display: "inline-block", marginTop: 1 }}>{selecta[i].conten}</span>
                        <div className="imgjianto"></div>
                      </li>
                      }
                    }
                  })()
                }
            </div>
            <div className="guojihua_box_wrp">
              {
                selecta.map((item, index) => {
                  return <li key={item + index} onClick={() => this.handleChangeguoji(item.tiile)} className={item.tiile === this.props.language ? "action-inputxiala" : ""}>
                    <img style={{ display: "inline-block", marginRight: 10,marginLeft:10 }} src={item.imgUrl} alt="" />
                    <span style={{ display: "inline-block", marginTop: 1 }}>{item.conten}</span>
                  </li>
                })
              }
            </div>
            {/* <Select
              className="eme_lig"
              open={openflg}
              defaultValue={language}
              style={{ width: 120, border: 0, backgroundColor: "rgba(18,24,38,1)" }}
              onChange={this.handleChangeguoji}>
              {
                selecta.map((item, index) => {
                  return (
                    <Option className="clear" value={item.tiile} key={"adfd" + index}>
                      <img style={{ display: "inline-block", marginRight: 10 }} src={item.imgUrl} alt="" />
                      <span style={{ display: "inline-block", marginTop: 1 }}>{item.conten}</span>
                    </Option>
                  )
                })
              }
            </Select> */}
          </div>
        </div>
      </div >
    )
  }
}
export default Header
