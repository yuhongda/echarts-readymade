import React from 'react';
import type { WordcloudChartProps } from '@echarts-readymade/wordcloud';
export interface IWordcloudChartProps extends Omit<WordcloudChartProps, 'context'> {
}
export declare const Wordcloud: React.FC<IWordcloudChartProps>;
