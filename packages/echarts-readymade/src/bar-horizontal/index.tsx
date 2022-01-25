import React from 'react'
import { ChartContext } from '@echarts-readymade/core'
import { BarHorizontal as BarHorizontalChart } from '../../../bar-horizontal/src'
import type { BarHorizontalChartProps } from '../../../bar-horizontal/src'

export interface IBarHorizontalChartProps extends Omit<BarHorizontalChartProps, 'context'> {}

export const BarHorizontal: React.FC<IBarHorizontalChartProps> = (props) => {
  return <BarHorizontalChart context={ChartContext} {...props} />
}
