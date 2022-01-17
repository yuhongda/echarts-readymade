import React from 'react';
import { ChartProps } from '@echarts-readymade/core';

interface WordcloudChartProps extends Omit<ChartProps, 'compareDimension' | 'echartsSeries' | 'setOption'> {
}
declare const Wordcloud: React.FC<WordcloudChartProps>;

export { Wordcloud, WordcloudChartProps };
