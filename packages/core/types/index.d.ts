import * as React from 'react';
import React__default from 'react';
import { EChartsReactProps, EChartsOption } from 'echarts-for-react';

interface ChartContextValue<T = any> {
    data?: T[];
    echartsOptions?: EChartsReactProps;
    echartsOptionsBase?: EChartsOption;
    userOptions?: EChartsOption;
}
declare const ChartContext: React__default.Context<ChartContextValue<any>>;
interface ChartProviderProps<T = any> extends Omit<ChartContextValue<T>, 'echartsOptionsBase' | 'userOptions'> {
}
declare const ChartProvider: React__default.FC<ChartProviderProps>;

declare const mergeOption: (baseOptions: EChartsOption, userOptions?: EChartsOption) => EChartsOption;

declare type ChartSettings = {
    legendPosition?: 'top' | 'right' | 'bottom' | 'left';
};
declare type ChartType = 'line' | 'bar' | 'pie' | 'stack' | 'line-stack' | 'line-bar' | 'bar-horizontal' | 'table' | 'high-relation-scatter' | 'map' | 'wordcloud' | 'scatter-quadrant';
declare const buildChartOption: (chartOptions: EChartsOption, settings: ChartSettings, chartType: ChartType) => any;

declare type LegendPosition = 'top' | 'left' | 'right' | 'bottom';
declare type Field = {
    fieldKey: string;
    fieldName: string;
    yAxisIndex?: number;
    isPercent?: boolean;
    decimalLength?: number;
};
declare type ChartProps = {
    dimension: Field[];
    valueList: Field[];
    echartsSeries?: any[];
    xAxisData?: any;
};

declare const _default: {
    ChartProvider: React.FC<ChartProviderProps<any>>;
    ChartContext: React.Context<ChartContextValue<any>>;
    mergeOption: (baseOptions: any, userOptions?: any) => any;
    buildChartOption: (chartOptions: any, settings: {
        legendPosition?: "top" | "left" | "right" | "bottom" | undefined;
    }, chartType: "line" | "bar" | "pie" | "stack" | "line-stack" | "line-bar" | "bar-horizontal" | "table" | "high-relation-scatter" | "map" | "wordcloud" | "scatter-quadrant") => any;
};

export { ChartContext, ChartProps, ChartProvider, Field, LegendPosition, buildChartOption, _default as default, mergeOption };
