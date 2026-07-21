import React from 'react';
import type { BarHorizontalChartProps } from '@echarts-readymade/bar-horizontal';
export interface IBarHorizontalChartProps extends Omit<BarHorizontalChartProps, 'context'> {
}
export declare const BarHorizontal: ({ ref, ...props }: IBarHorizontalChartProps) => React.JSX.Element;
