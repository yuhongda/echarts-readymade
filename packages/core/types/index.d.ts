import * as React from 'react';
import React__default, { CSSProperties } from 'react';

declare type EChartsOption = any;
declare type EChartsInstance = any;
declare type Opts = {
    readonly devicePixelRatio?: number;
    readonly renderer?: 'canvas' | 'svg';
    readonly width?: number | null | undefined | 'auto';
    readonly height?: number | null | undefined | 'auto';
    readonly locale?: string;
};
declare type EChartsReactProps = {
    /**
     * echarts library entry, use it for import necessary.
     */
    readonly echarts?: any;
    /**
     * `className` for container
     */
    readonly className?: string;
    /**
     * `style` for container
     */
    readonly style?: CSSProperties;
    /**
     * echarts option
     */
    readonly option: EChartsOption;
    /**
     * echarts theme config, can be:
     * 1. theme name string
     * 2. theme object
     */
    readonly theme?: string | Record<string, any>;
    /**
     * notMerge config for echarts, default is `false`
     */
    readonly notMerge?: boolean;
    /**
     * lazyUpdate config for echarts, default is `false`
     */
    readonly lazyUpdate?: boolean;
    /**
     * showLoading config for echarts, default is `false`
     */
    readonly showLoading?: boolean;
    /**
     * loadingOption config for echarts, default is `null`
     */
    readonly loadingOption?: any;
    /**
     * echarts opts config, default is `{}`
     */
    readonly opts?: Opts;
    /**
     * when after chart reander, do the callback widht echarts instance
     */
    readonly onChartReady?: (instance: EChartsInstance) => void;
    /**
     * bind events, default is `{}`
     */
    readonly onEvents?: Record<string, Function>;
    /**
     * should update echarts options
     */
    readonly shouldSetOption?: (prevProps: EChartsReactProps, props: EChartsReactProps) => boolean;
};

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
