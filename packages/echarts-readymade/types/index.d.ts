import * as React from 'react';
import React__default from 'react';
import * as echarts_types_dist_echarts from 'echarts/types/dist/echarts';
export { COLOR_LIST, ChartContext, ChartProps, ChartProvider, Field, LegendPosition, buildChartOption, mergeOption, numberWithCommas, truncate } from '@echarts-readymade/core';
import { ECharts } from 'echarts';
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
declare const Bar: React__default.ForwardRefExoticComponent<IBarChartProps & React__default.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

interface ILineChartProps extends Omit<LineChartProps, 'context'> {
}
declare const Line: React__default.ForwardRefExoticComponent<ILineChartProps & React__default.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

interface IPieChartProps extends Omit<PieChartProps, 'context'> {
}
declare const Pie: React__default.ForwardRefExoticComponent<IPieChartProps & React__default.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

interface IScatterChartProps extends Omit<ScatterChartProps, 'context'> {
}
declare const Scatter: React__default.ForwardRefExoticComponent<IScatterChartProps & React__default.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

interface IStackChartProps extends Omit<StackChartProps, 'context'> {
}
declare const Stack: React__default.ForwardRefExoticComponent<IStackChartProps & React__default.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

interface IWordcloudChartProps extends Omit<WordcloudChartProps, 'context'> {
}
declare const Wordcloud: React__default.FC<IWordcloudChartProps>;

interface IBarHorizontalChartProps extends Omit<BarHorizontalChartProps, 'context'> {
}
declare const BarHorizontal: React__default.ForwardRefExoticComponent<IBarHorizontalChartProps & React__default.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

interface ITableChartProps extends Omit<TableChartProps, 'context'> {
}
declare const Table: React__default.FC<ITableChartProps>;

declare const _default: {
    Bar: React.ForwardRefExoticComponent<IBarChartProps & React.RefAttributes<{
        getEchartsInstance: () => echarts_types_dist_echarts.ECharts | undefined;
    }>>;
    Line: React.ForwardRefExoticComponent<ILineChartProps & React.RefAttributes<{
        getEchartsInstance: () => echarts_types_dist_echarts.ECharts | undefined;
    }>>;
    Pie: React.ForwardRefExoticComponent<IPieChartProps & React.RefAttributes<{
        getEchartsInstance: () => echarts_types_dist_echarts.ECharts | undefined;
    }>>;
    Scatter: React.ForwardRefExoticComponent<IScatterChartProps & React.RefAttributes<{
        getEchartsInstance: () => echarts_types_dist_echarts.ECharts | undefined;
    }>>;
    Stack: React.ForwardRefExoticComponent<IStackChartProps & React.RefAttributes<{
        getEchartsInstance: () => echarts_types_dist_echarts.ECharts | undefined;
    }>>;
    Wordcloud: React.FC<IWordcloudChartProps>;
    BarHorizontal: React.ForwardRefExoticComponent<IBarHorizontalChartProps & React.RefAttributes<{
        getEchartsInstance: () => echarts_types_dist_echarts.ECharts | undefined;
    }>>;
    Table: React.FC<ITableChartProps>;
};

export { Bar, BarHorizontal, IBarChartProps, IBarHorizontalChartProps, ILineChartProps, IPieChartProps, IScatterChartProps, IStackChartProps, ITableChartProps, IWordcloudChartProps, Line, Pie, Scatter, Stack, Table, Wordcloud, _default as default };
