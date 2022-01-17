import React from 'react'
import { ChartContext } from '@echarts-readymade/core'
import { Wordcloud as WordcloudChart } from '../../../../packages/wordcloud/src/'
import type { WordcloudChartProps } from '@echarts-readymade/wordcloud'

export interface IWordcloudChartProps extends Omit<WordcloudChartProps, 'context'> {}

export const Wordcloud: React.FC<IWordcloudChartProps> = (props) => {
  return <WordcloudChart context={ChartContext} {...props} />
}
