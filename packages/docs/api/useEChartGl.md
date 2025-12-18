# useEChartGl

`useEChartGl` 是一个专门用于处理 ECharts-GL 3D 图表的 Vue Composition API hook。它扩展了基本的 ECharts 功能，增加了对 3D 图表的支持。

## 导入

```typescript
import { useEChartGl } from '@echarts-hooks/core'
```

## 函数签名

```typescript
function useEChartGl(
  container: EChartGlContainer,
  options: EChartGlOptions = defaultGlOptions,
  theme?: ThemeType,
  autoInit: boolean = true
): UseEChartGlReturn
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| container | `string \| HTMLElement \| Ref<HTMLElement> \| null` | - | 图表容器元素 |
| options | `EChartGlOptions` | `defaultGlOptions` | 3D 图表配置选项 |
| theme | `string \| object \| undefined` | `undefined` | ECharts 主题配置 |
| autoInit | `boolean` | `true` | 是否在组件挂载时自动初始化图表 |

## 返回值

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

### instance

类型: `Ref<echarts.ECharts | null>`

对当前 ECharts-GL 实例的响应式引用。如果尚未初始化或已被销毁，则为 `null`。

### init(): boolean

初始化 3D 图表实例。此方法会:

1. 查找并验证容器元素
2. 如果存在现有实例则先销毁它
3. 创建新的 ECharts-GL 实例
4. 应用配置选项

返回值表示初始化是否成功。

### update(options)

参数:
- `options`: `EChartGlOptions` - 新的配置选项

更新 3D 图表配置。

### dispose()

销毁 3D 图表实例，释放所有相关资源。

### resize()

调整 3D 图表大小以适应容器元素的新尺寸。

### setViewAngle(alpha, beta)

参数:
- `alpha`: `number` - Alpha 角度（绕 X 轴旋转）
- `beta`: `number` - Beta 角度（绕 Y 轴旋转）

设置 3D 图表的视角角度。

### rotate(speed?)

参数:
- `speed`: `number` (optional) - 旋转速度

控制图表的自动旋转:
- 不传参数：切换旋转状态（开启/关闭）
- 传入正数：以指定速度开始旋转
- 传入 0 或负数：停止旋转

## 特殊类型

### EChartGlOptions

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

### defaultGlOptions

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

## 使用示例

### 基础 3D 图表

```vue
<template>
  <div>
    <div ref="chartRef" style="width: 800px; height: 600px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEChartGl } from '@echarts-hooks/core'

const chartRef = ref()

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
        z: function (x, y) {
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

### 3D 旋转控制

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

<script setup>
import { ref, onMounted } from 'vue'
import { useEChartGl } from '@echarts-hooks/core'

const chartRef = ref()
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