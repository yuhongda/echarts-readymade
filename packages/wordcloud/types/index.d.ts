import React from 'react';
import { ChartProps } from '@echarts-readymade/core';

declare type WordcloudShape = 'mask-joy' | 'mask-great' | 'mask-bad' | 'mask-oval' | 'mask-rect' | 'mask-cloud';
interface WordcloudOptions extends Omit<WordCloudTypes.Options, 'shape'> {
    shrinkToFit?: boolean;
    shape?: WordcloudShape | string | ((theta: number) => number) | undefined;
}
interface WordcloudChartProps extends Omit<ChartProps, 'compareDimension' | 'echartsSeries' | 'setOption'> {
    colorList?: string[];
    fontSizeMode?: 'bySort' | 'byValue';
    wordcloudOptions?: WordcloudOptions;
}
declare const Wordcloud: React.FC<WordcloudChartProps>;
interface IPosition {
    top: number;
    left: number;
    width: number;
    height: number;
}
interface IKeywordValueCompProps {
    position: IPosition;
    value: string;
    visible: boolean;
}

export { IKeywordValueCompProps, IPosition, Wordcloud, WordcloudChartProps, WordcloudOptions, WordcloudShape };
