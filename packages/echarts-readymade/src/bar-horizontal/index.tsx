import React, { forwardRef } from 'react'
import type { ECharts } from 'echarts'
import { ChartContext } from '@echarts-readymade/core'
import { BarHorizontal as BarHorizontalChart } from '@echarts-readymade/bar-horizontal'
import type { BarHorizontalChartProps } from '@echarts-readymade/bar-horizontal'

export interface IBarHorizontalChartProps extends Omit<BarHorizontalChartProps, 'context'> {}

export const BarHorizontal = forwardRef<
  {
    getEchartsInstance: () => ECharts | undefined
  },
  IBarHorizontalChartProps
>((props, ref) => {
  return <BarHorizontalChart ref={ref} context={ChartContext} {...props} />
})
