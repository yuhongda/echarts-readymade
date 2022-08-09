export * from '@echarts-readymade/core'
import { Bar } from './bar'
import { Line } from './line'
import { Pie } from './pie'
import { Scatter } from './scatter'
import { Stack } from './stack'
import { Wordcloud } from './wordcloud'
import { BarHorizontal } from './bar-horizontal'
import { Table } from './table'
import type { IWordcloudChartProps } from './wordcloud'
import type { ITableChartProps } from './table'
import type { IStackChartProps } from './stack'
import type { IScatterChartProps } from './scatter'
import type { IPieChartProps } from './pie'
import type { ILineChartProps } from './line'
import type { IBarChartProps } from './bar'
import type { IBarHorizontalChartProps } from './bar-horizontal'

export type {
  IWordcloudChartProps,
  ITableChartProps,
  IStackChartProps,
  IScatterChartProps,
  IPieChartProps,
  ILineChartProps,
  IBarChartProps,
  IBarHorizontalChartProps
}
export { Bar, Line, Pie, Scatter, Stack, Wordcloud, BarHorizontal, Table }
export default { Bar, Line, Pie, Scatter, Stack, Wordcloud, BarHorizontal, Table }
