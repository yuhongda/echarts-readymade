import React from 'react'
import { ChartContext } from '@echarts-readymade/core'
import { Bar as BarChart } from '@echarts-readymade/bar'
import type { BarChartProps } from '@echarts-readymade/bar'

export interface IBarChartProps extends Omit<BarChartProps, 'context'> {}

export const Bar: React.FC<IBarChartProps> = (props) => {
  return <BarChart context={ChartContext} {...props} />
}
