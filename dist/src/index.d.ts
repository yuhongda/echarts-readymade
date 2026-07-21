import React from 'react';
import type { ChartProps, LegendPosition } from '@echarts-readymade/core';
export interface StackChartProps extends ChartProps {
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
export declare const Stack: (props: StackChartProps) => React.JSX.Element | null;
