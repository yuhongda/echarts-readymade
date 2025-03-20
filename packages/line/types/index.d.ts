import React from 'react';
import { ChartProps, LegendPosition } from '@echarts-readymade/core';

interface LineChartProps extends ChartProps {
    xAxisData?: any[];
    sortXAxis?: boolean;
    legendPosition?: LegendPosition;
}
declare const Line: (props: LineChartProps) => React.JSX.Element | null;

export { Line, LineChartProps };
