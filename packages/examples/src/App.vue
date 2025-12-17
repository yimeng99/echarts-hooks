<script setup>
import {nextTick, onMounted, ref} from "vue";
import {useEChart} from "@echarts-hooks/core";
let chartInstance

const chart = ref(null)
onMounted(() => {
	const options = {
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
		}]
	}
	chartInstance = useEChart(chart, options)
	chartInstance.init()
})
</script>

<template>
	<div>
		<div class="card-box" ref="chart"></div>
		<button @click="setDiv">该表大小</button>
	</div>
</template>
<style scoped>
.card-box {
	width: 200px;
	height: 200px;
}
</style>
