import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { history } from '@/utils/history';
class Error extends Component {
  render() {
    return (
      <div>
        <Result
          status="500"
          title="500"
          subTitle="Sorry, the server is wrong."
          extra={<Button type="primary" style={{ float: 'initial', width: 200, lineHeight: "40px" }} onClick={
            () => {
              history.push("/sices")
            }
          }><div>Back Home</div>  </Button>}
        />
      </div>
    );
  }
}

export default Error;