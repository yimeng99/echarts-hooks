# 快速开始

ECharts Hooks 是一个基于 ECharts 5 的 Vue 3 hooks 库，提供了简单易用的 API 来创建和管理图表，包括 2D 和 3D 图表。

## 介绍

ECharts Hooks 提供了一组 Vue Composables 函数，使得在 Vue 3 应用中使用 ECharts 变得更加简单和直观。通过使用这些 hooks，您可以轻松地创建、更新和管理图表实例，而无需手动处理复杂的初始化和销毁逻辑。

### 特性

- 🪝 基于 Vue 3 Composition API 设计
- 📊 支持 ECharts 2D 图表和 ECharts-GL 3D 图表
- ⚡ 轻量级，零依赖（除了 ECharts 本身）
- 🎯 完整的 TypeScript 支持
- 📦 易于集成到现有项目中

## 安装

您可以使用您喜欢的包管理器安装 ECharts Hooks：

::: code-group

```bash [npm]
npm install @echarts-hooks/core
```

```bash [yarn]
yarn add @echarts-hooks/core
```

```bash [pnpm]
pnpm add @echarts-hooks/core
```

:::

同时，您还需要安装 ECharts 作为 peer dependency：

::: code-group

```bash [npm]
npm install echarts
```

```bash [yarn]
yarn add echarts
```

```bash [pnpm]
pnpm add echarts
```

:::

如果您需要使用 3D 图表功能，还需要安装 echarts-gl：

::: code-group

```bash [npm]
npm install echarts-gl
```

```bash [yarn]
yarn add echarts-gl
```

```bash [pnpm]
pnpm add echarts-gl
```

:::

## 基础用法

### 使用 useEChart 创建 2D 图表

```vue
<template>
  <div>
    <div ref="chartRef" style="width: 600px; height: 400px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEChart } from '@echarts-hooks/core'

const chartRef = ref()

const options = {
  title: {
    text: '基础折线图'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}

const { init } = useEChart(chartRef, options)

onMounted(() => {
  init()
})
</script>
```

### 使用 useEChartGl 创建 3D 图表

```vue
<template>
  <div>
    <div ref="chartRef" style="width: 600px; height: 400px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEChartGl } from '@echarts-hooks/core'

const chartRef = ref()

const options = {
  xAxis3D: {
    type: 'category',
    data: ['A', 'B', 'C']
  },
  yAxis3D: {
    type: 'category',
    data: ['X', 'Y', 'Z']
  },
  zAxis3D: {
    type: 'value'
  },
  series: [
    {
      type: 'bar3D',
      data: [
        [0, 0, 10],
        [1, 0, 20],
        [2, 0, 30],
        [0, 1, 15],
        [1, 1, 25],
        [2, 1, 35]
      ]
    }
  ]
}

const { init } = useEChartGl(chartRef, options)

onMounted(() => {
  init()
})
</script>
```

## 下一步

- 查看完整的 [API 参考](../api/useEChart.md)了解所有可用的配置选项
- 浏览[示例](../examples/basic.md)获得更多使用灵感