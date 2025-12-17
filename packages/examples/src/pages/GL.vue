<template>
	<div class="container">
		<div class="echarts-view">
			<div ref="echartRef" class="charts" ></div>
		</div>
	</div>
</template>
<script setup>
import {ref, computed, onMounted, markRaw} from "vue";
import * as echarts from 'echarts'
import 'echarts-gl'

//数据
const data = ref([
	{ name: "已完成", value: 25, color: "#D13DF2" },
	{ name: "申请中", value: 45, color: "#6442ee" },
	{ name: "已撤销", value: 12, color: "#6DCDE6" },
	{ name: "审核中", value: 7, color: "#2F54F3" },
	{ name: "已驳回", value: 3, color: "#8E56E0" },
]);

// 图表配置
const options = computed(() => {
	//总数
	let total = data.value.reduce((a, b) => a + b.value, 0);
	//当前累加值
	let sumValue = 0;
	//辅助参数,控制饼图半径，（0-1）范围内控制环形大小，值越小环形内半径越大
	let k = 0.2;

	//series配置（每个扇形）
	let series = data.value.map((item) => {
		//当前扇形起始位置占饼图比例
		let startRatio = sumValue / total;
		//值累加
		sumValue += item.value;
		//当前扇形结束位置占饼图比例
		let endRatio = sumValue / total;

		return {
			name: item.name ?? null,
			type: "surface", //曲面图
			itemStyle: {
				color: item.color ?? null, //颜色
			},

			wireframe: {
				show: false, //不显示网格线
			},
			pieData: item, //数据
			//饼图状态
			pieStatus: {
				k, //辅助参数
				startRatio, //起始位置比例
				endRatio, //结束位置比例
				value: item.value, //数值
			},
			resolution: 256, // 高分辨率
			parametric: true, //参数曲面
			//曲面的参数方程
			parametricEquation: getParametricEquation(
				startRatio,
				endRatio,
				k,
				item.value
			),
		};
	});

	//添加指示线
	series.forEach((item, index) => {
		let {
			itemStyle: { color },
			pieStatus: { startRatio, endRatio, value },
		} = item;

		addLabelLine(series, startRatio, endRatio, value, k, index, color);
	});

	//返回配置
	return {
		// 3. 开启WebGL抗锯齿
		webGL: {
			antialias: true // 开启WebGL抗锯齿
		},
		//提示框
		tooltip: {
			formatter: (params) => {
				if (
					params.seriesName !== "mouseoutSeries" &&
					params.seriesName !== "pie2d"
				) {
					return `${
						params.seriesName
					}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
						params.color
					};"></span>${series[params.seriesIndex].pieData.value}`;
				}
				return "";
			},
		},
		xAxis3D: {
			min: -1,
			max: 1,
		},
		yAxis3D: {
			min: -1,
			max: 1,
		},
		zAxis3D: {
			min: -1,
			max: 1,
		},
		//
		grid3D: {
			show: false, //不显示坐标系
			boxHeight: 8, //饼图高度
			// 用于鼠标的旋转，缩放等视角控制
			viewControl: {
				alpha: 30, //视角
				distance: 180, //距离，值越大饼图越小
				rotateSensitivity: 1, //禁止旋转
				zoomSensitivity: 0, //禁止缩放
				panSensitivity: 0, //禁止平移
				autoRotate: true, //禁止自动旋转
			},
		},
		series,
	};
});

/**
 * 获取面的参数方程
 * @param {*} startRatio 扇形起始位置比例
 * @param {*} endRatio 扇形结束位置比例
 * @param {*} k 辅助参数,控制饼图半径
 * @param {*} value 数值
 */
const getParametricEquation = (startRatio, endRatio, k, value) => {
	const startRadian = startRatio * Math.PI * 2;
	const endRadian = endRatio * Math.PI * 2;

	k = typeof k === "number" && !isNaN(k) ? k : 1 / 3; //默认1/3

	// 返回曲面参数方程
	return {
		u: {
			min: -Math.PI,
			max: Math.PI * 3,
			step: Math.PI / 80, // 大幅增加采样密度
		},

		v: {
			min: 0,
			max: Math.PI * 2,
			step: Math.PI / 50, // 大幅增加采样密度
		},

		x(u, v) {
			if (u < startRadian) {
				return Math.cos(startRadian) * (1 + Math.cos(v) * k);
			}
			if (u > endRadian) {
				return Math.cos(endRadian) * (1 + Math.cos(v) * k);
			}
			return Math.cos(u) * (1 + Math.cos(v) * k);
		},

		y(u, v) {
			if (u < startRadian) {
				return Math.sin(startRadian) * (1 + Math.cos(v) * k);
			}
			if (u > endRadian) {
				return Math.sin(endRadian) * (1 + Math.cos(v) * k);
			}
			return Math.sin(u) * (1 + Math.cos(v) * k);
		},

		z(u, v) {
			if (u < -Math.PI * 0.5) {
				return Math.sin(u);
			}
			if (u > Math.PI * 2.5) {
				return Math.sin(u) * value * 0.1;
			}
			// 扇形高度根据value值计算
			return Math.sin(v) > 0 ? value * 0.1 : -1;
		},
	};
};

//添加label指示线
/**
 * @param {*} series 配置
 * @param {*} startRatio 扇形起始位置比例
 * @param {*} endRatio 扇形结束位置比例
 * @param {*} value 数值
 * @param {*} k 辅助参数，饼图半径相关
 * @param {*} i  在series中索引
 * @param {*} color 指示线颜色
 */
const addLabelLine = (
	series,
	startRatio,
	endRatio,
	value,
	k,
	i,
	color = "#fff"
) => {
	//计算扇形中心弧度
	const midRadian = (startRatio + endRatio) * Math.PI;

	// 计算起点位置坐标（扇形边缘中心）
	const radius = 1 + k; // 外径
	const posX = Math.cos(midRadian) * radius; //x坐标
	const posY = Math.sin(midRadian) * radius; //y坐标
	const posZ = 0.1 * value; //z坐标

	let flag =
		(midRadian >= 0 && midRadian <= Math.PI / 2) ||
		(midRadian >= (3 * Math.PI) / 2 && midRadian <= Math.PI * 2)
			? 1
			: -1;

	//计算拐点坐标
	let turningPosArr = [
		posX * 1.1 + i * 0.1 * flag + (flag < 0 ? -0.2 : 0),
		posY * 1.1 + i * 0.1 * flag + (flag < 0 ? -0.2 : 0),
		posZ,
	];
	//计算结束位置坐标
	let endPosArr = [
		posX * 1.2 + i * 0.1 * flag + (flag < 0 ? -0.2 : 0),
		posY * 1.2 + i * 0.1 * flag + (flag < 0 ? -0.2 : 0),
		posZ * 3,
	];

	//添加label+指示线
	series.push(
		//  指示线
		{
			type: "line3D",
			lineStyle: {
				color: "#fff",//线颜色
				width:2,//线宽
			},
			data: [[posX, posY, posZ], turningPosArr, endPosArr],
		},
		//label
		{
			type: "scatter3D",
			label: {
				show: true,
				distance: 0,
				position: "center",
				textStyle: {
					color: "#fff",//文字颜色
					backgroundColor: "rgba(0,0,0,0)", //透明背景
					fontSize: 18,//文字尺寸
					fontWeight :'bold', //文字加粗
					padding: 5,
				},
				formatter: "{b}",
			},
			symbolSize: 0,
			data: [
				{
					name: series[i].name + "：" + value+'个',
					value: endPosArr,
				},
			],
		}
	);
};

let dom = null
const echartRef = ref(null)
onMounted(() => {
	dom = markRaw(echarts.init(echartRef.value))
	dom.setOption(options.value);
})
</script>
<style scoped>
.container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-color: #203598;
	align-items: center;
}

.charts {
	height: 700px;
	width: 700px;
	/* 添加CSS抗锯齿 */
	image-rendering: -webkit-optimize-contrast;
	image-rendering: crisp-edges;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>

