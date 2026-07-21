import React from 'react';
import type { ScatterChartProps } from '@echarts-readymade/scatter';
export interface IScatterChartProps extends Omit<ScatterChartProps, 'context'> {
}
export declare const Scatter: ({ ref, ...props }: IScatterChartProps) => React.JSX.Element;
