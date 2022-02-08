import * as React from 'react';
import React__default from 'react';
import { WordcloudChartProps } from '@echarts-readymade/wordcloud';
import { StackChartProps } from '@echarts-readymade/stack';
import { ScatterChartProps } from '@echarts-readymade/scatter';
import { PieChartProps } from '@echarts-readymade/pie';
import { LineChartProps } from '@echarts-readymade/line';
import * as echarts_types_dist_echarts from 'echarts/types/dist/echarts';
import { ECharts } from 'echarts';
import { BarChartProps } from '@echarts-readymade/bar';
export * from '@echarts-readymade/core';

interface IWordcloudChartProps extends Omit<WordcloudChartProps, 'context'> {
}
declare const Wordcloud: React__default.FC<IWordcloudChartProps>;

interface IStackChartProps extends Omit<StackChartProps, 'context'> {
}
declare const Stack: React__default.FC<IStackChartProps>;

interface IScatterChartProps extends Omit<ScatterChartProps, 'context'> {
}
declare const Scatter: React__default.FC<IScatterChartProps>;

interface IPieChartProps extends Omit<PieChartProps, 'context'> {
}
declare const Pie: React__default.FC<IPieChartProps>;

interface ILineChartProps extends Omit<LineChartProps, 'context'> {
}
declare const Line: React__default.FC<ILineChartProps>;

interface IBarChartProps extends Omit<BarChartProps, 'context'> {
}
declare const Bar: React__default.ForwardRefExoticComponent<IBarChartProps & React__default.RefAttributes<{
    getEchartsInstance: () => ECharts | undefined;
}>>;

declare const _default: {
    Bar: React.ForwardRefExoticComponent<IBarChartProps & React.RefAttributes<{
        getEchartsInstance: () => echarts_types_dist_echarts.ECharts | undefined;
    }>>;
    Line: React.FC<ILineChartProps>;
    Pie: React.FC<IPieChartProps>;
    Scatter: React.FC<IScatterChartProps>;
    Stack: React.FC<IStackChartProps>;
    Wordcloud: React.FC<IWordcloudChartProps>;
};

export { Bar, Line, Pie, Scatter, Stack, Wordcloud, _default as default };
