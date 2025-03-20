import React from 'react';
import { ChartProps, LegendPosition } from '@echarts-readymade/core';

interface BarChartProps extends ChartProps {
    xAxisData?: any[];
    sortXAxis?: boolean;
    legendPosition?: LegendPosition;
}
declare const Bar: (props: BarChartProps) => React.JSX.Element | null;

export { Bar, BarChartProps };
