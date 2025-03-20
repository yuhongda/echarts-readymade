import React from 'react';
import { ChartProps, LegendPosition } from '@echarts-readymade/core';

interface PieChartProps extends ChartProps {
    showInRing?: boolean;
    legendPosition?: LegendPosition;
}
declare const Pie: (props: PieChartProps) => React.JSX.Element | null;

export { Pie, PieChartProps };
