import React from 'react'
import type { EChartsReactProps } from 'echarts-for-react'
import { echartsOptionsBase } from './misc'

export interface ChartContextValue<T = any> {
  data?: T[]
  echartsOptions?: EChartsReactProps
  echartsOptionsBase?: any
}

export const ChartContext = React.createContext<ChartContextValue>({})
const { Provider } = ChartContext

export interface ChartProviderProps<T = any> extends Omit<ChartContextValue<T>, 'echartsOptionsBase'> {
  // echartsLayout is just what echartsOpiotnsBase is, but it is better to understand for users.
  echartsLayout?: any
}

export const ChartProvider: React.FC<ChartProviderProps> = (props) => {
  const { data, echartsOptions, echartsLayout } = props

  return (
    <Provider
      value={{ data, echartsOptions, echartsOptionsBase: echartsLayout || echartsOptionsBase }}
    >
      {props.children}
    </Provider>
  )
}
