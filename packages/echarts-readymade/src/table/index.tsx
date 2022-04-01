import React from 'react'
import { ChartContext } from '@echarts-readymade/core'
import { Table as TableChart } from '@echarts-readymade/table'
import type { TableChartProps } from '@echarts-readymade/table'

export interface ITableChartProps extends Omit<TableChartProps, 'context'> {}

export const Table: React.FC<ITableChartProps> = (props) => {
  return <TableChart context={ChartContext} {...props} />
}
