import React from 'react';
import { ChartProps } from '@echarts-readymade/core';

declare type LegendPosition = 'top' | 'left' | 'right' | 'bottom';
interface LineChartProps extends ChartProps {
    legendPosition?: LegendPosition;
}
declare const Bar: React.FC<LineChartProps>;

export { Bar, LegendPosition };
