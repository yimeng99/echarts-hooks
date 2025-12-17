import * as echarts from 'echarts'
import {isRef, onMounted, ref, Ref} from "vue";
import type { EChartsOption } from "echarts";

// 定义本地类型别名
type ChartInstance = echarts.ECharts;
type ChartOptions = echarts.EChartsOption;

// 主题类型
type ThemeType = string | object | null

type UseEChartContainer = Ref<HTMLElement | null> | HTMLElement | null;

// 明确指定返回类型以避免TS4023错误
interface UseEChartReturn {
  instance: Ref<ChartInstance | null>;
  init: () => void;
  update: (options: ChartOptions) => void;
  dispose: () => void;
  resize: () => void;
}

/**
 * 定义容器类型
 * @typedef {string | HTMLElement | Ref<HTMLElement | null | undefined>} EChartContainer
 */
export type EChartContainer = string | HTMLElement | Ref<HTMLElement | null | undefined>;

/**
 * 判断是否是 HTML 元素
 * @param el
 */
function isHTMLElement(el: any): el is HTMLElement {
  return el instanceof HTMLElement;
}

/**
 * 判断是否是 Vue Ref
 * @param el
 */
function isVueRef(el: any): el is Ref<HTMLElement | null | undefined> {
  return el && typeof el === 'object' && 'value' in el;
}

/**
 * 函数重载
 * @param container DOM 元素
 * @param options 图表配置项
 * @param theme 主题
 */
export function useEChart(container: HTMLElement, options: EChartsOption, theme?: ThemeType): UseEChartReturn

/**
 * 函数重载
 * @param container 容器元素 ID
 * @param options 图表配置项
 * @param theme 主题
 */
export function useEChart(container: string, options: EChartsOption, theme?: ThemeType): UseEChartReturn

/**
 * 函数重载
 * @param container ref 对象
 * @param options 图表配置项
 * @param theme 主题
 */
export function useEChart(container: Ref<HTMLElement>, options: EChartsOption, theme?: ThemeType): UseEChartReturn



export function useEChart(container: EChartContainer, options: ChartOptions, theme?: ThemeType): UseEChartReturn {
  const chartInstance = ref<ChartInstance | null>(null);

  const _container = ref<HTMLElement | null>(null)

  console.log('useEChart')
  const resize = () => {
    chartInstance.value?.setOption(options);
    chartInstance.value?.resize();
  };

  const update = (opts: ChartOptions) => {
    chartInstance.value?.setOption(opts);
  };

  const dispose = () => {
    chartInstance.value?.dispose();
    chartInstance.value = null;
  };
  // 只监听一次 container

  const init = () => {
    console.log('_container', _container)
    const dom = getDomElement()
    if (!dom) {
      console.error('Chart container not found');
      return
    }
    chartInstance.value = echarts.init(dom, theme);
    chartInstance.value.setOption(options);
  };

  // 获取 DOM 元素
  const getDomElement = (): HTMLElement | null => {
    if (typeof container === 'string') {
      // 字符串选择器
      return document.getElementById(container);
    } else if (isHTMLElement(container)) {
      // HTMLElement 实例
      return container;
    } else if (isVueRef(container)) {
      // Vue Ref 对象
      return container.value ?? null;
    }
    return null;
  };


  return {
    instance: chartInstance,
    init,
    resize,
    update,
    dispose
  } as UseEChartReturn;
}


/* 柱状图 */
