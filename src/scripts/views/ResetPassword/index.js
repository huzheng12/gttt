import React, { Component } from 'react';
import './index.scss'
import NoremailmailgisterForm from './resetemailpass';
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';
import { FormattedMessage } from 'react-intl';
class Resetpass extends Component {
  constructor(){
    super()

  }
  componentDidMount(){
    const bodys = document.getElementsByTagName("body")[0]
		bodys.className = "theme-light"
  }
  render() {
    return (
      <div>
        <Header></Header>
        <div className="resetpass-warp">
          <div className="box">
            <div className="title">

              <FormattedMessage id="Reset_login_password" defaultMessage={'重置登录密码'} />
            </div>
            <div className="title-xiyu">
              <FormattedMessage id="Reset_login_password_notice" defaultMessage={'您将收到一条验证信息，为了您的资产安全，重置登录密码后，24小时以内禁止提币'} />

            </div>
            <NoremailmailgisterForm></NoremailmailgisterForm>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Resetpass;