import React, { Component } from 'react';
import lang from '@/utils/language';
import { Spin } from 'antd';
export const dataempty = (a, b) => {
  const ioo = require('../scripts/img/nothing_data.png')
  if (b == null) { return <Spin style={{ width: "100%", lineHeight: '400px' }} /> }
  if (a == null) { return <Spin style={{ width: "100%", lineHeight: '100px' }} /> }
  if (localStorage.userInfo || b) {
    if (a.length === 0) {
      return <div className="tablemeishuju">
        <img src={ioo} alt="" />
        <div>
          {lang().You_dont_have_data}
        </div>
      </div>
    }
  }
}