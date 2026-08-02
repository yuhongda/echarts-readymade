import * as React from 'react'
import { ChartContext } from '@echarts-readymade/core'
import { Line as LineChart } from '@echarts-readymade/line'
import type { LineChartProps } from '@echarts-readymade/line'

export interface ILineChartProps extends Omit<LineChartProps, 'context'> {}

export const Line = ({ref, ...props}: ILineChartProps) => {
  return <LineChart ref={ref} context={ChartContext} {...props} />
}
