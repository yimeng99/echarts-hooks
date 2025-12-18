# 安装

本指南将帮助您在项目中安装和配置 ECharts Hooks。

## 环境要求

在开始之前，请确保您的开发环境满足以下要求：

- Vue 3.x
- ECharts 5.x
- Node.js 14+

## 安装步骤

### 1. 安装核心包

使用您喜欢的包管理器安装 `@echarts-hooks/core` 包：

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

### 2. 安装 ECharts

ECharts 是必需的 peer dependency：

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

### 3. 安装 ECharts-GL（可选）

如果您需要使用 3D 图表功能，需要额外安装 `echarts-gl`：

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

## 验证安装

创建一个简单的测试文件来验证安装是否成功：

```vue
<template>
  <div>
    <div ref="chartRef" style="width: 400px; height: 300px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEChart } from '@echarts-hooks/core'

const chartRef = ref()

const options = {
  title: {
    text: '测试图表'
  },
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [12, 34, 23],
      type: 'bar'
    }
  ]
}

const { init } = useEChart(chartRef, options)

onMounted(() => {
  init()
  console.log('ECharts Hooks 安装成功!')
})
</script>
```

如果图表正确显示且没有控制台错误，则表示安装成功。

## 常见问题

### 1. TypeScript 支持

ECharts Hooks 提供了完整的 TypeScript 类型支持。如果您使用 TypeScript，可以直接导入类型：

```typescript
import { useEChart, useEChartGl } from '@echarts-hooks/core'
import type { EChartsOption } from 'echarts'
```

### 2. Tree Shaking

ECharts Hooks 支持 tree-shaking，您可以只导入需要的功能：

```typescript
// 只导入需要的 hook
import { useEChart } from '@echarts-hooks/core'

// 或者
import { useEChartGl } from '@echarts-hooks/core'
```

### 3. CDN 使用

如果您不想使用构建工具，可以通过 CDN 引入：

```html
<script src="https://unpkg.com/@echarts-hooks/core/dist/index.umd.js"></script>
```

然后在代码中使用：

```javascript
const { useEChart } = EChartsHooks
```

## 下一步

- 阅读[快速开始](./getting-started.md)指南了解更多用法
- 查看[API 参考](../api/useEChart.md)了解详细配置选项