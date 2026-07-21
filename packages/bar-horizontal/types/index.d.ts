import React from 'react';
import type { ChartProps, LegendPosition } from '@echarts-readymade/core';
export interface BarHorizontalChartProps extends ChartProps {
    yAxisData?: any[];
    legendPosition?: LegendPosition;
}
export declare const BarHorizontal: (props: BarHorizontalChartProps) => React.JSX.Element | null;
