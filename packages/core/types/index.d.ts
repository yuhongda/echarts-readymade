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
}
declare const ChartContext: React__default.Context<ChartContextValue<any>>;
interface ChartProviderProps<T = any> extends ChartContextValue<T> {
}
declare const ChartProvider: React__default.FC<ChartProviderProps>;

declare type Field = {
    fieldKey: string;
    fieldName: string;
    yAxixIndex?: number;
    isPercent?: boolean;
    decimalLength?: number;
};
declare type ChartProps = {
    dimension: Field[];
    valueList: Field[];
};

declare const _default: {
    ChartProvider: React.FC<ChartProviderProps<any>>;
    ChartContext: React.Context<ChartContextValue<any>>;
};

export { ChartContext, ChartProps, ChartProvider, Field, _default as default };
