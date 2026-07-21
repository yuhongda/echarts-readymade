import React from 'react';
import type { ChartProps, LegendPosition } from '@echarts-readymade/core';
export interface LineChartProps extends ChartProps {
    xAxisData?: any[];
    sortXAxis?: boolean;
    legendPosition?: LegendPosition;
}
export declare const Line: (props: LineChartProps) => React.JSX.Element | null;
