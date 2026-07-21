import React from 'react';
import type { LineChartProps } from '@echarts-readymade/line';
export interface ILineChartProps extends Omit<LineChartProps, 'context'> {
}
export declare const Line: ({ ref, ...props }: ILineChartProps) => React.JSX.Element;
