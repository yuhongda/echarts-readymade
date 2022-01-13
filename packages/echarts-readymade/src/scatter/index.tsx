import React from 'react'
import { ChartContext } from '@echarts-readymade/core'
import { Scatter as ScatterChart } from '@echarts-readymade/scatter'
import type { ScatterChartProps } from '@echarts-readymade/scatter'

export interface IScatterChartProps extends Omit<ScatterChartProps, 'context'> {}

export const Scatter: React.FC<IScatterChartProps> = (props) => {
  return <ScatterChart context={ChartContext} {...props} />
}
