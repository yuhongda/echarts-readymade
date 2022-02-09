import React from 'react';
import { ECharts } from 'echarts';
import { ChartProps, LegendPosition } from '@echarts-readymade/core';

interface BarHorizontalChartProps extends ChartProps {
    yAxisData?: any[];
    legendPosition?: LegendPosition;
}
declare const BarHorizontal: React.ForwardRefExoticComponent<BarHorizontalChartProps & React.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

export { BarHorizontal, BarHorizontalChartProps };
