import React from 'react'
import type { EChartsReactProps, EChartsOption } from 'echarts-for-react'
import { echartsOptionsBase, mergeOption } from './misc'

export interface ChartContextValue<T = any> {
  data?: T[]
  echartsOptions?: EChartsReactProps
  chartOption?: EChartsOption
}

export const ChartContext = React.createContext<ChartContextValue>({})
const { Provider } = ChartContext

export interface ChartProviderProps<T = any> extends Omit<ChartContextValue<T>, 'chartOptions'> {}

export const ChartProvider: React.FC<ChartProviderProps> = (props) => {
  const { data, echartsOptions } = props
  const { option: userOptions } = echartsOptions || {}

  const chartOption = mergeOption(echartsOptionsBase, userOptions)

  return <Provider value={{ data, echartsOptions, chartOption }}>{props.children}</Provider>
}
