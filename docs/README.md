# ECharts Hooks Documentation

ECharts Hooks 是一个基于 ECharts 5 的 Vue 3 hooks 库，提供了简单易用的 API 来创建和管理图表，包括 2D 和 3D 图表。

## 目录

- [安装](#安装)
- [快速开始](#快速开始)
- [API 参考](#api-参考)
  - [useEChart](#useechart)
  - [useEChartGl](#useechartgl)
- [示例](#示例)
- [许可证](#许可证)

## 安装

使用 npm:

```bash
npm install @echarts-hooks/core
```

使用 yarn:

```bash
yarn add @echarts-hooks/core
```

使用 pnpm:

```bash
pnpm add @echarts-hooks/core
```

## 快速开始

### 基础用法

```typescript
import { useEChart } from '@echarts-hooks/core'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const chartRef = ref<HTMLElement | null>(null)
    
    // 图表配置
    const options = {
      title: { text: '基础折线图' },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }]
    }

    const { instance, init } = useEChart(chartRef, options)
    
    onMounted(() => {
      init()
    })

    return {
      chartRef
    }
  }
}
```

### 在模板中使用

```vue
<template>
  <div>
    <div ref="chartRef" style="width: 600px; height: 400px;"></div>
  </div>
</template>
```

## API 参考

### useEChart

用于创建和管理 2D ECharts 图表的 hook。

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| container | `string \| HTMLElement \| Ref<HTMLElement>` | 图表容器，可以是元素 ID、DOM 元素或 Vue ref |
| options | `EChartsOption` | 图表配置选项 |
| theme | `string \| object` (可选) | 图表主题 |

#### 返回值

| 属性 | 类型 | 描述 |
|------|------|------|
| instance | `Ref<ECharts \| null>` | 图表实例引用 |
| init | `() => void` | 初始化图表 |
| update | `(options: EChartsOption) => void` | 更新图表配置 |
| dispose | `() => void` | 销毁图表 |
| resize | `() => void` | 调整图表大小 |

#### 示例

```typescript
import { useEChart } from '@echarts-hooks/core'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const chartRef = ref<HTMLElement | null>(null)
    
    const options = {
      // ... 图表配置
    }

    // 使用字符串 ID
    const { instance, init } = useEChart('chart-container', options)
    
    // 或者使用 ref
    const { instance, init } = useEChart(chartRef, options)
    
    onMounted(() => {
      init()
    })

    return {
      chartRef
    }
  }
}
```

### useEChartGl

用于创建和管理 3D ECharts-GL 图表的 hook。

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| container | `string \| HTMLElement \| Ref<HTMLElement>` | 图表容器 |
| options | `EChartGlOptions` | 3D 图表配置选项 |
| theme | `string \| object` (可选) | 图表主题 |
| autoInit | `boolean` (可选，默认为 true) | 是否自动初始化 |

#### 返回值

| 属性 | 类型 | 描述 |
|------|------|------|
| instance | `Ref<ECharts \| null>` | 图表实例引用 |
| init | `() => boolean` | 初始化图表，返回是否成功 |
| update | `(options: EChartGlOptions) => void` | 更新图表配置 |
| dispose | `() => void` | 销毁图表 |
| resize | `() => void` | 调整图表大小 |
| setViewAngle | `(alpha: number, beta: number) => void` | 设置 3D 视角 |
| rotate | `(speed?: number) => void` | 控制图表旋转 |

#### 示例

```typescript
import { useEChartGl } from '@echarts-hooks/core'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const chartRef = ref<HTMLElement | null>(null)
    
    const options = {
      // ... 3D 图表配置
    }

    const { instance, init } = useEChartGl(chartRef, options)
    
    onMounted(() => {
      init()
    })

    return {
      chartRef
    }
  }
}
```

## 示例

查看 [examples](../packages/examples) 目录获取更多使用示例：

1. [基础 2D 图表示例](../packages/examples/src/pages/SetupComponent.vue)
2. [3D 图表示例](../packages/examples/src/pages/GL.vue)

## 许可证

MIT