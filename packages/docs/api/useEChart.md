# useEChart

`useEChart` 是一个 Vue Composition API hook，用于在 Vue 3 应用中轻松创建和管理 ECharts 2D 图表实例。

## 导入

```typescript
import { useEChart } from '@echarts-hooks/core'
```

## 函数签名

```typescript
// 使用 HTMLElement
function useEChart(
  container: HTMLElement, 
  options: EChartsOption, 
  theme?: ThemeType
): UseEChartReturn

// 使用字符串 ID
function useEChart(
  container: string, 
  options: EChartsOption, 
  theme?: ThemeType
): UseEChartReturn

// 使用 Vue ref
function useEChart(
  container: Ref<HTMLElement>, 
  options: EChartsOption, 
  theme?: ThemeType
): UseEChartReturn
```

## 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| container | `string \| HTMLElement \| Ref<HTMLElement>` | 图表容器元素，可以是 DOM 元素、元素 ID 字符串或 Vue ref |
| options | `EChartsOption` | ECharts 配置选项对象 |
| theme | `string \| object \| null` (可选) | ECharts 主题配置 |

## 返回值

函数返回一个包含以下属性的对象：

```typescript
interface UseEChartReturn {
  instance: Ref<ECharts | null>
  init: () => void
  update: (options: EChartsOption) => void
  dispose: () => void
  resize: () => void
}
```

### instance

类型: `Ref<ECharts | null>`

对当前 ECharts 实例的响应式引用。如果尚未初始化或已被销毁，则为 `null`。

### init()

初始化图表实例。此方法会:

1. 查找并验证容器元素
2. 创建新的 ECharts 实例
3. 应用提供的配置选项

### update(options)

参数:
- `options`: `EChartsOption` - 新的配置选项

更新图表配置。此方法会将新选项与现有选项合并，并重新渲染图表。

### dispose()

销毁图表实例。此方法会:

1. 释放 ECharts 实例占用的资源
2. 将 [instance](file:///C:/Users/35038/Desktop/etchars-hooks/packages/echarts-hooks/src/useEChart.ts#L55-L55) 设置为 `null`

### resize()

调整图表大小以适应容器元素的新尺寸。

## 使用示例

### 基础用法

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

### 动态更新数据

```vue
<template>
  <div>
    <div ref="chartRef" style="width: 600px; height: 400px;"></div>
    <button @click="updateData">更新数据</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEChart } from '@echarts-hooks/core'

const chartRef = ref()

const options = {
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

const { init, update } = useEChart(chartRef, options)

const updateData = () => {
  update({
    series: [
      {
        data: [12, 34, 56, 78, 90],
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

### 响应式图表

```vue
<template>
  <div>
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useEChart } from '@echarts-hooks/core'

const chartRef = ref()

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