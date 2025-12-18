<script setup>
import {nextTick, onMounted, ref} from "vue";
import {useEChart} from "@echarts-hooks/core";
const chart = ref(null)
const chartInstance = useEChart(chart, {
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	yAxis: {
		type: 'value'
	},
	series: [{
		data: [820, 932, 901, 934, 1290, 1330, 1320],
		type: 'line'
	}],
	// padding
	grid: {
		left: '20%',
		right: '5%',
		bottom: '16%',
		top: '5%',
	}
})

const setOp = () => {
	chartInstance.update({
		series: [{
			data: [820, 932, 901, 934, 1290],
			type: 'line'
		}],
	})
}

onMounted(() => {
	chartInstance.init()
})
</script>

<template>
	<div>
		<div class="card-box" ref="chart"></div>
		<button @click="setOp">resize</button>
	</div>
</template>
<style scoped>
.card-box {
	width: 200px;
	height: 200px;
}
</style>
