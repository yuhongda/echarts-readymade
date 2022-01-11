import React, { useContext } from 'react'
import { multiply, round } from 'mathjs/number'
import { cloneDeep } from 'lodash'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import type { ChartProps } from '@echarts-readymade/core'
import { mergeOption, buildChartOption } from '../../../packages/core/src'
import { ChartContext } from '../../../packages/core/src/ChartProvider'
import { BarChart } from 'echarts/charts'
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
  BarChart,
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

export type LegendPosition = 'top' | 'left' | 'right' | 'bottom'

interface LineChartProps extends ChartProps {
  legendPosition?: LegendPosition
}

export const Bar: React.FC<LineChartProps> = (props) => {
  const {
    data,
    echartsOptions,
    echartsOptionsBase: chartOption,
    userOptions
  } = useContext(ChartContext)
  const { option, ...resetOptions } = echartsOptions || {}
  const { dimension, valueList, echartsSeries, xAxisData, ...restSettings } = props

  if (chartOption) {
    chartOption.xAxis.data =
      xAxisData ||
      (data &&
        data.map((d) => {
          const value = d[dimension && dimension[0] && dimension[0].fieldKey]
          if (value != null) {
            return `${value}`
          }
        }))
    chartOption.series =
      echartsSeries ||
      valueList.map((v) => {
        return {
          name: v.fieldName,
          type: 'bar',
          barMaxWidth: 60,
          barGap: 0,
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
  }

  const builtOption = buildChartOption(chartOption, restSettings, 'bar')
  const options = mergeOption(builtOption, userOptions)

  return (
    <>
      <ReactEChartsCore
        echarts={echarts}
        option={{ ...cloneDeep(options) }}
        notMerge={true}
        opts={{ renderer: 'svg' }}
        style={{ height: '100%', width: '100%' }}
        {...resetOptions}
      />
    </>
  )
}
