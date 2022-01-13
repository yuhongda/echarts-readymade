import React from 'react'
import { ChartContext } from '@echarts-readymade/core'
import { Stack as StackChart } from '@echarts-readymade/stack'
import type { StackChartProps } from '@echarts-readymade/stack'

export interface IStackChartProps extends Omit<StackChartProps, 'context'> {}

export const Stack: React.FC<IStackChartProps> = (props) => {
  return <StackChart context={ChartContext} {...props} />
}
