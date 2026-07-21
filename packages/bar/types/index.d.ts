import React from 'react';
import type { ChartProps, LegendPosition } from '@echarts-readymade/core';
export interface BarChartProps extends ChartProps {
    xAxisData?: any[];
    sortXAxis?: boolean;
    legendPosition?: LegendPosition;
}
export declare const Bar: (props: BarChartProps) => React.JSX.Element | null;
