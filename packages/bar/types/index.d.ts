import React from 'react';
import { ChartProps, LegendPosition } from '@echarts-readymade/core';

interface LineChartProps extends ChartProps {
    xAxisData?: any[];
    legendPosition?: LegendPosition;
}
declare const Bar: React.FC<LineChartProps>;

export { Bar };
