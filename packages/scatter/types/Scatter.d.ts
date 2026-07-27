import React from 'react';
import type { ChartProps, LegendPosition } from '@echarts-readymade/core';
export interface ScatterChartProps extends ChartProps {
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
export declare const Scatter: (props: ScatterChartProps) => React.JSX.Element | null;
