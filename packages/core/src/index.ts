import { ChartProvider, ChartContext } from './ChartProvider'
import { mergeOption, numberWithCommas, COLOR_LIST, truncate } from './misc'
import { buildChartOption } from './chartOptionBuilder'
import type { EChartsOption } from 'echarts-for-react'

type LegendPosition = 'top' | 'left' | 'right' | 'bottom'

type Field = {
  fieldKey: string
  fieldName: string
  yAxisIndex?: number
  isPercent?: boolean
  decimalLength?: number
}

type ChartProps = {
  context: typeof ChartContext
  dimension?: Field[]
  compareDimension?: Field[]
  valueList?: Field[]
  echartsSeries?: any[]
  setOption?: (option: EChartsOption) => EChartsOption
}

export type { LegendPosition, Field, ChartProps }
export {
  ChartProvider,
  ChartContext,
  mergeOption,
  buildChartOption,
  numberWithCommas,
  COLOR_LIST,
  truncate
}
export default {
  ChartProvider,
  ChartContext,
  mergeOption,
  buildChartOption,
  numberWithCommas,
  COLOR_LIST,
  truncate
}
