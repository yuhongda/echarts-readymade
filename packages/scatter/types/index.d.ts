import React from 'react';
import { ChartProps, LegendPosition } from '@echarts-readymade/core';

interface ScatterChartProps extends ChartProps {
    /**
     * 图例位置
     */
    legendPosition?: LegendPosition;
}
declare const Scatter: React.FC<ScatterChartProps>;

export { Scatter, ScatterChartProps };
