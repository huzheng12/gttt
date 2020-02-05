
export function initKOption(cdata, echarts, scale) {
	var data = cdata;
	// var data = splitData(cdata);
	var pariddf = data.priceArr[data.avgPrice.length - 1]
	console.log(data, pariddf)

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
		color: [ma5Color, ma10Color, ma20Color, ma30Color],
		grid: [{
			id: 'gd1',
			left: '0',
			right: '1%',
			height: '85%', //主K线的高度,
			top: '5%'
		}],
		xAxis: [ //==== x轴
			{ //主图
				type: 'category',
				data: data.times,
				scale: true,
				boundaryGap: false,
				axisLine: {
					onZero: false
				},
				axisLabel: { //label文字设置
					color: '#999591',
					fontSize: 10,
					formatter: function (value) {
						return echarts.format.formatTime('hh:mm', value);
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
				max: 'dataMax'
			}
		],
		yAxis: [ //y轴
			{ //==主图
				position: "right",
				scale: true,
				// z: 4,
				axisLine: {
					show: false
				},
				axisTick: {
					// show: false
				},
				axisLabel: { //label文字设置
					color: '#999591',
					inside: true, //label文字朝外对齐

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
			}
		],
		dataZoom: [
			{
				type: 'inside',
				xAxisIndex: [0], //控件联动
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
								color: '#26994e',
								type: 'solid',
							},
						}
					}]
				},
				markPoint: {
					show: true,
					symbol: 'rect',
					symbolSize: [
						50, 20
					],
					symbolOffset: [-20, 0],
					data: [{
						coord: [data.times[data.times.length - 1], pariddf], // 其中 5 表示 xAxis.data[5]，即 '33' 这个元素。
						value: pariddf,
						label: {
							color: "#fff"
						}
					}]
				}
			},
			{
				name: 'MA10',
				type: 'line',
				data: data.priceArr,
				smooth: true,
				symbol: "none",
				lineStyle: { //标线的样式
					normal: {
						opacity: 0.8,
						color: '#da6ee8',
						width: 1
					}
				}
			},
		]
	};
}