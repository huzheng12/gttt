import React, { Component } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import './index.scss'
import Qrcode from "qrcode.react";
import store from '../../store';
import { downloadgeturlfn } from '../../action/tction';
import { connect } from "react-redux";
import lang from '../../../utils/language';
@connect(
  state => {
    return {
      downloadget_url: state.tction.downloadget_url,
      downloadget_url_flg: state.tction.downloadget_url_flg,
    }
  }
)
class IosDownload extends Component {
  constructor() {
    super()
    this.state = {
      content: "https://app.1fenfa.com/app/ISKa"
    }
  }
  componentDidUpdate() {
    if (this.props.downloadget_url_flg === 1) {
      for (let i = 0; i < this.props.downloadget_url.app_list.length; i++) {
        console.log(this.props.downloadget_url)
        if (this.props.downloadget_url.app_list[i].id === "4") {
          this.setState({
            content: this.props.downloadget_url.app_list[i].link_url
          })
        }

      }
      store.dispatch(downloadgeturlfn({
        downloadget_url_flg: 0
      }))
    }
  }
  render() {
    const {
      content
    } = this.state
    return (
      <div className="iodownload-warp">
        <Header></Header>
        <main>
          <div className="title-course">
            {lang().GTE_IOS_full_deal_download_tutorial}
          </div>
          <div className="h6-title">
            {lang().There_are_two_ways_to_download_GTE}
          </div>
          <table border="1">
            <tbody>
              <tr>
                <td style={{ width: 160 }}>{lang().Beta_version}</td>
                <td>{lang().One_click_download_and_installation}</td>
              </tr>
              <tr>
                <td>{lang().Market_Edition}</td>
                <td>{lang().More_stable_but_requires}</td>
              </tr>

            </tbody>
          </table>
          <hr />
          <div className="h6-title">
            {lang().Download_beta}
          </div>
          <Qrcode
            style={{
              marginLeft: 18
            }}
            value={content}
            size={120}
          />
          <div className="span-tips">
            {lang().Please_scan_the_QR_code}
          </div>
          <div className="span-blod">
            {lang().After_the_download_is_successful}
          </div>
          <hr />
          <div className="h6-title">
            {
              lang().Download_Market_Edition}
          </div>
          <li>
            {lang().If_you_have_an_Apple_ID}
          </li>
          <li>
            {lang().ID_in_the_above_region}
          </li>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

export default IosDownload;