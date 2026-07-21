import React from 'react';
import type { StackChartProps } from '@echarts-readymade/stack';
export interface IStackChartProps extends Omit<StackChartProps, 'context'> {
}
export declare const Stack: ({ ref, ...props }: IStackChartProps) => React.JSX.Element;
