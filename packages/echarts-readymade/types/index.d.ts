import * as React from 'react';
import React__default from 'react';
import { WordcloudChartProps } from '@echarts-readymade/wordcloud';
import { ECharts } from 'echarts';
import { StackChartProps } from '@echarts-readymade/stack';
import { ScatterChartProps } from '@echarts-readymade/scatter';
import { PieChartProps } from '@echarts-readymade/pie';
import { LineChartProps } from '@echarts-readymade/line';
import * as echarts_types_dist_echarts from 'echarts/types/dist/echarts';
import { BarChartProps } from '@echarts-readymade/bar';
export * from '@echarts-readymade/core';

interface IWordcloudChartProps extends Omit<WordcloudChartProps, 'context'> {
}
declare const Wordcloud: React__default.FC<IWordcloudChartProps>;

interface IStackChartProps extends Omit<StackChartProps, 'context'> {
}
declare const Stack: React__default.ForwardRefExoticComponent<IStackChartProps & React__default.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

interface IScatterChartProps extends Omit<ScatterChartProps, 'context'> {
}
declare const Scatter: React__default.ForwardRefExoticComponent<IScatterChartProps & React__default.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

interface IPieChartProps extends Omit<PieChartProps, 'context'> {
}
declare const Pie: React__default.ForwardRefExoticComponent<IPieChartProps & React__default.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

interface ILineChartProps extends Omit<LineChartProps, 'context'> {
}
declare const Line: React__default.ForwardRefExoticComponent<ILineChartProps & React__default.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

interface IBarChartProps extends Omit<BarChartProps, 'context'> {
}
declare const Bar: React__default.ForwardRefExoticComponent<IBarChartProps & React__default.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

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
};

export { Bar, Line, Pie, Scatter, Stack, Wordcloud, _default as default };
