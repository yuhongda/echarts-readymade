import type { EChartsOption } from 'echarts-for-react';
type ChartSettings = {
    legendPosition?: 'top' | 'right' | 'bottom' | 'left';
};
type ChartType = 'line' | 'bar' | 'pie' | 'stack' | 'line-stack' | 'line-bar' | 'bar-horizontal' | 'table' | 'high-relation-scatter' | 'map' | 'wordcloud' | 'scatter';
export declare const buildChartOption: (chartOptions: EChartsOption, settings: ChartSettings, chartType: ChartType) => EChartsOption;
export {};
