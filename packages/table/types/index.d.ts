import React from 'react';
import type { ChartProps } from '@echarts-readymade/core';
export interface TableChartProps extends Omit<ChartProps, 'echartsSeries' | 'setOption'> {
    /**
     * @description ['边框和表头', '表头文字', '汇总列', '表格背景', '行hover背景', '表格字体']
     */
    colorList?: string[];
    showRank?: boolean;
    showSum?: boolean;
    hideDimensionCompareTitle?: boolean;
    blockWrapHeight?: number;
    antdOptions?: any;
    sortKey?: string;
    columnWidth?: number;
    setTableOption?: <T, K>(columns: any[], dataSource: any[]) => {
        columns: T[];
        dataSource: K[];
    };
}
export declare const Table: React.FC<TableChartProps>;
