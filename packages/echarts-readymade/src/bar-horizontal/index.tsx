import * as React from 'react'
import { ChartContext } from '@echarts-readymade/core'
import { BarHorizontal as BarHorizontalChart } from '@echarts-readymade/bar-horizontal'
import type { BarHorizontalChartProps } from '@echarts-readymade/bar-horizontal'

export interface IBarHorizontalChartProps extends Omit<BarHorizontalChartProps, 'context'> {}

export const BarHorizontal = ({ref, ...props}: IBarHorizontalChartProps) => {
  return <BarHorizontalChart ref={ref} context={ChartContext} {...props} />
}
