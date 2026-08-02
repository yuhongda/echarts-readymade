import * as React from 'react'
import { ChartContext } from '@echarts-readymade/core'
import { Pie as PieChart } from '@echarts-readymade/pie'
import type { PieChartProps } from '@echarts-readymade/pie'

export interface IPieChartProps extends Omit<PieChartProps, 'context'> {}

export const Pie = ({ref, ...props}: IPieChartProps) => {
  return <PieChart ref={ref} context={ChartContext} {...props} />
}
