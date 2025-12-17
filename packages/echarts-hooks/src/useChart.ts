import { ref, watch, onUnmounted, isRef, type Ref } from 'vue';
import * as echarts from 'echarts';

import type { ECharts, EChartsOption } from 'echarts';

// 辅助函数：判断是否是 Vue Ref
const isVueRef = <T>(value: any): value is Ref<T> => {
  return value !== null && typeof value === 'object' && 'value' in value;
};

/**
 * 辅助函数：获取元素节点
 * @param containerOrId 可以是一个 ref 对象，也可以是一个 DOM 元素节点，还可以是一个 ID
 */
const getContainerElement = (containerOrId: Ref<HTMLElement | null> | HTMLElement | string): HTMLElement | null => {
  if (containerOrId instanceof HTMLElement) {
    return containerOrId
  }
  if (typeof containerOrId === 'string') {
    return document.getElementById(containerOrId);
  }
  return containerOrId.value;
};

export function useChart(
    containerRef: Ref<HTMLElement | null>,
    options: Ref<EChartsOption> | EChartsOption,
    theme?: string | object
): { instance: Ref<ECharts | null>; resize: () => void };

export function useChart(
    id: string,
    options: Ref<EChartsOption> | EChartsOption,
    theme?: string | object
): { instance: Ref<ECharts | null>; resize: () => void };

/**
 * 基础图表 - 都可以调用该方法生成图表
 * @param containerOrId
 * @param options
 * @param theme
 */
export function useChart(
    containerOrId: Ref<HTMLElement | null> | HTMLElement | string,
    options: Ref<EChartsOption> | EChartsOption,
    theme?: string | object
): { instance: Ref<ECharts | null>; resize: () => void } {
  const instance = ref<ECharts | null>(null);
  let unwatch: (() => void) | null = null;
  // 窗口调整监听函数
  const handleResize = () => {
    instance.value?.resize();
  };

  // 初始化图表
  const initChart = () => {
    const container = getContainerElement(containerOrId);
    if (!container) {
      console.warn('Chart container not found');
      return;
    }

    if (instance.value) {
      instance.value.dispose();
    }

    try {
      instance.value = echarts.init(container, theme);
      updateChart();

      // 监听窗口变化
      window.addEventListener('resize', handleResize);
    } catch (error) {
      console.error('Failed to initialize chart:', error);
    }
  };

  // 更新图表选项
  const updateChart = () => {
    if (!instance.value) return;

    try {
      const opts = isVueRef(options) ? options.value : options;
      instance.value.setOption(opts, { notMerge: true });
    } catch (error) {
      console.error('Failed to update chart options:', error);
    }
  };

  // 销毁图表
  const disposeChart = () => {
    if (instance.value) {
      instance.value.dispose();
      instance.value = null;
    }
    if (unwatch) {
      unwatch();
      unwatch = null;
    }
    window.removeEventListener('resize', handleResize);
  };

  // 监听容器变化（仅对 Ref 版本有效）
  if (typeof containerOrId !== 'string') {
    const stopWatch = watch(
        containerOrId,
        (newContainer, oldContainer) => {
          if (newContainer && !oldContainer) {
            // 从 null 变为有效元素，初始化图表
            initChart();
          } else if (!newContainer && oldContainer) {
            // 从有效元素变为 null，销毁图表
            disposeChart();
          }
        },
        { immediate: true }
    );

    unwatch = stopWatch;
  } else {
    // ID 版本：在组件挂载后直接初始化
    const initOnMount = () => {
      // 使用 setTimeout 确保 DOM 已渲染
      setTimeout(initChart, 0);
    };

    // 模拟 onMounted 效果
    if (typeof window !== 'undefined') {
      initOnMount();
    }
  }

  // 监听 options 变化
  if (isVueRef(options)) {
    watch(
        options,
        (newOptions) => {
          if (instance.value) {
            instance.value.setOption(newOptions, { notMerge: true });
          }
        },
        { deep: true }
    );
  }

  // 返回 resize 方法供外部调用
  const resize = () => {
    instance.value?.resize();
  };

  // 组件卸载时清理
  onUnmounted(() => {
    disposeChart();
  });

  return { instance, resize } as {
    instance: Ref<ECharts | null>;
    resize: () => void;
  };
}


export {
  EChartsOption
}
