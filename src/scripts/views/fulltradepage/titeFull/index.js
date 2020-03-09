import React, { Component } from 'react';
import {
  Button,
  Modal,
  Radio,
  Input,
  Select,
  Tooltip
} from 'antd';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { history } from '@/utils/history'
import Subscribe from '../../../../utils/ws_sub_unsub';
import store from '@/scripts/store.js'
import { Xfn } from '../../../../utils/axiosfn';
import { openNotificationWithIcon } from '../../../../utils/NotificationCONF';
import { pacaccoundt } from '../../../action';
import MoreLeverage from '../../../components/MoreLeverage';
import { numberHandle } from '../../../../utils/numberHandle';
import lang from '@/utils/language';
import EventFN from '../../../../utils/eventfn';
import ContractDropdown from '../../transaction/ContractsCommissioned/ContractDropdown';
import Headernav from '../../bbtrander/bbcomponents/headernav';
import Modeltrund from '../../bbtrander/placeorder/modeltrund';

const { Option } = Select;

@connect(
  state => {
    return {
      heyuename: state.data.heyuename,
      ticker_all: state.data.ticker_all,
      position: state.data.position,
      ticker: state.data.ticker,
      price: state.data.price,
      funding_rate: state.data.funding_rate,
      pc_account: state.data.pc_account,
      lever: state.datum.lever,
      instrument: state.data.instrument,
      asset: state.data.asset,
      heyuenameischange: state.data.heyuenameischange,
      asset_switch: state.data.asset_switch,
      Decimal_point: state.data.Decimal_point,
      ...state.bbdata,

    }
  }
)

class TitleFullk extends Component {
  constructor() {
    super()
    this.state = {
      uil: true,
      valuequanbushuliang: "",
      numshuliang: "0",
      imgArr: {
        modifyt1: require("../../../img/treaty_prompt.png"),
        a1: require("../../../img/rate_down.png"),
        a2: require('../../../img/rate_up.png'),
        a3: require('../../../img/taadeinfo.png'),
        a4: require('../../../img/treaty_up.png'),
        ioo: require('../../../img/nothing_data.png'),
        a5: require('../../../img/treaty_down.png'),
        ax: require('../../../img/xia.png'),
        as: require('../../../img/shang.png'),
        ax1: require('../../../img/xia_02.png'),
        as1: require('../../../img/shang_02.png'),
        down: require('../../../img/home_market_down.png'),
        up: require('../../../img/home_market_up.png'),
        box_point: require('../../../img/box_point.png'),
      },
      LeverageBuying: "",
      num17: 0,
      moshi: "2",
      max_leverage: "0",
      kong: 0,
      visible5: false,
      visible10: false,
      visible8: false,
      LeverageFoundationInformation: {},//***杠杆基础信息***
      LeverageBuying: "",//***杠杆买***
      LeveragedSell: "",//***杠杆卖***
      LeverAir: "",//***杠杆空***
      confirmLoading: false,
      ModalText: '账户模式：',
      zjzhfangxiangs: "1",
      zjzhfangxiangchus: "2",
      zjzhfangxiang: "1",
      zjzhfangxiangchu: "3",
      numshuliangold: "",
      available: "",
      visible: false
    }
  }


  bboaccountavailablefn = (type) => {
    Xfn({
      _u: "bboaccountavailable",
      _m: "get",
      _p: {
        asset: this.props.bbasset,
        account_type: type
      }
    }, (res, code) => {
      if (code !== 0) {
        return false
      }
      this.setState({
        available: res.data.data
      })
      console.log(res)
    })
  }
  // 点击划转
  visibleFn = (flg, type) => {
    // type ===1  点击划转
    if (type === 1) {
      this.bboaccountavailablefn('1')
    } else if (type === 2) {

    }
    this.setState({
      visible: flg,
      zjzhfangxiang: "1",
      zjzhfangxiangchu: "3",
    })
  }
  handleCancel3 = () => {
    this.setState({
      visible10: false,
    });
  };
  componentDidMount() {
    this.settingzuidaz()
  }
  settingzuidaz = () => {
    if (localStorage.userInfo && this.props.asset) {
      Xfn({
        _u: "settingzuida",
        _m: "get",
        _p: {
          asset: this.props.asset,
          symbol: this.props.heyuename,
          time: new Date().getTime().toString()
        }
      }, (res, code) => {
        if (code == 0) {
          this.setState({
            LeverageFoundationInformation: res.data.data,
            moshi: res.data.data.margin_mode,
            LeverageBuying: res.data.data.bid_leverage,//***杠杆买***
            LeveragedSell: res.data.data.ask_leverage,//***杠杆卖***
            LeverAir: res.data.data.ask_leverage,//***杠杆空***
          })
          store.dispatch({ type: "LeverageFoundationInformation", LeverageFoundationInformation: res.data.data.margin_mode })
        }
      })
    }
  }
  settingzuida = () => {
    this.settingzuidaz()
  }
  componentDidUpdate() {
    if (this.props.heyuenameischange === 1 || this.props.asset_switch === 1) {
      this.settingzuidaz()
    }
    if (this.props.lever === 1) {
      store.dispatch({ type: "lever", lever: 0 })
      this.settingzuidaz(this.props.heyuename)
    }

    if (this.props.ticker) {
      if (this.state.jiageaahenhao !== this.props.ticker.last) {
        this.setState({
          jiageaahenhao: this.props.ticker.last
        })
      }
    }
  }
  showModal = (val) => {
    if (this.props.position.length > 0) {
      this.setState({
        visible8: true,
      });
    } else {
      this.setState({
        visible10: true,
      });
    }
  };

  handleOk8 = () => {
    this.setState({
      visible8: false,
    })
  }
  positionmoshi = () => {
    Xfn({
      _u: "position",
      _m: "post",
      _p: {
        asset: this.props.asset,
        symbol: this.props.heyuename,
        pos_mode: this.state.moshi,
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          moshi: res.data.data.mode
        })
      } else {
        this.setState({
          moshi: this.state.moshi == "1" ? "2" : "1"
        })
      }
    })

  }
  handleOk = () => {
    this.positionmoshi()
    this.setState({
      visible10: false
    })

  };
  valuequanbushuliang = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/, '$1$2.$3');//只能输入两个小数  
    if (value[0] != ".") {
      if (value[0] == 0 && value[1] == 0) {

      } else {
        this.setState({
          valuequanbushuliang: value
        })
      }
    }
    this.setState({
      valuequanbushuliang: value,
    })

    if (!value && this.state.numshuliang === "0") {
      this.setState({
        numshuliang: this.state.numshuliangold,
      })
    }
  }
  hideModalok2 = () => {
    // this.props.pc_account.symbol
    let asset = this.props.asset
    let from_account = this.state.zjzhfangxiangs
    let to_account = this.state.zjzhfangxiangchus
    let qty = this.state.valuequanbushuliang
    let time = new Date().getTime().toString()
    let obj = { asset, from_account, to_account, qty, time }
    if (qty != 0) {
      try {
        Xfn({
          _m: "post",
          _u: "transferpc",
          _p: obj
        }, (res, code) => {
          this.setState({
            valuequanbushuliang: "",
            visible1: false,
            huanzhuancont: "BTC",
          })
        }, lang().SuccessfulTransfer)
      }
      catch (err) {

      }
    } else {
      openNotificationWithIcon("opne-warning", lang().warning, lang().QuantityCannotBeEmpty)
    }
  }
  sdflkjasldkfj = () => {
    if (this.state.uil) {
      this.setState({ uil: false })
      var that = this
      var para = document.createElement("div");
      para.id = "bud"
      var element = document.getElementById("root");
      element.appendChild(para);
      var bud = document.getElementById("bud");
      bud.style.zIndex = "666"
      bud.onclick = () => {
        that.setState({
          uil: true
        })
        element.removeChild(bud);
      }

    } else {
      var element = document.getElementById("root");
      var bud = document.getElementById("bud");
      this.setState({ uil: true })
      element.removeChild(bud);
    }

  }

  handleCancel8 = () => {
    this.setState({
      visible8: false,
    })
  }
  xuanzhongquanzang = (val) => {
    this.setState({
      moshi: val.target.value
    })
  }

  zijinzhuan = () => {
    this.setState({
      zjzhfangxiangs: "1",
      zjzhfangxiangchus: "2"
    })
    if (localStorage.userInfo) {
      const obj = {
        asset: this.props.asset,
        from_account: "1",
        time: new Date().getTime().toString()
      }
      Xfn({
        _m: "get",
        _u: "yue",
        _p: obj
      }, (res, code) => {
        if (code == 0) {
          this.setState({
            zongyuddd: res.data.data,
            lis: res.data.data.available,
            numshuliang: res.data.data.available
          })
        }
      })
      this.setState({
        visible1: true
      });
    } else {
      history.push('/login')
    }
  };


  quanbudiuguoqu = () => {
    this.setState({
      numshuliangold: this.state.numshuliang
    })
    if (this.state.zjzhfangxiangs == "1") {
      if (this.state.lis > 0) {
        this.setState({
          numshuliang: "0",
          valuequanbushuliang: this.state.lis
        })

      }
    } else {
      if (this.state.numshuliang > 0) {
        this.setState({
          numshuliang: "0",
          valuequanbushuliang: this.state.numshuliang
        })

      }
    }
  }
  yuehuazhuan = (type) => {
    const obj = {
      asset: this.props.asset,
      from_account: type,
      time: new Date().getTime().toString()
    }
    Xfn({
      _m: "get",
      _u: "yue",
      _p: obj
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          zongyuddd: res.data.data,
          lis: res.data.data.available,
          numshuliang: res.data.data.available
        })
      }
    })
  }
  zjzhfangxiang = (val) => {
    this.setState({ zjzhfangxiangs: val })
    this.yuehuazhuan(val)

    if (val == this.state.zjzhfangxiangchus) {
      this.setState({
        zjzhfangxiangchus: this.state.zjzhfangxiangs,
        numshuliang: this.state.lis,
        valuequanbushuliang: ""
      })
    } else {
      this.setState({
        numshuliang: this.props.pc_account.available,
        valuequanbushuliang: ""
      })
    }

  }
  zjzhfangxiangchu = (val) => {
    this.setState({ zjzhfangxiangchus: val })
    if (val == this.state.zjzhfangxiangs) {
      this.yuehuazhuan(this.state.zjzhfangxiangchus)
      this.setState({
        zjzhfangxiangs: this.state.zjzhfangxiangchus,
        numshuliang: this.props.pc_account.available,
        valuequanbushuliang: ""
      })
    } else {
      this.setState({
        numshuliang: this.state.lis,
        valuequanbushuliang: ""
      })
    }
  }
  hideModal12 = () => {
    this.setState({
      visible1: false,

      valuequanbushuliang: '',
    });
  }
  qiehuanameming = (vale, index) => {
    store.dispatch(pacaccoundt([], 1))
    Subscribe({
      _por: this.props,
      _pair: vale.pair,
      _type: "2",
      _index: index
    })
  }
  render() {
    const {
      resetLayouts,
      heyuename,
      instrument,
      asset,
      Decimal_point, ctype, bbasset, bbaymbol, bbinstrument
    } = this.props
    const {
      imgArr,
      LeverageBuying,
      LeveragedSell,
      moshi,
      visible10,
      confirmLoading,
      ModalText,
      LeverAir,
      valuequanbushuliang,
      numshuliang,
      available,
      visible
    } = this.state
    return (
      <div className="titlefullk-warp clear">
        <div className="content-box">
          <div className="yongxu" onClick={this.sdflkjasldkfj}>
            {
              ctype === 'bb' ? bbaymbol ? bbaymbol : '--' : instrument.symbol ? instrument.symbol : "--"
            }
            {
              ctype === 'bb' ? <Headernav></Headernav> : ""
            }
            {
              ctype === 'bb'&&bbaymbol ?<div className="bbyongxu"></div>: ""
            }

          </div>

          <div className="astimg">
            {
              (ctype === 'bb' ? bbinstrument : instrument).change_rate_24h ? (ctype === 'bb' ? bbinstrument : instrument).change_rate_24h >= 0 ? <div className="iconfont imgastd" style={{ color: "#26994E" }}>&#xe60e;</div> : <div className="iconfont imgastd" style={{ color: "#E53F39" }}>&#xe610;</div> : ""
            }
          </div>
          <div className="astimg">
            <div className="tetle" style={{ color: (ctype === 'bb' ? bbinstrument : instrument).change_rate_24h >= 0 ? "#26994E" : "#E53F39" }}>
              {
                EventFN.CurrencyDigitLimit({
                  type:ctype !== 'bb'? Decimal_point:bbinstrument.price_precision,
                  content: (ctype === 'bb' ? bbinstrument : instrument).last_price
                })
              }
            </div>
          </div>
          <div className="astimg">
            <div className="shenglv" style={{ backgroundColor: (ctype === 'bb' ? bbinstrument : instrument).change_rate_24h >= 0 ? "#26994E" : "#E53F39" }}>
              {
                (() => {
                  if ((ctype === 'bb' ? bbinstrument : instrument).change_rate_24h) {
                    return (ctype === 'bb' ? bbinstrument : instrument).change_rate_24h > 0 ? "+" + String((ctype === 'bb' ? bbinstrument : instrument).change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") + "%" : String((ctype === 'bb' ? bbinstrument : instrument).change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") + "%"
                  } else {
                    return "--"
                  }
                })()
              }
            </div>
          </div>


          {/* 中部数据显示的 */}
          {
            ctype === 'bb' ? <div className="bb_heyue_warp">
              <div className="zijinfeilvbox">
                <div className="box-a">
                  24H最低价
          </div>
                <div className="box-b">
                  {
                    numberHandle(bbinstrument.low_price, 1)
                  }
                </div>
              </div>
              <div className="zijinfeilvbox">
                <div className="box-a">
                  24H最高价
          </div>
                <div className="box-b">
                  {
                    numberHandle(bbinstrument.high_price, 1)
                  }
                </div>
              </div>
              <div className="zijinfeilvbox">
                <div className="box-a">
                  24H成交量
          </div>
                <div className="box-b">
                  {
                    numberHandle(bbinstrument.volume_24h, 1)
                  }
                </div>
              </div>
            </div> : <div className="bb_heyue_warp">
                <div className="zijinfeilvbox">
                  <div className="box-a">
                    <FormattedMessage id="24HVolume" defaultMessage={'24H成交量'} />
                  </div>
                  <div className="box-b">
                    {
                      numberHandle(instrument.volume_24h, 1)
                    }
                  </div>
                </div>
                <div className="zijinfeilvbox">
                  <div className="box-a">
                    <FormattedMessage id="IndexPrice" defaultMessage={'指数价格'} />
                  </div>
                  <div className="box-b">
                    {
                      instrument.index_price ? "$" + EventFN.CurrencyDigitLimit({
                        type: Decimal_point,
                        content: instrument.index_price
                      }) : "--"
                    }
                  </div>
                </div>
                <div className="zijinfeilvbox">
                  <div className="box-a">
                    <FormattedMessage id="MarkedPrice" defaultMessage={'标记价格'} />

                  </div>
                  <div className="box-b">
                    {
                      instrument.mark_price ? "$" + EventFN.CurrencyDigitLimit({
                        type: Decimal_point,
                        content: instrument.mark_price
                      }) : "--"
                    }
                  </div>
                </div>
                <div className="zijinfeilvbox">
                  <Tooltip placement="topRight" title={<FormattedMessage id="Current_Rate" defaultMessage={'由上一个资金费用时段计算得出'} />}>
                    <div className="box-a">
                      <span className="span_dashed_box">
                        <FormattedMessage id="Current_fund_rate" defaultMessage={'当期资金费率'} />
                      </span>
                    </div>
                  </Tooltip>
                  <div className="box-b">
                    {
                      instrument.funding_rate ? String(instrument.funding_rate * 100).replace(/^(.*\..{3}).*$/, "$1") + "% " + "| " + instrument.funding_rate_time + lang().WithinHours : "--"
                    }
                  </div>
                </div>
                <div className="zijinfeilvbox">
                  <Tooltip placement="topRight" title={<FormattedMessage id="Predicted_Rate" defaultMessage={'交易单位为BTC等币种时，显示的持仓与挂单数量是根据实际张数换算的，所显示的持仓量数值会根据最新成交价变动而变动。'} />}>
                    <div className="box-a">
                      <span className="span_dashed_box">
                        <FormattedMessage id="Budget_fund_rate" defaultMessage={'预测资金费率'} />
                      </span>
                    </div>
                  </Tooltip>
                  <div className="box-b">
                    {
                      instrument.indicative_funding_rate ? String(instrument.indicative_funding_rate * 100).replace(/^(.*\..{3}).*$/, "$1") + "% " + "| " + instrument.indicative_funding_rate_time + lang().WithinHours : "--"
                    }
                  </div>
                </div>
              </div>

          }

        </div>

        {/* 右侧按钮显示与否 */}
        {
          (() => {
            if (localStorage.userInfo && ctype !== "bb") {
              return <div className="right-box">
                <Button className="button00155" type="primary" onClick={this.zijinzhuan} style={{ float: "left", fontSize: "14px", width: 80 }}>
                  <FormattedMessage id="Transfer_of_funds" defaultMessage={'资金划转'} />
                </Button>
                <Button className="button00155 reset-btn1" type="primary" onClick={this.showModal} style={{ float: "left" }}>
                  <FormattedMessage id="AccountMode" defaultMessage={'账号模式'} />
                  <div>
                    {moshi !== "1" ? <FormattedMessage id="Warehouse_by_warehouse" defaultMessage={'逐仓'} /> : <FormattedMessage id="FullWarehouse" defaultMessage={'全仓'} />}
                  </div>
                </Button>
                {
                  (() => {
                    if (moshi == "2") {
                      return <MoreLeverage
                        LeverageBuying={this.props.pc_account.bid_leverage}
                        Ctype="1"
                        mode="2"
                        className="lvse"
                        pc_account={this.props.pc_account}
                        ticker={this.props.instrument}
                        position={this.props.position}
                        heyuename={this.props.heyuename}
                      />
                    }
                  })()
                }
                {
                  (() => {
                    if (moshi == "2") {
                      return <MoreLeverage
                        LeverageBuying={this.props.pc_account.ask_leverage}
                        Ctype="0"
                        mode="2"
                        pc_account={this.props.pc_account}
                        ticker={this.props.instrument}
                        position={this.props.position}
                        className="bgred"
                        heyuename={this.props.heyuename}
                      />
                    }
                  })()
                }
                {
                  (() => {
                    if (moshi == "1") {
                      return <MoreLeverage
                        LeverageBuying={this.props.pc_account.cross_leverage}
                        Ctype="0"
                        mode="1"
                        pc_account={this.props.pc_account}
                        ticker={this.props.instrument}
                        position={this.props.position}
                        className="butbeishu"
                        heyuename={this.props.heyuename}
                      />
                    }
                  })()
                }
                <button className="reset-btn" onClick={resetLayouts}>  <FormattedMessage id="ResetLayout" defaultMessage={'重置布局'} /></button>
              </div>
            } else {
              return <div className="right-box">

                {
                  (() => {
                    if (this.props.ctype === 'bb') {
                      return <div className="right-box">
                        <Button className="button00155" type="primary" onClick={() => this.visibleFn(true, 1)} style={{ float: "left", fontSize: "14px", width: 80 }}>
                          <FormattedMessage id="Transfer_of_funds" defaultMessage={'资金划转'} />
                        </Button>
                        <Modeltrund
                          bboaccountavailablefn={this.bboaccountavailablefn}
                          available={available}
                          asset={bbasset}
                          visible={visible}
                          visibleFn={this.visibleFn}
                          _this={this}
                        >
                        </Modeltrund>
                        <div style={{ float: "left", fontSize: "14px", lineHeight: "40px", marginRight: 10 }}>

                          计价单位 USDT
                        </div>
                        <button className="reset-btn" onClick={resetLayouts}> <FormattedMessage id="ResetLayout" defaultMessage={'重置布局'} /></button>

                      </div>
                    } else {
                      return <button className="reset-btn" onClick={resetLayouts}> <FormattedMessage id="ResetLayout" defaultMessage={'重置布局'} /></button>

                    }
                  })()
                }
              </div>
            }
          })()
        }

        <Modal
          className="but0001"
          id="modalbutquancang"
          title={<FormattedMessage id="change_setting" defaultMessage={'更改设置'} />}
          visible={visible10}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel3}
          centered
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          okType=""
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <p className="sweitchp">{ModalText}</p>
          <Radio.Group defaultValue="2" value={moshi} onChange={this.xuanzhongquanzang} buttonStyle="solid" style={{ marginTop: 28 }}>
            <Radio.Button style={{ width: 80, height: 36, textAlign: "center" }} value="2"><FormattedMessage id="Warehouse_by_warehouse" defaultMessage={'逐仓'} /></Radio.Button>
            <Radio.Button style={{ width: 80, height: 36, textAlign: "center" }} value="1"><FormattedMessage id="FullWarehouse" defaultMessage={'全仓'} /></Radio.Button>
          </Radio.Group>
        </Modal>
        <Modal
          className="but0008 but00088"
          centered
          title=""
          visible={this.state.visible8}
          onOk={this.handleOk8}
          onCancel={this.handleCancel8}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div>
            <img src={imgArr.box_point} alt="" />
          </div>
          <div className="text"><FormattedMessage id="Users_have_a_warehouse_or_bill_of_lading" defaultMessage={'用户存在持仓或挂单'} /></div>
        </Modal>
        <Modal
          className="but0002"
          title={<FormattedMessage id="Transfer_of_funds" defaultMessage={'资金划转'} />}
          visible={this.state.visible1}
          onOk={this.hideModalok2}
          onCancel={this.hideModal12}
          centered
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div className="but0002-one">
            <div>
              <FormattedMessage id="asset" defaultMessage={'资产'} />
            </div>
            <div className="abc-a">
              <Input disabled placeholder=""
                prefix={<span> {asset}</span>}
                style={{ height: 42 }}
              />
            </div>
          </div>
          <div className="but0002-one">
            <div>
              <FormattedMessage id="Turn_the_direction" defaultMessage={'划转方向'} />
            </div>
            <div className="abc-a">
              <Select defaultValue="1" className="select2222"
                value={this.state.zjzhfangxiangs}
                style={{ width: 160, height: 42, float: "left" }}
                onChange={this.zjzhfangxiang}>
                <Option value="1">  <FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /></Option>
                <Option value="2"> <FormattedMessage id="Sustainable_Contract_Account" defaultMessage={'永续合约账户'} /></Option>
                {/* // 1 资金账户 2 永续合约账户 3 现货账户 */}
                <Option value="3">币币账户</Option>
              </Select>
              <span className="chongbi-span-huazhuan" style={{ float: "left", lineHeight: "42px" }}> <FormattedMessage id="Transfer" defaultMessage={'划转'} /></span>
              <Select defaultValue="2" className="select2222"
                style={{ width: 160, height: 42, float: "left" }}
                value={this.state.zjzhfangxiangchus}
                onChange={this.zjzhfangxiangchu}>
                <Option value="1"><FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /></Option>
                <Option value="2"><FormattedMessage id="Sustainable_Contract_Account" defaultMessage={'永续合约账户'} /></Option>
                <Option value="3">币币账户</Option>

              </Select>
            </div>

          </div>
          <div className="but0002-one but0002-on1">
            <div>
              <FormattedMessage id="Transfer_Quantity" defaultMessage={'划转数量'} />
            </div>
            <div className="abc-a">
              <Input placeholder="" style={{ height: 42 }} value={valuequanbushuliang} onChange={this.valuequanbushuliang} />
            </div>

          </div>
          <div className="but0002-one but0002-on1">
            <div style={{ height: 1 }}>
            </div>
            <div className="abc-a" style={{ textAlign: "left" }}>
              <span>        <FormattedMessage id="Transfer_Quantity" defaultMessage={'划转数量'} />：<span style={{ display: "inline-block" }}>{numshuliang}</span></span>
              <span className="abc-a-c" onClick={this.quanbudiuguoqu}><FormattedMessage id="All_Rolls" defaultMessage={'全部划转'} /></span>
            </div>

          </div>
        </Modal>
      </div>
    );
  }
}

export default TitleFullk;


// _this={this}