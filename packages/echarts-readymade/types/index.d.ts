import * as React from 'react';
import React__default from 'react';
export { COLOR_LIST, ChartContext, ChartProps, ChartProvider, Field, LegendPosition, buildChartOption, mergeOption, numberWithCommas, truncate } from '@echarts-readymade/core';
import { BarChartProps } from '@echarts-readymade/bar';
import { LineChartProps } from '@echarts-readymade/line';
import { PieChartProps } from '@echarts-readymade/pie';
import { ScatterChartProps } from '@echarts-readymade/scatter';
import { StackChartProps } from '@echarts-readymade/stack';
import { WordcloudChartProps } from '@echarts-readymade/wordcloud';
import { BarHorizontalChartProps } from '@echarts-readymade/bar-horizontal';
import { TableChartProps } from '@echarts-readymade/table';

interface IBarChartProps extends Omit<BarChartProps, 'context'> {
}
declare const Bar: ({ ref, ...props }: IBarChartProps) => React__default.JSX.Element;

interface ILineChartProps extends Omit<LineChartProps, 'context'> {
}
declare const Line: ({ ref, ...props }: ILineChartProps) => React__default.JSX.Element;

interface IPieChartProps extends Omit<PieChartProps, 'context'> {
}
declare const Pie: ({ ref, ...props }: IPieChartProps) => React__default.JSX.Element;

interface IScatterChartProps extends Omit<ScatterChartProps, 'context'> {
}
declare const Scatter: ({ ref, ...props }: IScatterChartProps) => React__default.JSX.Element;

interface IStackChartProps extends Omit<StackChartProps, 'context'> {
}
declare const Stack: ({ ref, ...props }: IStackChartProps) => React__default.JSX.Element;

interface IWordcloudChartProps extends Omit<WordcloudChartProps, 'context'> {
}
declare const Wordcloud: React__default.FC<IWordcloudChartProps>;

interface IBarHorizontalChartProps extends Omit<BarHorizontalChartProps, 'context'> {
}
declare const BarHorizontal: ({ ref, ...props }: IBarHorizontalChartProps) => React__default.JSX.Element;

interface ITableChartProps extends Omit<TableChartProps, 'context'> {
}
declare const Table: React__default.FC<ITableChartProps>;

declare const _default: {
    Bar: ({ ref, ...props }: IBarChartProps) => React.JSX.Element;
    Line: ({ ref, ...props }: ILineChartProps) => React.JSX.Element;
    Pie: ({ ref, ...props }: IPieChartProps) => React.JSX.Element;
    Scatter: ({ ref, ...props }: IScatterChartProps) => React.JSX.Element;
    Stack: ({ ref, ...props }: IStackChartProps) => React.JSX.Element;
    Wordcloud: React.FC<IWordcloudChartProps>;
    BarHorizontal: ({ ref, ...props }: IBarHorizontalChartProps) => React.JSX.Element;
    Table: React.FC<ITableChartProps>;
};

export { Bar, BarHorizontal, IBarChartProps, IBarHorizontalChartProps, ILineChartProps, IPieChartProps, IScatterChartProps, IStackChartProps, ITableChartProps, IWordcloudChartProps, Line, Pie, Scatter, Stack, Table, Wordcloud, _default as default };
