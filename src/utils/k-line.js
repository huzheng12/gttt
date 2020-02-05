


var bgColor = "transparent";//背景
var upColor = "#26994E";//涨颜色
var downColor = "#E53F39";//跌颜色
function timeStamp2String(time) {
	var datetime = new Date();
	datetime.setTime(time);
	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
	var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
	var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
	return year + "-" + month + "-" + date + " " + hour + ":" + minute;
}
// ma  颜色
var ma5Color = "#39afe6";
var ma10Color = "#da6ee8";
var ma20Color = "#ffab42";
var ma30Color = "#00940b";

/**
 * 15:20 时:分 格式时间增加num分钟
 * @param {Object} time 起始时间
 * @param {Object} num
 */
function addTimeStr(time, num) {
	var hour = time.split(':')[0];
	var mins = Number(time.split(':')[1]);
	var mins_un = parseInt((mins + num) / 60);
	var hour_un = parseInt((Number(hour) + mins_un) / 24);
	if (mins_un > 0) {
		if (hour_un > 0) {
			var tmpVal = ((Number(hour) + mins_un) % 24) + "";
			hour = tmpVal.length > 1 ? tmpVal : '0' + tmpVal;//判断是否是一位
		} else {
			var tmpVal = Number(hour) + mins_un + "";
			hour = tmpVal.length > 1 ? tmpVal : '0' + tmpVal;
		}
		var tmpMinsVal = ((mins + num) % 60) + "";
		mins = tmpMinsVal.length > 1 ? tmpMinsVal : 0 + tmpMinsVal;//分钟数为 取余60的数
	} else {
		var tmpMinsVal = mins + num + "";
		mins = tmpMinsVal.length > 1 ? tmpMinsVal : '0' + tmpMinsVal;//不大于整除60
	}
	return hour + ":" + mins;
}
function _computedPosition(length, num) {
	if (length <= num) {
		return 0
	} else {
		return (100 - Math.floor(num / length * 100))
	}
}
//获取增加指定分钟数的 数组  如 09:30增加2分钟  结果为 ['09:31','09:32'] 
function getNextTime(startTime, endTIme, offset, resultArr) {
	var result = addTimeStr(startTime, offset);
	resultArr.push(result);
	if (result == endTIme) {
		return resultArr;
	} else {
		return getNextTime(result, endTIme, offset, resultArr);
	}
}


/**
 * 不同类型的股票的交易时间会不同  
 * @param {Object} type   hs=沪深  us=美股  hk=港股
 */
var time_arr = function (type) {

	if (type.indexOf('us') != -1) {//生成美股时间段
		var timeArr = new Array();
		timeArr.push('09:30')
		return getNextTime('09:30', '16:00', 1, timeArr);
	}
	if (type.indexOf('hs') != -1) {//生成沪深时间段
		var timeArr = new Array();
		timeArr.push('09:30');
		timeArr.concat(getNextTime('09:30', '11:29', 1, timeArr));
		timeArr.push('13:00');
		timeArr.concat(getNextTime('13:00', '15:00', 1, timeArr));
		return timeArr;
	}
	if (type.indexOf('hk') != -1) {//生成港股时间段
		var timeArr = new Array();
		timeArr.push('09:30');
		timeArr.concat(getNextTime('09:30', '11:59', 1, timeArr));
		timeArr.push('13:00');
		timeArr.concat(getNextTime('13:00', '16:00', 1, timeArr));
		return timeArr;
	}

}


var get_m_data = function (m_data, type) {
	var priceArr = new Array();
	var avgPrice = new Array();
	var vol = new Array();
	var times = time_arr(type);
	// $.each(m_data.data, function(i, v) {
	// 	priceArr.push(v[1]);
	// 	avgPrice.push(v[2]);
	// 	vol.push(v[3]); 
	// })
	return {
		priceArr: priceArr,
		avgPrice: avgPrice,
		vol: vol,
		times: times
	}
}



//==========================================分时表 option

/**
 * 生成分时option 
 * @param {Object} m_data 分时数据
 * @param {Object} type 股票类型  us-美股  hs-沪深  hk-港股
 */
export function initMOption(m_datas, type, echarts) {
	var pariddf = m_datas.priceArr[m_datas.avgPrice.length - 1]
	for (let i = 0; i < 5; i++) {
		var time = new Date(m_datas.times[m_datas.times.length - 1]).getTime() + i * 1 * 60 * 1000
		m_datas.times.push(timeStamp2String(time))
	}

	return {
		tooltip: { //弹框指示器
			trigger: 'axis',
			// position: [20,20],
			axisPointer: {
				type: 'cross',
			},
			show: true,// 必须引入 tooltip 组件
			textStyle: {
				fontSize: 12,
				color: '#ccc',
			}
		},
		legend: { //图例控件,点击图例控制哪些系列不显示
			icon: 'rect',
			type: 'scroll',
			itemWidth: 14,
			itemHeight: 2,
			left: 0,
			top: 0,
			textStyle: {
				fontSize: 12,
				color: '#0e99e2'
			},
		},
		axisPointer: {
			show: true
		},
		// [ma10Color, ma20Color, ma30Color]
		color: [ma5Color, ma10Color],
		grid: [{
			id: 'gd1',
			left: '0',
			right: '11%',
			height: '85%', //主K线的高度,
			top: '5%'
		}, {
			left: '0',
			right: '11%',
			top: '75.5%',
			height: '15%' //交易量图的高度
		},
		],
		xAxis: [ //==== x轴
			{ //主图 
				gridIndex: 0,
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				data: m_datas.times,
				splitNumber: 12,
				axisLabel: { //label文字设置
					color: '#666',
					fontSize: 10,
					formatter: function (value) {
						// return echarts.format.formatTime('hh:mm', value);
					}
				},
				splitLine: {
					show: false,
				},
				boundaryGap: ['20%', '20%']
			}, { //交易量图
				splitNumber: 2,
				type: 'category',
				gridIndex: 1,
				data: m_datas.times,
				boundaryGap: ['20%', '20%'],
				axisLabel: { //label文字设置
					color: '#666',
					fontSize: 10,
					formatter: function (value) {
						return echarts.format.formatTime('hh:mm', value);
					}
				},
			}
		],
		yAxis: [ //y轴
			{
				position: "right",
				gridIndex: 0,
				scale: true,
				nameGap: 0,
				splitNumber: 5,
				axisLabel: { //label文字设置 
					inside: false, //label文字朝内对齐 
					color: '#666'
				},
				boundaryGap: ['20%', '20%'],
				// z: 5,
				splitLine: { //分割线设置
					show: false,
					lineStyle: {
						color: '#ccc'
					}
				},
			}, { //交易图
				position: 'right',
				gridIndex: 1,
				z: 4,
				splitNumber: 3,

				splitLine: {
					show: false
				},
				axisLine: {
					show: true
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: false      //刻度线的隐藏
				},
				axisLabel: { //label文字设置
					color: 'transparent',
					inside: false, //label文字朝外对齐 
					fontSize: 8
				},
			}
		],
		dataZoom: [
			{
				type: 'inside',
				xAxisIndex: [0, 1], //控件联动
				start: 100,
				end: 60,
			},
		],

		//animation:false,//禁止动画效果
		backgroundColor: bgColor,
		blendMode: 'source-over',
		series: [{
			name: '当前价',
			type: 'line',
			data: m_datas.priceArr,
			smooth: true,
			symbol: "circle", //中时有小圆点 
			symbolSize: 1,
			lineStyle: {
				normal: {
					opacity: 0.8,
					color: '#39afe6',
					width: 1
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(0, 136, 212, 0.7)'
					}, {
						offset: 0.8,
						color: 'rgba(0, 136, 212, 0.02)'
					}], false),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			markLine: {
				silent: false,
				symbol: ["none", "none"],
				data: [{
					label: {
						normal: {
							position: "end",
							backgroundColor: '#39afe6',
							lineHeight: 10,
							padding: 4,
							color: '#fff',
						},
						align: 'center',
					},
					yAxis: pariddf ? pariddf : "",
					lineStyle: {
						normal: {
							color: 'transparent',
							type: 'solid',
						},
					}
				}]
			},

		}, {
			name: '',
			type: 'bar',
			gridIndex: 1,
			xAxisIndex: 1,
			yAxisIndex: 1,

			data: m_datas.vols,
			barWidth: '60%',
			itemStyle: {
				normal: {
					color: function (params) {
						var colorList;
						if (m_datas.priceArr[params.dataIndex] > m_datas.priceArr[params.dataIndex - 1]) {
							colorList = upColor;
						} else {
							colorList = downColor;
						}
						return colorList;
					},
				}
			}
		}


		]
	};
}



/**
 * 计算价格涨跌幅百分比
 * @param {Object} price 当前价
 * @param {Object} yclose 昨收价
 */
function ratioCalculate(price, yclose) {
	return ((price - yclose) / yclose * 100).toFixed(3);
}









//数组处理
function splitData(rawData) {
	var datas = []; var times = []; var vols = [];
	for (var i = 0; i < rawData.length; i++) {
		datas.push(rawData[i]);
		times.push(rawData[i].splice(0, 1)[0]);
		vols.push(rawData[i][4]);
	}
	console.log('datas', datas);
	console.log('times', times);
	console.log('vols', vols);
	return { datas: datas, times: times, vols: vols };
}


//================================MA计算公式
function calculateMA(dayCount, data) {
	var result = [];
	for (var i = 0, len = data.times.length; i < len; i++) {
		if (i < dayCount) {
			result.push('-');
			continue;
		}
		var sum = 0;
		for (var j = 0; j < dayCount; j++) {
			sum += data.datas[i - j][1];
		}
		result.push((sum / dayCount).toFixed(2));
	}
	return result;
}


//=================================================MADC计算公式

var calcEMA, calcDIF, calcDEA, calcMACD;

/*
 * 计算EMA指数平滑移动平均线，用于MACD
 * @param {number} n 时间窗口
 * @param {array} data 输入数据
 * @param {string} field 计算字段配置
 */
calcEMA = function (n, data, field) {
	var i, l, ema, a;
	a = 2 / (n + 1);
	if (!data.length) return []
	if (field) {
		//二维数组
		ema = [data[0][field]];
		for (i = 1, l = data.length; i < l; i++) {
			ema.push((a * data[i][field] + (1 - a) * ema[i - 1]).toFixed(2));
		}
	} else {
		//普通一维数组
		ema = [data[0]];
		for (i = 1, l = data.length; i < l; i++) {
			ema.push((a * data[i] + (1 - a) * ema[i - 1]).toFixed(3));
		}
	}
	return ema;
};

/*
 * 计算DIF快线，用于MACD
 * @param {number} short 快速EMA时间窗口
 * @param {number} long 慢速EMA时间窗口
 * @param {array} data 输入数据
 * @param {string} field 计算字段配置
 */
calcDIF = function (short, long, data, field) {
	var i, l, dif, emaShort, emaLong;
	dif = [];
	emaShort = calcEMA(short, data, field);
	emaLong = calcEMA(long, data, field);
	for (i = 0, l = data.length; i < l; i++) {
		dif.push((emaShort[i] - emaLong[i]).toFixed(3));
	}
	return dif;
};

/*
 * 计算DEA慢线，用于MACD
 * @param {number} mid 对dif的时间窗口
 * @param {array} dif 输入数据
 */
calcDEA = function (mid, dif) {
	return calcEMA(mid, dif);
};

/*
 * 计算MACD
 * @param {number} short 快速EMA时间窗口
 * @param {number} long 慢速EMA时间窗口
 * @param {number} mid dea时间窗口
 * @param {array} data 输入数据
 * @param {string} field 计算字段配置
 */
calcMACD = function (short, long, mid, data, field) {
	var i, l, dif, dea, macd, result;
	result = {};
	macd = [];
	dif = calcDIF(short, long, data, field);
	dea = calcDEA(mid, dif);
	for (i = 0, l = data.length; i < l; i++) {
		macd.push(((dif[i] - dea[i]) * 2).toFixed(3));
	}
	result.dif = dif;
	result.dea = dea;
	result.macd = macd;
	return result;
};


//=================================================MADC计算公式 end


// export function initKOption(cdata, echarts, scale) {
// 	var data = cdata;
// 	// var data = splitData(cdata);

// 	console.log(data)
// 	var macd = calcMACD(12, 26, 9, data.datas, 1);
// 	return {
// 		tooltip: { //弹框指示器
// 			trigger: 'axis',
// 			// position: [20,20],
// 			axisPointer: {
// 				type: 'cross',
// 			},
// 			textStyle: {
// 				fontSize: 12,
// 				color: '#ccc',
// 			},
// 			// alwaysShowContent: true,
// 			confine: true,
// 			// formatter: function(params, ticket, callback) {
// 			// 	console.log('params',params);
// 			// }

// 		},
// 		legend: { //图例控件,点击图例控制哪些系列不显示
// 			icon: 'rect',
// 			type: 'scroll',
// 			itemWidth: 14,
// 			itemHeight: 2,
// 			left: '0',
// 			top: '0',
// 			animation: true,
// 			textStyle: {
// 				fontSize: 12,
// 				color: '#0e99e2'
// 			},
// 			pageIconColor: '#0e99e2',
// 		},
// 		axisPointer: {
// 			show: true
// 		},
// 		color: [ma5Color, ma10Color, ma20Color, ma30Color],
// 		grid: [{
// 			id: 'gd1',
// 			left: '0',
// 			right: '1%',
// 			height: '60%', //主K线的高度,
// 			top: '5%'
// 		}, {
// 			left: '0',
// 			right: '1%',
// 			top: '66.5%',
// 			height: '10%' //交易量图的高度
// 		},
// 		{
// 			left: '0',
// 			right: '1%',
// 			top: '80%', //MACD 指标
// 			height: '14%'
// 		}],
// 		xAxis: [ //==== x轴
// 			{ //主图
// 				type: 'category',
// 				data: data.times,
// 				scale: true,
// 				boundaryGap: false,
// 				axisLine: {
// 					onZero: false
// 				},
// 				axisLabel: { //label文字设置
// 					show: false
// 				},
// 				splitLine: {
// 					show: false,
// 					lineStyle: {
// 						color: '#3a3a3e'
// 					}
// 				},
// 				splitNumber: 20,
// 				min: 'dataMin',
// 				max: 'dataMax'
// 			}, { //交易量图
// 				type: 'category',
// 				gridIndex: 1,
// 				data: data.times,
// 				axisLabel: { //label文字设置
// 					color: '#999591',
// 					fontSize: 10,
// 					formatter: function (value) {
// 						return echarts.format.formatTime('hh:mm', value);
// 					}
// 				},
// 			}, { //幅图
// 				type: 'category',
// 				gridIndex: 2,
// 				data: data.times,
// 				axisLabel: {
// 					show: false
// 				}
// 			}
// 		],
// 		yAxis: [ //y轴
// 			{ //==主图
// 				position: "right",
// 				scale: true,
// 				z: 4,
// 				axisLine: {
// 					show: false
// 				},
// 				axisLabel: { //label文字设置
// 					color: '#999591',
// 					inside: true, //label文字朝内对齐
// 				},
// 				splitLine: { //分割线设置
// 					show: false,
// 					lineStyle: {
// 						color: '#181a23'
// 					}
// 				},
// 				scale: {
// 					type: 'value'
// 				}
// 			}, { //交易图
// 				position: "right",
// 				gridIndex: 1, splitNumber: 3, z: 4,
// 				axisLine: {
// 					onZero: false,
// 					show: false,
// 				},
// 				axisTick: {
// 					show: false
// 				},
// 				splitLine: {
// 					show: false
// 				},
// 				axisLabel: { //label文字设置
// 					color: '#999591',
// 					inside: true, //label文字朝内对齐 
// 					fontSize: 8
// 				},
// 			}, { //幅图
// 				position: "right",
// 				z: 4, gridIndex: 2, splitNumber: 4,
// 				axisLine: {
// 					show: false,
// 					onZero: false
// 				},
// 				axisTick: {
// 					show: false
// 				},
// 				splitLine: {
// 					show: false
// 				},
// 				axisLabel: { //label文字设置
// 					color: '#999591',
// 					inside: true, //label文字朝内对齐 
// 					fontSize: 8
// 				},
// 			}
// 		],
// 		dataZoom: [
// 			// {
// 			// 	type: 'slider',
// 			// 	show: true,
// 			// 	xAxisIndex: [0, 1, 2], //控件联动
// 			// 	start: 100,
// 			// 	end: 20,
// 			// 	throttle: 10,
// 			// 	top: '94%',
// 			// 	height: '6%',
// 			// 	borderColor: '#696969',
// 			// 	textStyle: {
// 			// 		color: '#dcdcdc'
// 			// 	},
// 			// 	handleSize: '90%', //滑块图标
// 			// 	handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
// 			// 	dataBackground: {
// 			// 		lineStyle: {
// 			// 			color: '#fff'
// 			// 		}, //数据边界线样式
// 			// 		areaStyle: {
// 			// 			color: '#696969'
// 			// 		} //数据域填充样式
// 			// 	}
// 			// },
// 			{
// 				type: 'inside',
// 				xAxisIndex: [0, 1, 2], //控件联动
// 				start: 100,
// 				end: scale,
// 			},
// 		],
// 		animation: false, //禁止动画效果
// 		backgroundColor: bgColor,
// 		blendMode: 'source-over',
// 		series: [
// 			{
// 				name: 'K线',
// 				type: 'candlestick',
// 				data: data.datas,
// 				barWidth: '55%',
// 				large: true,
// 				largeThreshold: 100,
// 				itemStyle: {
// 					normal: {
// 						color: upColor, //fd2e2e  ff4242
// 						color0: downColor,
// 						borderColor: upColor,
// 						borderColor0: downColor,

// 						//opacity:0.8
// 					}
// 				},
// 				markLine: {
// 					data: [{
// 						yAxis: data.priceArr.length > 0 ? data.priceArr[data.priceArr.length - 1] : "",
// 						label: {
// 							position: 'middle',
// 							formatter: data.priceArr.length > 0 ? data.priceArr[data.priceArr.length - 1] : ""
// 						},
// 					}],
// 					label: {
// 						show: true,
// 						position: 'left',
// 						formatter: '{c}'
// 					},
// 					symbol: ['none', 'none'],
// 					itemStyle: {
// 						normal: {
// 							color: 'red'
// 						}
// 					},
// 				}
// 			}, {
// 				name: 'MA5',
// 				type: 'line',
// 				data: calculateMA(5, data),
// 				smooth: true,
// 				symbol: "none", //隐藏选中时有小圆点
// 				lineStyle: {
// 					normal: {
// 						opacity: 0.8,
// 						color: '#39afe6',
// 						width: 1
// 					}
// 				},
// 			},
// 			{
// 				name: 'MA10',
// 				type: 'line',
// 				data: calculateMA(10, data),
// 				smooth: true,
// 				symbol: "none",
// 				lineStyle: { //标线的样式
// 					normal: {
// 						opacity: 0.8,
// 						color: '#da6ee8',
// 						width: 1
// 					}
// 				}
// 			},
// 			{
// 				name: 'MA20',
// 				type: 'line',
// 				data: calculateMA(20, data),
// 				smooth: true,
// 				symbol: "none",
// 				lineStyle: {
// 					opacity: 0.8,
// 					width: 1,
// 					color: ma20Color
// 				}
// 			},
// 			{
// 				name: 'MA30',
// 				type: 'line',
// 				data: calculateMA(30, data),
// 				smooth: true,
// 				symbol: "none",
// 				lineStyle: {
// 					normal: {
// 						opacity: 0.8,
// 						width: 1,
// 						color: ma30Color
// 					}
// 				}
// 			}, {
// 				name: 'Volumn',
// 				type: 'bar',
// 				xAxisIndex: 1,
// 				yAxisIndex: 1,
// 				data: data.vols,
// 				barWidth: '60%',
// 				itemStyle: {
// 					normal: {
// 						color: function (params) {
// 							var colorList;
// 							if (data.datas.length > 0 && data.datas[params.dataIndex][1] > data.datas[params.dataIndex][0]) {
// 								colorList = upColor;
// 							} else {
// 								colorList = downColor;
// 							}
// 							return colorList;
// 						},
// 					}
// 				}
// 			},
// 			{
// 				name: 'MACD',
// 				type: 'bar',
// 				xAxisIndex: 2,
// 				yAxisIndex: 2,
// 				data: macd.macd,
// 				barWidth: '40%',
// 				itemStyle: {
// 					normal: {
// 						color: function (params) {
// 							var colorList;
// 							if (params.data >= 0) {
// 								colorList = upColor;
// 							} else {
// 								colorList = downColor;
// 							}
// 							return colorList;
// 						},
// 					}
// 				}
// 			}, {
// 				name: 'DIF',
// 				type: 'line',
// 				symbol: "none",
// 				xAxisIndex: 2,
// 				yAxisIndex: 2,
// 				data: macd.dif,
// 				lineStyle: {
// 					normal: {
// 						color: '#da6ee8',
// 						width: 1
// 					}
// 				}
// 			}, {
// 				name: 'DEA',
// 				type: 'line',
// 				symbol: "none",
// 				xAxisIndex: 2,
// 				yAxisIndex: 2,
// 				data: macd.dea,
// 				lineStyle: {
// 					normal: {
// 						opacity: 0.8,
// 						color: '#39afe6',
// 						width: 1
// 					}
// 				}
// 			}
// 		]
// 	};
// }


export function initKOption(cdata, echarts, scale) {
	var data = cdata;
	for (let i = 0; i < 5; i++) {
		var time = new Date(data.times[data.times.length - 1]).getTime() + i * 1 * 60 * 1000
		data.times.push(timeStamp2String(time))
	}

	var pariddf = data.priceArr[data.avgPrice.length - 1]
	var macd = calcMACD(12, 26, 9, data.datas, 1);
	return {
		tooltip: { //弹框指示器
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
			textStyle: {
				fontSize: 12,
				color: '#ccc',
			},
			confine: true,
		},
		legend: { //图例控件,点击图例控制哪些系列不显示
			icon: 'rect',
			type: 'scroll',
			itemWidth: 14,
			itemHeight: 2,
			left: '0',
			top: '0',
			animation: true,
			textStyle: {
				fontSize: 12,
				color: '#0e99e2'
			},
			pageIconColor: '#0e99e2',
		},
		axisPointer: {
			show: true
		},
		color: [ma10Color, ma20Color, ma30Color],
		grid: [{
			id: 'gd1',
			left: '0',
			right: '11%',
			height: '85%', //主K线的高度,
			top: '5%'
		}, {
			left: '0',
			right: '11%',
			top: '75.5%',
			height: '15%' //交易量图的高度
		}],
		xAxis: [ //==== x轴
			{ //主图
				type: 'category',
				splitNumber: 12,
				minInterval: 1,
				data: data.times,
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: { //label文字设置
					color: '#999591',
					fontSize: 10,
					formatter: function (value) {
						// return echarts.format.formatTime('hh:mm', value);
					}
				},
				splitLine: {
					show: false,
					lineStyle: {
						color: '#3a3a3e'
					}
				},
				splitNumber: 20,
				min: 'dataMin',
				max: 'dataMax',
				boundaryGap: ['20%', '20%']
			}, { //交易量图
				type: 'category',
				gridIndex: 1,
				data: data.times,
				axisLabel: { //label文字设置
					color: '#999591',
					fontSize: 10,
					formatter: function (value) {
						return echarts.format.formatTime('hh:mm', value);
					}
				},
				boundaryGap: ['20%', '20%']
			},
		],
		yAxis: [ //y轴
			{ //==主图
				position: "right",
				boundaryGap: ['20%', '20%'],
				scale: true,
				z: 4,
				axisLine: {
					show: true
				},
				axisTick: {
					// show: false
				},
				axisLabel: { //label文字设置
					color: '#999591',
					inside: false, //label文字朝外对齐

				},
				splitLine: { //分割线设置
					show: false,
					lineStyle: {
						color: '#181a23'
					}
				},
				scale: {
					type: 'value'
				}
			}, { //交易图
				position: "right",
				gridIndex: 1, splitNumber: 3, z: 4,
				axisLine: {
					onZero: false,
					show: false,
				},
				splitLine: {
					show: false
				},
				axisLine: {
					show: true
				},
				axisTick: {
					show: false
				},
				axisLabel: { //label文字设置
					// color: '#999591',
					color: 'transparent',
					inside: false, //label文字朝内对齐 
					fontSize: 8
				},

			},
		],
		dataZoom: [
			{
				type: 'inside',
				xAxisIndex: [0, 1], //控件联动
				start: 100,
				end: scale,
			},
		],
		animation: false, //禁止动画效果
		backgroundColor: bgColor,
		blendMode: 'source-over',
		series: [
			{
				name: 'K线',
				type: 'candlestick',
				data: data.datas,
				barWidth: '55%',
				large: true,
				largeThreshold: 100,
				itemStyle: {
					normal: {
						color: upColor, //fd2e2e  ff4242
						color0: downColor,
						borderColor: upColor,
						borderColor0: downColor,
						//opacity:0.8
					}
				},
				markLine: {
					silent: false,
					symbol: ["none", "none"],
					data: [{
						label: {
							normal: {
								position: "end",
								backgroundColor: '#26994e',
								lineHeight: 10,
								padding: 4,
								color: '#fff',
							},
							align: 'center',
						},
						yAxis: pariddf ? pariddf : "",
						lineStyle: {
							normal: {
								color: 'transparent',
								type: 'solid',
							},
						}
					}]
				},
			},
			, {
				name: '',//成交量Volumn
				type: 'bar',
				xAxisIndex: 1,
				yAxisIndex: 1,
				data: data.vols,
				barWidth: '60%',
				itemStyle: {
					normal: {
						color: function (params) {
							var colorList;
							if (data.datas.length > 0 && data.datas[params.dataIndex][1] > data.datas[params.dataIndex][0]) {
								colorList = upColor;
							} else {
								colorList = downColor;
							}
							return colorList;
						},
					}
				}
			},
			{
				name: '',
				type: 'line',
				data: data.priceArr,
				smooth: true,
				symbol: "none",
				lineStyle: { //标线的样式
					normal: {
						opacity: 0.8,
						color: ma20Color,
						width: 1
					}
				}
			},
		]
	};
}

