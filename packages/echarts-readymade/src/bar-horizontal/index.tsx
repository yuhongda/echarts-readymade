import React from 'react'
import { ChartContext } from '@echarts-readymade/core'
import { BarHorizontal as BarHorizontalChart } from '@echarts-readymade/bar-horizontal'
import type { BarHorizontalChartProps } from '@echarts-readymade/bar-horizontal'

export interface IBarHorizontalChartProps extends Omit<BarHorizontalChartProps, 'context'> {}

export const BarHorizontal: React.FC<IBarHorizontalChartProps> = (props) => {
  return <BarHorizontalChart context={ChartContext} {...props} />
}
