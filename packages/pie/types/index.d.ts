import React from 'react';
import { ECharts } from 'echarts';
import { ChartProps, LegendPosition } from '@echarts-readymade/core';

interface PieChartProps extends ChartProps {
    showInRing?: boolean;
    legendPosition?: LegendPosition;
}
declare const Pie: React.ForwardRefExoticComponent<PieChartProps & React.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

export { Pie, PieChartProps };
