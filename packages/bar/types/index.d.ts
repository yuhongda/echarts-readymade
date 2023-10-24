import React from 'react';
import { ECharts } from 'echarts';
import { ChartProps, LegendPosition } from '@echarts-readymade/core';

interface BarChartProps extends ChartProps {
    xAxisData?: any[];
    sortXAxis?: boolean;
    legendPosition?: LegendPosition;
}
declare const Bar: React.ForwardRefExoticComponent<BarChartProps & React.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

export { Bar, BarChartProps };
