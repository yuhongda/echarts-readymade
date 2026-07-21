import type { EChartsOption } from 'echarts-for-react';
export declare const COLOR_LIST: string[];
export declare const echartsOptionsBase: any;
export declare const mergeOption: (baseOptions: EChartsOption, userOptions?: EChartsOption) => EChartsOption;
export declare const truncate: (str: string, n: number) => string;
export declare function numberWithCommas(x: string | number): string;
