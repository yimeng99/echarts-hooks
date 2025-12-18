# API Documentation

## Table of Contents

- [useEChart](#useechart)
  - [Overview](#overview)
  - [Function Signatures](#function-signatures)
  - [Parameters](#parameters)
  - [Return Value](#return-value)
  - [Methods](#methods)
- [useEChartGl](#useechartgl)
  - [Overview](#overview-1)
  - [Function Signature](#function-signature)
  - [Parameters](#parameters-1)
  - [Return Value](#return-value-1)
  - [Methods](#methods-1)
  - [Special Types](#special-types)

## useEChart

### Overview

`useEChart` 是一个 Vue Composition API hook，用于在 Vue 3 应用中轻松创建和管理 ECharts 2D 图表实例。

### Function Signatures

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

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| container | `string \| HTMLElement \| Ref<HTMLElement>` | 图表容器元素，可以是 DOM 元素、元素 ID 字符串或 Vue ref |
| options | `EChartsOption` | ECharts 配置选项对象 |
| theme | `string \| object \| null` (optional) | ECharts 主题配置 |

### Return Value

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

### Methods

#### instance

类型: `Ref<ECharts | null>`

对当前 ECharts 实例的响应式引用。如果尚未初始化或已被销毁，则为 `null`。

#### init()

初始化图表实例。此方法会:

1. 查找并验证容器元素
2. 创建新的 ECharts 实例
3. 应用提供的配置选项

#### update(options)

参数:
- `options`: `EChartsOption` - 新的配置选项

更新图表配置。此方法会将新选项与现有选项合并，并重新渲染图表。

#### dispose()

销毁图表实例。此方法会:

1. 释放 ECharts 实例占用的资源
2. 将 [instance](file:///C:/Users/35038/Desktop/etchars-hooks/packages/echarts-hooks/src/useEChart.ts#L55-L55) 设置为 `null`

#### resize()

调整图表大小以适应容器元素的新尺寸。

## useEChartGl

### Overview

`useEChartGl` 是一个专门用于处理 ECharts-GL 3D 图表的 Vue Composition API hook。它扩展了基本的 ECharts 功能，增加了对 3D 图表的支持。

### Function Signature

```typescript
function useEChartGl(
  container: EChartGlContainer,
  options: EChartGlOptions = defaultGlOptions,
  theme?: ThemeType,
  autoInit: boolean = true
): UseEChartGlReturn
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| container | `string \| HTMLElement \| Ref<HTMLElement> \| null` | - | 图表容器元素 |
| options | `EChartGlOptions` | `defaultGlOptions` | 3D 图表配置选项 |
| theme | `string \| object \| undefined` | `undefined` | ECharts 主题配置 |
| autoInit | `boolean` | `true` | 是否在组件挂载时自动初始化图表 |

### Return Value

函数返回一个包含以下属性的对象：

```typescript
interface UseEChartGlReturn {
  instance: Ref<echarts.ECharts | null>
  init: () => boolean
  update: (options: EChartGlOptions) => void
  dispose: () => void
  resize: () => void
  setViewAngle: (alpha: number, beta: number) => void
  rotate: (speed?: number) => void
}
```

### Methods

#### instance

类型: `Ref<echarts.ECharts | null>`

对当前 ECharts-GL 实例的响应式引用。如果尚未初始化或已被销毁，则为 `null`。

#### init(): boolean

初始化 3D 图表实例。此方法会:

1. 查找并验证容器元素
2. 如果存在现有实例则先销毁它
3. 创建新的 ECharts-GL 实例
4. 应用配置选项

返回值表示初始化是否成功。

#### update(options)

参数:
- `options`: `EChartGlOptions` - 新的配置选项

更新 3D 图表配置。

#### dispose()

销毁 3D 图表实例，释放所有相关资源。

#### resize()

调整 3D 图表大小以适应容器元素的新尺寸。

#### setViewAngle(alpha, beta)

参数:
- `alpha`: `number` - Alpha 角度（绕 X 轴旋转）
- `beta`: `number` - Beta 角度（绕 Y 轴旋转）

设置 3D 图表的视角角度。

#### rotate(speed?)

参数:
- `speed`: `number` (optional) - 旋转速度

控制图表的自动旋转:
- 不传参数：切换旋转状态（开启/关闭）
- 传入正数：以指定速度开始旋转
- 传入 0 或负数：停止旋转

### Special Types

#### EChartGlOptions

扩展自 `EChartsOption`，添加了 3D 特定的配置项：

```typescript
interface EChartGlOptions extends EChartsOption {
  grid3D?: any
  xAxis3D?: any
  yAxis3D?: any
  zAxis3D?: any
  globe?: any
}
```

#### defaultGlOptions

默认的 3D 图表配置：

```typescript
const defaultGlOptions: EChartGlOptions = {
  backgroundColor: '#000',
  visualMap: {
    show: false,
    dimension: 2,
    min: -1,
    max: 1,
    inRange: {
      color: [
        '#313695',
        '#4575b4',
        '#74add1',
        '#abd9e9',
        '#e0f3f8',
        '#ffffbf',
        '#fee090',
        '#fdae61',
        '#f46d43',
        '#d73027',
        '#a50026'
      ]
    }
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
      projection: 'perspective',
      autoRotate: true,
      autoRotateSpeed: 10,
      distance: 200
    },
    light: {
      main: {
        intensity: 1.2,
        shadow: true
      },
      ambient: {
        intensity: 0.3
      }
    }
  }
}
```