# Examples

本节提供一些实用的示例来展示如何在实际项目中使用 `@echarts-hooks/core` 库。

## 目录

- [基础柱状图](#基础柱状图)
- [响应式图表](#响应式图表)
- [动态更新数据](#动态更新数据)
- [3D 表面图](#3d-表面图)
- [3D 旋转控制](#3d-旋转控制)

## 基础柱状图

这是一个简单的柱状图示例，展示了如何使用 [useEChart](file:///C:/Users/35038/Desktop/etchars-hooks/packages/echarts-hooks/src/index.ts#L3-L3) hook 创建一个基础图表。

```vue
<template>
  <div>
    <div ref="chartRef" style="width: 600px; height: 400px;"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEChart } from '@echarts-hooks/core'

// 图表容器引用
const chartRef = ref<HTMLElement | null>(null)

// 图表配置选项
const options = {
  title: {
    text: '基础柱状图'
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    data: ['一月', '二月', '三月', '四月', '五月', '六月']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110]
    }
  ]
}

// 使用 useEChart hook
const { init } = useEChart(chartRef, options)

// 在组件挂载后初始化图表
onMounted(() => {
  init()
})
</script>
```

## 响应式图表

这个示例演示了如何使图表能够响应窗口大小的变化。

```vue
<template>
  <div>
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useEChart } from '@echarts-hooks/core'

const chartRef = ref<HTMLElement | null>(null)
const options = {
  title: {
    text: '响应式折线图'
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 132, 101, 134, 90, 230, 210],
      type: 'line'
    }
  ]
}

const { init, resize } = useEChart(chartRef, options)

// 处理窗口大小改变事件
const handleResize = () => {
  resize()
}

onMounted(() => {
  init()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 500px;
}
</style>
```

## 动态更新数据

这个示例展示了如何动态更新图表数据。

```vue
<template>
  <div>
    <div ref="chartRef" style="width: 600px; height: 400px;"></div>
    <button @click="updateData">更新数据</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEChart } from '@echarts-hooks/core'

const chartRef = ref<HTMLElement | null>(null)

// 初始数据
const initialOptions = {
  title: {
    text: '动态数据更新'
  },
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [10, 52, 200, 334, 390]
    }
  ]
}

const { init, update } = useEChart(chartRef, initialOptions)

// 生成随机数据的方法
const generateRandomData = () => {
  return Array.from({ length: 5 }, () => Math.floor(Math.random() * 400))
}

// 更新数据的方法
const updateData = () => {
  const newData = generateRandomData()
  update({
    series: [
      {
        data: newData,
        type: 'bar'
      }
    ]
  })
}

onMounted(() => {
  init()
})
</script>
```

## 3D 表面图

这个示例展示了如何使用 [useEChartGl](file:///C:/Users/35038/Desktop/etchars-hooks/packages/echarts-hooks/src/index.ts#L4-L4) 创建一个 3D 表面图。

```vue
<template>
  <div>
    <div ref="chartRef" style="width: 800px; height: 600px;"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEChartGl } from '@echarts-hooks/core'

const chartRef = ref<HTMLElement | null>(null)

// 3D 表面图配置
const options = {
  tooltip: {},
  visualMap: {
    show: false,
    dimension: 2,
    min: 0,
    max: 40
  },
  xAxis3D: {
    type: 'value'
  },
  yAxis3D: {
    type: 'value'
  },
  zAxis3D: {
    type: 'value'
  },
  grid3D: {
    viewControl: {
      projection: 'perspective'
    }
  },
  series: [
    {
      type: 'surface',
      equation: {
        x: {
          step: 0.05
        },
        y: {
          step: 0.05
        },
        z: function (x: number, y: number) {
          return Math.sin(x * Math.PI) * Math.cos(y * Math.PI) * 10
        }
      }
    }
  ]
}

const { init } = useEChartGl(chartRef, options)

onMounted(() => {
  init()
})
</script>
```

## 3D 旋转控制

这个示例展示了如何控制 3D 图表的旋转。

```vue
<template>
  <div>
    <div ref="chartRef" style="width: 800px; height: 600px;"></div>
    <div>
      <button @click="toggleRotation">{{ isRotating ? '停止' : '开始' }}旋转</button>
      <button @click="changeViewAngle">更改视角</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEChartGl } from '@echarts-hooks/core'

const chartRef = ref<HTMLElement | null>(null)
const isRotating = ref(false)

const options = {
  tooltip: {},
  xAxis3D: {
    type: 'value'
  },
  yAxis3D: {
    type: 'value'
  },
  zAxis3D: {
    type: 'value'
  },
  grid3D: {
    viewControl: {
      projection: 'perspective'
    }
  },
  series: [
    {
      type: 'bar3D',
      data: [
        [0, 0, 10],
        [1, 0, 20],
        [0, 1, 15],
        [1, 1, 30]
      ],
      shading: 'color'
    }
  ]
}

const { init, rotate, setViewAngle } = useEChartGl(chartRef, options)

const toggleRotation = () => {
  isRotating.value = !isRotating.value
  if (isRotating.value) {
    rotate(10) // 以速度10开始旋转
  } else {
    rotate(0) // 停止旋转
  }
}

const changeViewAngle = () => {
  // 设置随机视角
  const alpha = Math.random() * 90
  const beta = Math.random() * 90
  setViewAngle(alpha, beta)
}

onMounted(() => {
  init()
})
</script>
```