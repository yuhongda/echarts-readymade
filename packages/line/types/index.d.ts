import React from 'react';
import { ChartProps, LegendPosition } from '@echarts-readymade/core';

interface LineChartProps extends ChartProps {
    xAxisData?: any[];
    legendPosition?: LegendPosition;
}
declare const Line: React.FC<LineChartProps>;

export { Line, LineChartProps };
