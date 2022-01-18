import * as React from 'react';
import React__default from 'react';
import { ChartProps } from '@echarts-readymade/core';
export * from '@echarts-readymade/core';
import { StackChartProps } from '@echarts-readymade/stack';
import { ScatterChartProps } from '@echarts-readymade/scatter';
import { PieChartProps } from '@echarts-readymade/pie';
import { LineChartProps } from '@echarts-readymade/line';
import { BarChartProps } from '@echarts-readymade/bar';

declare type WordcloudShape = 'mask-joy' | 'mask-great' | 'mask-bad' | 'mask-oval' | 'mask-rect' | 'mask-cloud' | 'mask-circle' | 'mask-diamond';
interface WordcloudOptions extends Omit<WordCloudTypes.Options, 'shape'> {
    shrinkToFit?: boolean;
    shape?: WordcloudShape | string | ((theta: number) => number) | undefined;
}
interface WordcloudChartProps extends Omit<ChartProps, 'compareDimension' | 'echartsSeries' | 'setOption'> {
    colorList?: string[];
    fontSizeMode?: 'bySort' | 'byValue';
    shape?: WordcloudShape | string;
    wordcloudOptions?: WordcloudOptions;
}

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
declare const Bar: React__default.FC<IBarChartProps>;

declare const _default: {
    Bar: React.FC<IBarChartProps>;
    Line: React.FC<ILineChartProps>;
    Pie: React.FC<IPieChartProps>;
    Scatter: React.FC<IScatterChartProps>;
    Stack: React.FC<IStackChartProps>;
    Wordcloud: React.FC<IWordcloudChartProps>;
};

export { Bar, Line, Pie, Scatter, Stack, Wordcloud, _default as default };
