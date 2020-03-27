import React, { Component } from 'react';
import './index.scss'
import { Tabs } from 'antd';
import WrappedNormalregisterForm from './phoneregis';
import NormalreemailgisterForm from './emailregist';
import { connect } from "react-redux"
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';
import lang from '@/utils/language';
const { TabPane } = Tabs;
@connect(
  state => {
    return {
      // loginflg: state.data.loginflg,
    }
  }
)
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      account: "",
      defaultActiveKey: "1"
    }
  }
  componentDidMount() {
    const bodys = document.getElementsByTagName("body")[0]
		bodys.className = "theme-light"
    let _search = this.props.location.search.split("?")[1]
    if (_search && _search.indexOf("=") === -1) {
      this.setState({
        search: _search
      })
    }
    if (_search && _search.indexOf("=") !== -1) {
      if (_search.indexOf('@') === -1) {
        this.setState({
          defaultActiveKey: '1',
        })
      } else {
        this.setState({
          defaultActiveKey: '2',
        })
      }
      this.setState({
        account: _search.split("=")[1],
      })
    }

  }

  callback = (key) => {
    this.setState({
      defaultActiveKey: key
    })
  }
  //验证码
  render() {
    return (
      <div>
        <Header></Header>
        <div className="conten-register-warp">
          <div className="box">
            <div className="title">
              {lang().Registered_account}
            </div>
            <div className="tabpane">
              <Tabs activeKey={this.state.defaultActiveKey} onChange={this.callback}>
                <TabPane tab={lang().Mobile_phone_registration} key="1">
                  <WrappedNormalregisterForm account={this.state.account} search={this.state.search}></WrappedNormalregisterForm>
                </TabPane>
                <TabPane tab={lang().Mailbox_Registration} key="2">
                  <NormalreemailgisterForm account={this.state.account} search={this.state.search}></NormalreemailgisterForm>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Register