<script setup lang="ts">

import {onMounted} from "vue";
import * as echarts from 'echarts'

onMounted(() => {
	// 绘制一个柱形图
	const dom = echarts.init(document.getElementById('chart1'));
	dom.setOption({
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: [{
					data: [820, 932, 901, 934, 1290, 1330, 1320],
					type: 'bar'
			}]
	})
})
</script>

<template>
	<div>
		<div id="chart1"></div>
	</div>
</template>

<style scoped>
#chart1 {
	width: 500px;
	height: 500px;
}

</style>
