import * as React from 'react';
import React__default from 'react';
import { StackChartProps } from '@echarts-readymade/stack';
import { ScatterChartProps } from '@echarts-readymade/scatter';
import { PieChartProps } from '@echarts-readymade/pie';
import { LineChartProps } from '@echarts-readymade/line';
import { BarChartProps } from '@echarts-readymade/bar';
export * from '@echarts-readymade/core';

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
};

export { Bar, Line, Pie, Scatter, Stack, _default as default };
