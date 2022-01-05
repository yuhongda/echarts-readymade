import React, { useContext } from 'react'
import type { ChartProps } from '@echarts-readymade/core'
import ReactEcharts from 'echarts-for-react'
import { ChartContext } from '@echarts-readymade/core'

interface LineChartProps extends ChartProps {}

export const Line: React.FC<LineChartProps> = (props) => {
  const { data, echartsOptions } = useContext(ChartContext)
  const { dimension, valueList } = props

  return (
    <>
      <ReactEcharts
        option={{}}
        notMerge={true}
        opts={{ renderer: 'svg' }}
        style={{ height: '100%', width: '100%' }}
      />
    </>
  )
}
