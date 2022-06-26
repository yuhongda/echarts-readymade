import * as React from 'react';
import React__default, { ReactNode } from 'react';
import { EChartsReactProps, EChartsOption } from 'echarts-for-react';

interface ChartContextValue<T = any> {
    data?: T[];
    echartsOptions?: EChartsReactProps;
    echartsOptionsBase?: EChartsOption;
    userOptions?: EChartsOption;
}
declare const ChartContext: React__default.Context<ChartContextValue<any>>;
interface ChartProviderProps<T = any> extends Omit<ChartContextValue<T>, 'echartsOptionsBase' | 'userOptions'> {
    children: ReactNode;
}
declare const ChartProvider: React__default.FC<ChartProviderProps>;

declare const COLOR_LIST: string[];
declare const mergeOption: (baseOptions: EChartsOption, userOptions?: EChartsOption) => EChartsOption;
declare const truncate: (str: string, n: number) => string;
declare function numberWithCommas(x: string | number): string;

declare type ChartSettings = {
    legendPosition?: 'top' | 'right' | 'bottom' | 'left';
};
declare type ChartType = 'line' | 'bar' | 'pie' | 'stack' | 'line-stack' | 'line-bar' | 'bar-horizontal' | 'table' | 'high-relation-scatter' | 'map' | 'wordcloud' | 'scatter';
declare const buildChartOption: (chartOptions: EChartsOption, settings: ChartSettings, chartType: ChartType) => EChartsOption;

declare type LegendPosition = 'top' | 'left' | 'right' | 'bottom';
declare type SeriesType = 'line' | 'bar' | 'pie' | 'scatter';
declare type Field = {
    fieldKey: string;
    fieldName: string;
    type?: SeriesType;
    yAxisIndex?: number;
    isPercent?: boolean;
    decimalLength?: number;
    width?: number;
};
interface ChartProps extends Omit<EChartsReactProps, 'option'> {
    context: typeof ChartContext;
    dimension?: Field[];
    compareDimension?: Field[];
    valueList?: Field[];
    echartsSeries?: any[];
    setOption?: (option: EChartsOption) => EChartsOption;
}

declare const _default: {
    ChartProvider: React.FC<ChartProviderProps<any>>;
    ChartContext: React.Context<ChartContextValue<any>>;
    mergeOption: (baseOptions: any, userOptions?: any) => any;
    buildChartOption: (chartOptions: any, settings: {
        legendPosition?: "top" | "left" | "right" | "bottom" | undefined;
    }, chartType: "line" | "bar" | "pie" | "scatter" | "stack" | "line-stack" | "line-bar" | "bar-horizontal" | "table" | "high-relation-scatter" | "map" | "wordcloud") => any;
    numberWithCommas: typeof numberWithCommas;
    COLOR_LIST: string[];
    truncate: (str: string, n: number) => string;
};

export { COLOR_LIST, ChartContext, ChartProps, ChartProvider, Field, LegendPosition, buildChartOption, _default as default, mergeOption, numberWithCommas, truncate };
