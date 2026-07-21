import React from 'react';
import type { ChartProps } from '@echarts-readymade/core';
import './types';
export type WordcloudShape = 'mask-joy' | 'mask-great' | 'mask-bad' | 'mask-oval' | 'mask-rect' | 'mask-cloud' | 'mask-circle' | 'mask-diamond';
export interface WordcloudOptions extends Omit<WordCloudTypes.Options, 'shape'> {
    shrinkToFit?: boolean;
    shape?: WordcloudShape | string | ((theta: number) => number) | undefined;
}
export interface WordcloudChartProps extends Omit<ChartProps, 'compareDimension' | 'echartsSeries' | 'setOption'> {
    colorList?: string[];
    fontSizeMode?: 'bySort' | 'byValue';
    shape?: WordcloudShape | string;
    wordcloudOptions?: WordcloudOptions;
    wordcloudStop?: () => void;
    setWordcloudOption?: <T>(list: any[]) => T[];
}
export declare const Wordcloud: React.FC<WordcloudChartProps>;
export interface IPosition {
    top: number;
    left: number;
    width: number;
    height: number;
}
export interface IKeywordValueCompProps {
    ref: React.Ref<any>;
    position: IPosition;
    value: string;
    visible: boolean;
}
