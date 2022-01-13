import React from 'react'
import { ChartContext } from '@echarts-readymade/core'
import { Pie as PieChart } from '@echarts-readymade/pie'
import type { PieChartProps } from '@echarts-readymade/pie'

export interface IPieChartProps extends Omit<PieChartProps, 'context'> {}

export const Pie: React.FC<IPieChartProps> = (props) => {
  return <PieChart context={ChartContext} {...props} />
}
