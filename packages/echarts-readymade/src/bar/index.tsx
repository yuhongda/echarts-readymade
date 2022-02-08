import React, { forwardRef } from 'react'
import type { ECharts } from 'echarts'
import { ChartContext } from '@echarts-readymade/core'
import { Bar as BarChart } from '@echarts-readymade/bar'
import type { BarChartProps } from '@echarts-readymade/bar'

export interface IBarChartProps extends Omit<BarChartProps, 'context'> {}

export const Bar = forwardRef<
  {
    getEchartsInstance: () => ECharts | undefined
  },
  IBarChartProps
>((props, ref) => {
  return <BarChart ref={ref} context={ChartContext} {...props} />
})
