import { NavLink } from "react-router-dom"
import React, { Component } from 'react';
// import {dangqianchipang} from '@/utils/dangqianchipang'
import lang from '@/utils/language';
export const dangqianchipang = (a, b) => {
  //如果有b，就不需要登录也可以展示
  const ioo = require('../scripts/img/nothing_data.png')
  if (localStorage.userInfo || b) {
    if (a <= 0) {
      return <div className="tablemeishuju">
        <img src={ioo} alt="" />
        <div>
          {lang().You_dont_have_data}
        </div>
      </div>
    }
  } else {
    return <div className="tablemeishuju">
      <img src={ioo} alt="" />
      <div>
        {lang().You_must}
        <NavLink style={{ margin: "0 5px" }} to="/login">{lang().Sign_in}</NavLink>
        {lang().Only_then_see_information}
      </div>
    </div>
  }
}