import React from 'react';
import { ChartProps, LegendPosition } from '@echarts-readymade/core';

interface BarHorizontalChartProps extends ChartProps {
    yAxisData?: any[];
    legendPosition?: LegendPosition;
}
declare const BarHorizontal: React.FC<BarHorizontalChartProps>;

export { BarHorizontal, BarHorizontalChartProps };
