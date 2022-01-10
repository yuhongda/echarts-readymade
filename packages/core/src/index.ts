import { ChartProvider, ChartContext } from './ChartProvider'
import { mergeOption } from './misc'
import { buildChartOption } from './chartOptionBuilder'

export type Field = {
  fieldKey: string
  fieldName: string
  yAxisIndex?: number
  isPercent?: boolean
  decimalLength?: number
}

export type ChartProps = {
  dimension: Field[]
  valueList: Field[]
  echartsSeries?: any[]
  xAxisData?: any
}

export { ChartProvider, ChartContext, mergeOption, buildChartOption }
export default { ChartProvider, ChartContext, mergeOption, buildChartOption }
