// composables/useEChartGl.ts
import * as echarts from 'echarts'
import 'echarts-gl'  // 导入 3D 扩展
import { ref, type Ref, unref, onMounted, onUnmounted } from 'vue'
import type { EChartsOption } from 'echarts'

// 3D 图表专用类型
type EChartGlContainer = Ref<HTMLElement | null> | HTMLElement | string | null
type ThemeType = string | object | undefined

// 3D 图表专用配置接口
export interface EChartGlOptions extends EChartsOption {
    // 3D 特定配置
    grid3D?: any
    xAxis3D?: any
    yAxis3D?: any
    zAxis3D?: any
    globe?: any
}

// 返回类型
export interface UseEChartGlReturn {
    instance: Ref<echarts.ECharts | null>
    init: () => boolean
    update: (options: EChartGlOptions) => void
    dispose: () => void
    resize: () => void
    setViewAngle: (alpha: number, beta: number) => void  // 3D 视角控制
    rotate: (speed?: number) => void                     // 旋转控制
}

// 默认的 3D 配置
export const defaultGlOptions: EChartGlOptions = {
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

export const useEChartGl = (
    container: EChartGlContainer,
    options: EChartGlOptions = defaultGlOptions,
    theme?: ThemeType,
    autoInit: boolean = true
): UseEChartGlReturn => {
    const instance = ref<echarts.ECharts | null>(null)
    const isInitialized = ref(false)
    const rotationId = ref<any | null>(null)

    // 获取容器元素
    const getContainerElement = (): HTMLElement | null => {
        if (typeof container === 'string') {
            return document.querySelector(container)
        } else if (container instanceof HTMLElement) {
            return container
        } else if (container && 'value' in container) {
            return unref(container as Ref<HTMLElement | null>)
        }
        return null
    }

    // 初始化 3D 图表
    const init = (): boolean => {
        try {
            const element = getContainerElement()
            if (!element) {
                console.error('[useEChartGl] 容器元素未找到')
                return false
            }

            // 如果已有实例，先销毁
            if (instance.value) {
                dispose()
            }

            // 创建 3D 图表实例
            instance.value = echarts.init(element, theme)

            // 合并默认配置和用户配置
            const mergedOptions = {
                ...defaultGlOptions,
                ...options
            }

            instance.value.setOption(mergedOptions)
            isInitialized.value = true

            console.log('[useEChartGl] 3D 图表初始化成功')
            return true
        } catch (error) {
            console.error('[useEChartGl] 初始化失败:', error)
            return false
        }
    }

    // 更新图表配置
    const update = (newOptions: EChartGlOptions) => {
        if (!instance.value || !isInitialized.value) {
            console.warn('[useEChartGl] 图表未初始化，无法更新')
            return
        }

        try {
            instance.value.setOption(newOptions)
        } catch (error) {
            console.error('[useEChartGl] 更新配置失败:', error)
        }
    }

    // 调整大小
    const resize = () => {
        if (instance.value) {
            instance.value.resize()
        }
    }

    // 销毁图表
    const dispose = () => {
        stopRotation()  // 停止旋转

        if (instance.value) {
            instance.value.dispose()
            instance.value = null
            isInitialized.value = false
        }
    }

    // 设置 3D 视角
    const setViewAngle = (alpha: number, beta: number) => {
        if (!instance.value) return

        try {
            instance.value.setOption({
                grid3D: {
                    viewControl: {
                        alpha,
                        beta
                    }
                }
            })
        } catch (error) {
            console.error('[useEChartGl] 设置视角失败:', error)
        }
    }

    // 开始自动旋转
    const startRotation = (speed: number = 10) => {
        if (!instance.value || rotationId.value) return

        rotationId.value = setInterval(() => {
            if (instance.value) {
                try {
                    const option: any = instance.value.getOption()
                    const currentAlpha = option.grid3D?.[0]?.viewControl?.alpha || 0
                    const currentBeta = option.grid3D?.[0]?.viewControl?.beta || 0

                    instance.value.setOption({
                        grid3D: {
                            viewControl: {
                                alpha: (currentAlpha + 0.5) % 360,
                                beta: (currentBeta + 0.2) % 360
                            }
                        }
                    })
                } catch (error) {
                    console.error('[useEChartGl] 旋转失败:', error)
                }
            }
        }, 1000 / 60)  // 60fps
    }

    // 停止旋转
    const stopRotation = () => {
        if (rotationId.value) {
            clearInterval(rotationId.value)
            rotationId.value = null
        }
    }

    // 旋转控制
    const rotate = (speed?: number) => {
        if (speed === undefined) {
            // 切换旋转状态
            if (rotationId.value) {
                stopRotation()
            } else {
                startRotation(10)
            }
        } else if (speed > 0) {
            startRotation(speed)
        } else {
            stopRotation()
        }
    }

    // 监听窗口大小变化
    const handleResize = () => {
        resize()
    }

    // 自动初始化
    if (autoInit) {
        onMounted(() => {
            // 延迟初始化确保 DOM 已渲染
            setTimeout(() => {
                init()
            }, 100)
        })
    }

    // 组件卸载时清理
    onUnmounted(() => {
        dispose()
        window.removeEventListener('resize', handleResize)
    })

    // 添加窗口大小监听
    onMounted(() => {
        window.addEventListener('resize', handleResize)
    })

    return {
        instance,
        init,
        update,
        dispose,
        resize,
        setViewAngle,
        rotate
    } as UseEChartGlReturn
}

export default useEChartGl
