import React, { Component } from 'react';
import './index.scss'
import { connect } from "react-redux";
import lang from '@/utils/language';
import TvCharts from './a';
import Depthmap from '../depthmap';


@connect(
    state => {
        return {
            heyuename: state.data.heyuename,
            bbaymbol: state.bbdata.bbaymbol,

        }
    }
)
class tvChart extends Component {
    constructor(){
        super()
        this.state={
            isok:true
        }
    }
    render() {
        const{
            isok
        }=this.state
        return (
            < div className="chart-box" style={{ padding: this.props.type === 1 ? "0" : "" }}>
                {
                    this.props.type !== 1 ? <h4 className="box-title drag-handle">{lang().Chart_type + '( ' + (this.props.ctype === 'bb' ? this.props.bbaymbol : this.props.heyuename) + ' )'}
                <div className="bnt" style={{color:!isok&&'#2f6fed',borderColor:!isok&&'#2f6fed'}} onClick={()=>{
                    this.setState({
                        isok:false
                    })
                }}>
                    深度图
                </div>
                <div className="bnt" style={{color:isok&&'#2f6fed',borderColor:isok&&'#2f6fed'}} onClick={()=>{
                    this.setState({
                        isok:true
                    })
                }}>
                    专业版
                </div>
               
                    
                    </h4> : ""
                }
                {
                    isok?<TvCharts ctype={this.props.ctype}></TvCharts>:  <Depthmap ctype={'bb'}></Depthmap>
                }
              
            </div >

        );
    }
}

export default tvChart;