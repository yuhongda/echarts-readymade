import { ChartProvider, ChartContext } from './ChartProvider'
import { mergeOption, numberWithCommas, COLOR_LIST } from './misc'
import { buildChartOption } from './chartOptionBuilder'

type LegendPosition = 'top' | 'left' | 'right' | 'bottom'

type Field = {
  fieldKey: string
  fieldName: string
  yAxisIndex?: number
  isPercent?: boolean
  decimalLength?: number
}

type ChartProps = {
  dimension?: Field[]
  compareDimension?: Field[]
  valueList?: Field[]
  echartsSeries?: any[]
}

export type { LegendPosition, Field, ChartProps }
export { ChartProvider, ChartContext, mergeOption, buildChartOption, numberWithCommas, COLOR_LIST }
export default { ChartProvider, ChartContext, mergeOption, buildChartOption, numberWithCommas, COLOR_LIST }
