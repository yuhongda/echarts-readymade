import React from 'react';
import type { BarChartProps } from '@echarts-readymade/bar';
export interface IBarChartProps extends Omit<BarChartProps, 'context'> {
}
export declare const Bar: ({ ref, ...props }: IBarChartProps) => React.JSX.Element;
