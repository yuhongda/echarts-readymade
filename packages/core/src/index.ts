import { ChartProvider, ChartContext } from './ChartProvider'
import { mergeOption, numberWithCommas, COLOR_LIST, truncate } from './misc'
import { buildChartOption } from './chartOptionBuilder'
import type { EChartsOption, EChartsReactProps } from 'echarts-for-react'

type LegendPosition = 'top' | 'left' | 'right' | 'bottom'
type SeriesType = 'line' | 'bar' | 'pie' | 'scatter'

type Field = {
  fieldKey: string
  fieldName: string
  type?: SeriesType
  yAxisIndex?: number
  isPercent?: boolean
  decimalLength?: number
  width?: number
}
interface ChartProps extends Omit<EChartsReactProps, 'option'> {
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
