import React, { Component } from 'react';
import './index.scss'
import { connect } from "react-redux";
import depthInit from '@/utils/depthmap'
import { FormattedMessage } from 'react-intl';
import store from '../../store';
const depthDatasFarms = function (data) {
    if (data.length < 1) return;
    var newArray = [];
    for (var i = 0; i < data.length; i++) {
        var itemArray = [];
        itemArray.push(parseFloat(data[i].price));
        itemArray.push(parseFloat(data[i].ljl));
        newArray.push(itemArray);
    }
    return newArray;
}
@connect(
    state => {
        return {
            orderBookL2_25obj: state.data.orderBookL2_25obj,
            orderBookL2_25: state.data.orderBookL2_25,
            bborder_book: state.bbdata.bborder_book,
            order_bookshu: state.bbdata.order_bookshu,
            onLayoutChangela: state.bbdata.onLayoutChangela,
        }
    }
)
class Depthmap extends Component {
    constructor() {
        super()
        this.state = {
            depth_map: '',
        }
    }
    componentDidMount() {
        let asks = [];
        let bids = [];
        this.setState({
            depth_map: depthInit('depth_chart_container', asks, bids)
        })
    }
    componentDidUpdate() {
        const { orderBookL2_25obj, bborder_book } = this.props;
       
        if (this.props.ctype === 'bb') {
            if (bborder_book.arrAsks) {
                let asks = bborder_book.arrAsks.length > 0 ? depthDatasFarms(bborder_book.arrAsks).reverse() : [];
                let bids = bborder_book.arrBids.length > 0 ? depthDatasFarms(bborder_book.arrBids).reverse() : [];
                this.state.depth_map.series[0].setData(bids);
                this.state.depth_map.series[1].setData(asks);
            }
        } else {
            if (orderBookL2_25obj.arrAsks) {
                let asks = orderBookL2_25obj.arrAsks.length > 0 ? depthDatasFarms(orderBookL2_25obj.arrAsks).reverse() : [];
                let bids = orderBookL2_25obj.arrBids.length > 0 ? depthDatasFarms(orderBookL2_25obj.arrBids).reverse() : [];
                this.state.depth_map.series[0].setData(bids);
                this.state.depth_map.series[1].setData(asks);
            }
        }
    }
    render() {
        return (
            <div id="depth_chart_container" style={{ height: "100%" }}>  <FormattedMessage id="Depth_map" defaultMessage={'深度图'} /></div>
        );
    }
}

export default Depthmap;