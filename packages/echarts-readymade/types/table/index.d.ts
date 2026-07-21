import React from 'react';
import type { TableChartProps } from '@echarts-readymade/table';
export interface ITableChartProps extends Omit<TableChartProps, 'context'> {
}
export declare const Table: React.FC<ITableChartProps>;
