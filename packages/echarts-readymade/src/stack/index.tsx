import React, { forwardRef } from 'react'
import type { ECharts } from 'echarts'
import { ChartContext } from '@echarts-readymade/core'
import { Stack as StackChart } from '@echarts-readymade/stack'
import type { StackChartProps } from '@echarts-readymade/stack'

export interface IStackChartProps extends Omit<StackChartProps, 'context'> {}

export const Stack = ({ref, ...props}: IStackChartProps) => {
  return <StackChart ref={ref} context={ChartContext} {...props} />
}
