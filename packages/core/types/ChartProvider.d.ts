import React from 'react';
import type { ReactNode } from 'react';
import type { EChartsReactProps, EChartsOption } from 'echarts-for-react';
export interface ChartContextValue<T = any> {
    data?: T[];
    echartsOptions?: EChartsReactProps;
    echartsOptionsBase?: EChartsOption;
    userOptions?: EChartsOption;
}
export declare const ChartContext: React.Context<ChartContextValue<any>>;
export interface ChartProviderProps<T = any> extends Omit<ChartContextValue<T>, 'echartsOptionsBase' | 'userOptions'> {
    children: ReactNode;
}
export declare const ChartProvider: React.FC<ChartProviderProps>;
