import React from 'react';
import { ECharts } from 'echarts';
import { ChartProps, LegendPosition } from '@echarts-readymade/core';

interface StackChartProps extends ChartProps {
    /**
     * 自定义x轴
     */
    xAxisData?: any[];
    /**
     * 图例位置
     */
    legendPosition?: LegendPosition;
    /**
     * 百分比模式
     */
    isPercentMode?: boolean;
    /**
     * 是否是折线堆积图
     */
    isLineStack?: boolean;
}
declare const Stack: React.ForwardRefExoticComponent<StackChartProps & React.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

export { Stack, StackChartProps };
