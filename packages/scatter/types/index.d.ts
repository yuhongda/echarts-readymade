import React from 'react';
import { ECharts } from 'echarts';
import { ChartProps, LegendPosition } from '@echarts-readymade/core';

interface ScatterChartProps extends ChartProps {
    /**
     * 图例位置
     */
    legendPosition?: LegendPosition;
    minDotSize?: number;
    maxDotSize?: number;
    colorMap?: {
        name: string;
        color: string;
    }[];
}
declare const Scatter: React.ForwardRefExoticComponent<ScatterChartProps & React.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

export { Scatter, ScatterChartProps };
