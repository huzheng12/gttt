import React, { Component } from 'react'
import './index.scss'
import { FormattedMessage } from 'react-intl';
import { Tabs } from 'antd';
import OrderPage from '../orderPage';
const { TabPane } = Tabs;
class Kaicang extends Component {
  render() {
    return (
      <div className="kaicang-box">
        <Tabs animated={false} defaultActiveKey="1">
          <TabPane tab={<FormattedMessage id="open_a_granary_to_provide_relief" defaultMessage={'开仓'} />} key="1">
            <OrderPage _type="1"></OrderPage>
          </TabPane>
          <TabPane tab={<FormattedMessage id="Close_a_position" defaultMessage={'平仓'} />} key="2">
            <OrderPage _type="2"></OrderPage>
          </TabPane>
        </Tabs>
      </div >
    )
  }
}

export default Kaicang