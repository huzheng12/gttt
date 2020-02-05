import React, { Component } from 'react';
import './index.scss'
import WrappedNormalLoginForm from '@/scripts/components/longinfrom';
import { Tabs } from 'antd';
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';
import { FormattedMessage } from 'react-intl';

const Login = () => {
    return (
      <div className="login-warp clear">
        <Header></Header>
        <div className="login-box">
          <div className="box">
            <div className="title"><FormattedMessage id="Login_account" defaultMessage={'登录账号'} /></div>
                <WrappedNormalLoginForm></WrappedNormalLoginForm>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
}

export default Login;