import React, { forwardRef } from 'react'
import type { ECharts } from 'echarts'
import { ChartContext } from '@echarts-readymade/core'
import { Pie as PieChart } from '@echarts-readymade/pie'
import type { PieChartProps } from '@echarts-readymade/pie'

export interface IPieChartProps extends Omit<PieChartProps, 'context'> {}

export const Pie = forwardRef<
  {
    getEchartsInstance: () => ECharts | undefined
  },
  IPieChartProps
>((props, ref) => {
  return <PieChart ref={ref} context={ChartContext} {...props} />
})
