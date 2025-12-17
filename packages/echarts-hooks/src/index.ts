import * as echarts from 'echarts/core'
import type { ECharts, EChartsOption } from "echarts";
import { useEChart } from './useEChart'
import { useEChartGl } from './useEChartGl'

export interface ChartOptions {
  container: HTMLElement;
  options: echarts.EChartsOption;
}

export function createChart(container: HTMLElement, options: EChartsOption, theme?: string | object | null): ECharts {
  const chart = echarts.init(container, theme);
  chart.setOption(options);
  return chart;
}

export function updateChart(chart: echarts.ECharts, options: echarts.EChartsOption): void {
  chart.setOption(options);
}

export function disposeChart(chart: echarts.ECharts): void {
  chart.dispose();
}

export {
  useEChart,
  useEChartGl,
  EChartsOption
}
