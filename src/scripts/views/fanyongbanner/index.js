import React, { Component } from 'react';
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { history } from '@/utils/history'
import { Button, message, Modal } from 'antd';
import './index.scss'
import TableForm from '../../components/tableForm';
import { dangqianchipang } from '@/utils/dangqianchipang'
import ShareImage from '../../components/shareImage'
import { timehuansuan } from '../../../utils/time';
import { Xfn } from '../../../utils/axiosfn';
// import EventFN from '../../../utils/eventfn';
import { FormattedMessage } from 'react-intl';
import lang from '@/utils/language';
import { openNotificationWithIcon } from '../../../utils/NotificationCONF';
class fanyongBanner extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        a1: require('../../img/fanyong_banner.png'),
        a2: require('../../img/fanyong_buzou01.png'),
        a3: require('../../img/fanyong_buzou02.png'),
        a4: require('../../img/fanyong_buzou03.png'),
        a5: require('../../img/fanyong_share_imgicon.png'),
        a6: require('../../img/fanyong_bangdan_no1.png'),
        a7: require('../../img/fanyong_bangdan_no2.png'),
        a8: require('../../img/fanyong_bangdan_no3.png'),
        a9: require('../../img/share_bg_img.png'),
        a10: require('../../img/share_close.png'),
      },
      address: '--',
      addresse: "",
      getInviteUser: [],
      getSortRakeBack: [],
      dataLength: "",
      pictureSharing: false,
      columns: [
        {
          title: lang().Account_number_of_invited_person,
          dataIndex: 'account_id',
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {text}
          </div>,
        },
        {
          title: lang().time,
          dataIndex: 'time',
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>

            {timehuansuan(text).date}
            &ensp;
              {timehuansuan(text).dates}

          </div>,
        },
        {
          title: lang().Direct_indirect,
          dataIndex: 'level',
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {text == "1" ? lang().Direct : lang().Indirect}
          </div>,
        },
        {
          title: lang().state,
          dataIndex: 'rake_back_status',
          align: "right",
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {text == "1" ? lang().Return_commission : lang().No_return}
          </div>,
        },
      ],
      columns1: [
        {
          title: lang().Commission,
          dataIndex: 'rake_back_amt',
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {text}
          </div>,
        },
        {
          title: lang().Payment_time,
          dataIndex: 'time',
          align: "right",
          render: (text, record) => <div className="zititr" style={{ wordWrap: "break-word" }}>
            {timehuansuan(text).date}
            &ensp;
            {timehuansuan(text).dates}
          </div>,
        },
      ],
      getRakeBack: [],
      getRakeBacklength: "",
      sumAmt: "",
      nian: "",
      yue: ""
    }
  }
  componentDidMount() {
    const bodys = document.getElementsByTagName("body")[0]
		bodys.className = "theme-light"
    var dat = new Date()
    this.setState({
      nian: dat.getFullYear(),
      yue: dat.getMonth() + 1,
    })
    if (localStorage.userInfo) {
      Xfn({
        _u: "getInviteUser",
        _m: "get",
        _p: {
          current_page: "1",
          page_size: "10",
          time: new Date().getTime().toString()
        }
      }, (res, code) => {
        this.setState({ getInviteUser: res.data.data.rows, dataLength: res.data.data.total })
      })
      Xfn({
        _u: "getReferrerCode",
        _m: "get",
        _p: {
          time: new Date().getTime().toString()
        }
      }, (res, code) => {
        this.setState({
          address: res.data.data.referrer_url,
          addresse: res.data.data.referrer_code
        })
      })
      Xfn({
        _u: "getRakeBack",
        _m: "get",
        _p: {
          page_size: "10",
          current_page: "1",
          time: new Date().getTime().toString()
        }
      }, (res, code) => {
        this.setState({ getRakeBack: res.data.data.rows, getRakeBacklength: res.data.data.total, sumAmt: res.data.data.sum_amt })
      })
    }
    Xfn({
      _u: "getSortRakeBack",
      _m: "get",
      _p: {
        count: "10",
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      this.setState({ getSortRakeBack: res.data.data.rows })
    })

  }
  fenyed = (_obj) => {
    Xfn({
      _u: "getRakeBack",
      _m: "get",
      _p: {
        current_page: _obj,
        page_size: "10",
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      this.setState({ getRakeBack: res.data.data.rows, getRakeBacklength: res.data.data.total, sumAmt: res.data.data.sum_amt })
    })
  }
  fenyeds = (_obj) => {
    Xfn({
      _u: "getInviteUser",
      _m: "get",
      _p: {
        current_page: _obj,
        page_size: "10",
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      this.setState({ getInviteUser: res.data.data.rows, dataLength: res.data.data.total })
    })
  }
  pictureSharing = () => {
    this.setState({ pictureSharing: true })
  }
  pictureSharingCancel = () => {
    this.setState({ pictureSharing: false })
  }
  pictureSharingOk = () => {
    this.refs.shareimg.ClickDownLoad()
    this.setState({ pictureSharing: false })
  }
  render() {
    const { imgArr, address, addresse, getSortRakeBack, getInviteUser, columns, dataLength, columns1, getRakeBack, getRakeBacklength, sumAmt } = this.state
    return (
      <div className="fanyong-annerwarp">
        <Header></Header>
        <article>
          <section>
            <img className="imga1" src={imgArr.a1} alt="" />
          </section>
          <section>
            <div className="wPHz-box clear">
              <div className="conste-p1 clear">
                <img src={imgArr.a2} alt="" />
                <p className="spans-cos1">
                  <span>
                    < FormattedMessage id="Send_invitations_to_friends" defaultMessage={'发送邀请给好友'} />
                  </span>
                  <span>
                    < FormattedMessage id="Invite_friends_to_register_by_sharing_link" defaultMessage={'通过分享链接邀请好友注册'} />
                    GTE</span>
                </p>
                <div className="br-bordayangshi">

                </div>
              </div>
              <div className="conste-p1">
                <img src={imgArr.a3} alt="" />
                <p className="spans-cos1">
                  <span>< FormattedMessage id="Friend_registration" defaultMessage={'好友注册'} /></span>
                  <span>< FormattedMessage id="Friends_accept_the_invitation" defaultMessage={'好友接受邀请完成注册并进行交易'} /></span>
                </p>
                <div className="br-bordayangshi">

                </div>
              </div>
              <div className="conste-p1">
                <img src={imgArr.a4} alt="" />
                <p className="spans-cos1">
                  <span>< FormattedMessage id="Get_corresponding_proportion_of_commission" defaultMessage={'获得相应比例返佣'} /></span>
                  <span>< FormattedMessage id="Easy_access_to_transaction" defaultMessage={'轻松获得交易手续费返佣福利'} /></span>
                </p>
              </div>
              <div className="position-box">
                <div className="my-yaoqingma clear">
                  <div className="span-my-1">
                    < FormattedMessage id="My_exclusive_invitation_code" defaultMessage={'我的专属邀请码'} />
                    :
                    </div>
                  <div className="span-my-2">
                    {
                      (() => {
                        if (localStorage.userInfo) {
                          if (!addresse) { return "--" }
                          return addresse
                        } else {
                          return "******"
                        }
                      })()
                    }

                  </div>
                  <CopyToClipboard text={addresse}
                    onCopy={() => {
                      this.setState({ copied: true })
                      openNotificationWithIcon("opne-success", "成功", '复制成功')
                    }}>
                    <Button className="bglanse" style={{ width: 80 }} type="primary">< FormattedMessage id="copy" defaultMessage={'复制'} /></Button>
                  </CopyToClipboard>
                  {/* <Button type="primary" style={{ width: 80 }}>复制</Button> */}
                </div>
                <div className="my-yaoqingma clear">
                  <div className="span-my-1">
                    < FormattedMessage id="My_exclusive_invitation" defaultMessage={'我的专属邀请方式'} />
                    :
                    </div>
                  <div className="span-my-5">
                    {
                      (() => {
                        if (localStorage.userInfo) {
                          return address
                        } else {
                          return "******"
                        }
                      })()
                    }

                  </div>
                  {
                    (() => {
                      if (localStorage.userInfo) {
                        return <div>
                          <CopyToClipboard text={address}
                            onCopy={() => {
                              this.setState({ copied: true })
                              openNotificationWithIcon("opne-success", "成功", '复制成功')                            }}>
                            <Button className="bglanse" style={{ width: 80 }} type="primary">< FormattedMessage id="copy" defaultMessage={'复制'} /></Button>
                          </CopyToClipboard>
                          <div className="span-my-6" style={{ fontSize: 16 }}>
                            < FormattedMessage id="or" defaultMessage={'或'} />


                          </div>
                          <Button onClick={this.pictureSharing} className="bglanse" type="primary" style={{ width: 160 }}>
                            <img src={imgArr.a5} alt="" />
                            < FormattedMessage id="Picture_sharing" defaultMessage={'图片分享'} />

                          </Button>
                        </div>
                      } else {
                        return <div>
                          <Button type="primary" style={{ width: 120 }} onClick={() => history.push('/login')}>
                            < FormattedMessage id="Sign_in" defaultMessage={'登录'} /> /< FormattedMessage id="register" defaultMessage={'注册'} />
                          </Button>
                        </div>
                      }
                    })()
                  }

                </div>
              </div>
            </div>
          </section>
          <Modal
            className="pictureSharing"
            title=""
            visible={this.state.pictureSharing}
            onOk={this.pictureSharingOk}
            onCancel={this.pictureSharingCancel}
            okText={< FormattedMessage id="Save_to_local" defaultMessage={'保存到本地'} />}
          >

            <ShareImage pictureSharingCancel={this.pictureSharingCancel} addresse={address} ref="shareimg" className="tupianxiazai "></ShareImage>
          </Modal>
          <section>
            <div className="content-box">
              {
                (() => {
                  if (localStorage.userInfo) {
                    return <div className="tabe-box clear">
                      <div className="content-box-a  content-box-c">
                        <div className="content-table">
                          <div className="content-table-title">
                            < FormattedMessage id="Invitation_record" defaultMessage={'邀请记录'} />

                            <span className="span">
                              < FormattedMessage id="Total_number_of_invitations" defaultMessage={'邀请总人数'} />
                              ：
                              <span>{dataLength ? dataLength + " " : "0 "}</span> < FormattedMessage id="people" defaultMessage={'人'} /></span>
                          </div>
                          <TableForm huodongweituo={this.fenyeds} columns={columns} data={getInviteUser} dataLength={dataLength}></TableForm>
                          {dangqianchipang(dataLength)}
                        </div>
                      </div>
                      <div className="content-box-a content-box-c content-box-d">
                        <div className="content-table">
                          <div className="content-table-title">
                            < FormattedMessage id="Return_record" defaultMessage={'返佣记录'} />

                            <span className="span">
                              < FormattedMessage id="Total_Commission" defaultMessage={'佣金总额'} />
                              ：<span>{sumAmt ? sumAmt + " " : "0 "}</span>BTC   </span>
                          </div>
                          <TableForm huodongweituo={this.fenyed} columns={columns1} data={getRakeBack} dataLength={getRakeBacklength}></TableForm>
                          {dangqianchipang(getRakeBacklength)}
                        </div>
                      </div>
                    </div>
                  }
                })()
              }
              <div className="content-box-a ">
                <div className="content-table">
                  <div className="content-table-title">
                    {this.state.nian}< FormattedMessage id="year" defaultMessage={'年'} />{this.state.yue}< FormattedMessage id="month" defaultMessage={'月'} />
                    < FormattedMessage id="Invitation_list" defaultMessage={'邀请榜单'} />

                  </div>
                  <div className="content-table-theerder clear">
                    <div className="tr">
                      < FormattedMessage id="ranking" defaultMessage={'排名'} />
                    </div>
                    <div className="tr">
                      < FormattedMessage id="Account_no_of_the_inviting_party" defaultMessage={'邀请人账号'} />
                    </div>
                    <div className="tr">
                      < FormattedMessage id="Reversion_of_commission" defaultMessage={'返佣折合'} />
                    </div>
                  </div>
                  {
                    getSortRakeBack.map((item, index) => {
                      console.log(index,'=========')
                      if(index*1>=3){
                        return false
                      }
                      return <div className="content-table-td clear" key={index + item}>
                        <div className="tr"><img src={(() => {
                          switch (item.sort) {
                            case "1": return imgArr.a6;
                            case "2": return imgArr.a7;
                            case "3": return imgArr.a8;
                            default:
                              return item.sort;
                              break;
                          }
                        })()} alt="" /></div>
                        <div className="tr">{
                          (() => {
                            if (item.account.indexOf("@") == -1) {
                              return <span>{item.account.substr(0, 3) + "****" + item.account.substr(-4)}</span>
                            } else {
                              let a = item.account.replace(/\"/g, "")
                              return <div>
                                <span>
                                  {a.substr(0, 3) + "****"}
                                </span>
                                <span>
                                  {a.split("@")[1]}
                                </span>
                              </div>
                            }
                          })()
                        }</div>
                        <div className="tr">{
                          item.sum_amt + " "
                        }BTC</div>
                      </div>
                    })
                  }
                </div>
              </div>
              {dangqianchipang(getSortRakeBack.length, "token")}
              <div className="content-box-b content-box-a">
                <div className="content-table">
                  <div className="content-table-title">
                    < FormattedMessage id="Activity_rules" defaultMessage={'活动细则'} />
                  </div>
                  <p >
                    1、
                  < FormattedMessage id="Afte_a_friend_accepts_the_invitation" defaultMessage={'好友接受邀请后，每产生一笔真实交易手续费，会产生相应比例的返佣。'} />
                  </p>
                  <div>
                    2、
                    < FormattedMessage id="In_the_form_of_return_commission" defaultMessage={'返佣的形式以对应交易资产的形式返佣到您的交易账户，返佣比例为30%。'} />
                  </div>
                  <div>
                    3、
                    < FormattedMessage id="The_statistics_of_the_day_when" defaultMessage={'好友交易返佣当日统计，次日晚到账；返佣额 = 实际产生交易量 * 手续费比例 * 返佣比例。'} />
                  </div>
                  <div>
                    4、
                    < FormattedMessage id="The_invitee_can_get_a_discoun" defaultMessage={'被邀请人可以获得95折的手续费优惠。'} />
                  </div>
                  <div>
                    5、
                  < FormattedMessage id="The_effective_duration_of_the" defaultMessage={'邀请人享受好友交易返佣有效时长以被邀请人实际注册的时间开始进行计算，到达有效时长（90天）后您将不享受该邀请人交易产生手续费的返佣。'} />
                  </div>
                  <div>
                    6、
                    < FormattedMessage id="The_platform_will_take_the_market" defaultMessage={'平台将以每5分钟取一次市价进行相应币种的USDT实时换算，返佣金额以实际返佣金额为准。'} />
                  </div>
                  <div>
                    7、
                    < FormattedMessage id="Only_last_months_data_can_be" defaultMessage={'每月1号月度榜单只可以看到上月数据。'} />
                  </div>
                  <div>
                    8、
                    < FormattedMessage id="If_the_invitee_violates_the_risk" defaultMessage={'如被邀请人违反邀请返佣的相应风控规则，其手续费将不能返还给邀请人，同时，被邀请人的邀请状态变成【已无效】并且产生的返佣记录状态变成【返佣无效】。'} />
                  </div>
                  <p>
                    < FormattedMessage id="In_case_of_any_adjustment_to_the" defaultMessage={'活动如有调整，以GTE平台更新为准，最终解释权归GTE.IO所有。'} />
                  </p>
                </div>
              </div>
            </div>
          </section>
        </article>
        <Footer></Footer>
      </div>
    );
  }
}

export default fanyongBanner;