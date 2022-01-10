import React from 'react'
import type { EChartsReactProps, EChartsOption } from 'echarts-for-react'
import { echartsOptionsBase } from './misc'

export interface ChartContextValue<T = any> {
  data?: T[]
  echartsOptions?: EChartsReactProps
  echartsOptionsBase?: EChartsOption
  userOptions?: EChartsOption
}

export const ChartContext = React.createContext<ChartContextValue>({})
const { Provider } = ChartContext

export interface ChartProviderProps<T = any>
  extends Omit<ChartContextValue<T>, 'echartsOptionsBase' | 'userOptions'> {}

export const ChartProvider: React.FC<ChartProviderProps> = (props) => {
  const { data, echartsOptions } = props
  const { option: userOptions } = echartsOptions || {}

  return (
    <Provider value={{ data, echartsOptions, echartsOptionsBase, userOptions }}>
      {props.children}
    </Provider>
  )
}
