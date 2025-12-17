<script setup>
import {nextTick, onMounted, ref} from "vue";
import {useEChart} from "@echarts-hooks/core";
import Children1 from "./pages/children1.vue";

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

const setDiv = () => {
	if (!chart.value) return
	chart.value.style.width = '500px'
	chart.value.style.height = '500px'
	nextTick(() => {
		chartInstance.resize()
	})
}

</script>

<template>
	<div>
		<div class="card-box" ref="chart"></div>
		<button @click="setDiv">该表大小</button>
		<children1/>
		<children1/>
	</div>
</template>
<style scoped>
.card-box {
	width: 200px;
	height: 200px;
}
</style>
