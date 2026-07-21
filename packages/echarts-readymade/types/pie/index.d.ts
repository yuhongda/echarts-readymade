import React from 'react';
import type { PieChartProps } from '@echarts-readymade/pie';
export interface IPieChartProps extends Omit<PieChartProps, 'context'> {
}
export declare const Pie: ({ ref, ...props }: IPieChartProps) => React.JSX.Element;
