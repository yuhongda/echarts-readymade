import React from 'react';
import type { ChartProps, LegendPosition } from '@echarts-readymade/core';
export interface PieChartProps extends ChartProps {
    showInRing?: boolean;
    legendPosition?: LegendPosition;
}
export declare const Pie: (props: PieChartProps) => React.JSX.Element | null;
