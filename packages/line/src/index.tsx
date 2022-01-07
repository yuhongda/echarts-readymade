import React, { useContext } from 'react'
import { multiply, round } from 'mathjs/number'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import type { ChartProps } from '@echarts-readymade/core'
import { ChartContext } from '../../../packages/core/src/ChartProvider'
import { LineChart } from 'echarts/charts'
import {
  GridSimpleComponent,
  GridComponent,
  SingleAxisComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  BrushComponent,
  TitleComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
  LegendScrollComponent,
  LegendPlainComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
  TransformComponent,
  DatasetComponent
} from 'echarts/components'

import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'

echarts.use([
  LineChart,
  CanvasRenderer,
  SVGRenderer,
  GridSimpleComponent,
  GridComponent,
  SingleAxisComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  BrushComponent,
  TitleComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
  LegendScrollComponent,
  LegendPlainComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
  TransformComponent,
  DatasetComponent
])

interface LineChartProps extends ChartProps {}

export const Line: React.FC<LineChartProps> = (props) => {
  const { data, echartsOptions, chartOption } = useContext(ChartContext)
  const { option, ...resetOptions } = echartsOptions || {}
  const { dimension, valueList } = props

  chartOption.xAxis.data =
    data &&
    data.map((d) => {
      const value = d[dimension && dimension[0] && dimension[0].fieldKey]
      if (value != null) {
        return `${value}月`
      }
    })
  chartOption.series = valueList.map((v) => {
    return {
      name: v.fieldName,
      type: 'line',
      barWidth: 30,
      barGap: 0,
      lineStyle: {
        shadowColor: 'rgba(0,0,0,0.15)',
        shadowBlur: 3,
        shadowOffsetX: 0,
        shadowOffsetY: 1
      },
      data:
        data &&
        data.map((d) => {
          if (d[v.fieldKey] != null) {
            let result = d[v.fieldKey]
            if (v.isPercent) {
              result = multiply(d[v.fieldKey], 100)
            }
            return {
              value: round(result, v.decimalLength || 0),
              isPercent: v.isPercent
            }
          }
          return {
            value: 0,
            isPercent: v.isPercent
          }
        }),
      yAxisIndex: v.yAxisIndex || 0
    }
  })
  console.log(data, echartsOptions, chartOption)

  const reactEchartsOptions = echartsOptions

  return (
    <>
      <ReactEChartsCore
        echarts={echarts}
        option={{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
            }
          ]
        }}
        notMerge={true}
        opts={{ renderer: 'svg' }}
        style={{ height: '100%', width: '100%' }}
        {...resetOptions}
      />
    </>
  )
}
