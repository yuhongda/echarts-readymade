import React from 'react'
import type { EChartsReactProps } from 'echarts-for-react'

export interface ChartContextValue<T = any> {
  data?: T[]
  echartsOptions?: EChartsReactProps
}

export const ChartContext = React.createContext<ChartContextValue>({})
const { Provider } = ChartContext

export interface ChartProviderProps<T = any> extends ChartContextValue<T> {}

export const ChartProvider: React.FC<ChartProviderProps> = (props) => {
  return <Provider value={{ ...props }}>{props.children}</Provider>
}
