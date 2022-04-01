import React from 'react';
import { ChartProps } from '@echarts-readymade/core';

interface TableChartProps extends Omit<ChartProps, 'echartsSeries' | 'setOption'> {
    /**
     * @description ['边框和表头颜色', '表头文字颜色', '汇总列颜色']
     */
    colorList?: string[];
    showRank?: boolean;
    showSum?: boolean;
    hideDimensionCompareTitle?: boolean;
    blockWrapHeight?: number;
    antdOptions?: any;
    sortKey?: string;
    columnWidth?: number;
}
declare const Table: React.FC<TableChartProps>;

export { Table, TableChartProps };
