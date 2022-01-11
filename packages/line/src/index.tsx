import React, { useContext, useState } from 'react'
import { multiply, round } from 'mathjs/number'
import { cloneDeep } from 'lodash'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import type { ChartProps, LegendPosition } from '@echarts-readymade/core'
import { mergeOption, buildChartOption } from '../../../packages/core/src'
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

interface LineChartProps extends ChartProps {
  xAxisData?: any[]
  legendPosition?: LegendPosition
}

export const Line: React.FC<LineChartProps> = (props) => {
  const {
    data,
    echartsOptions,
    echartsOptionsBase: chartOption,
    userOptions
  } = useContext(ChartContext)
  const { option, ...resetOptions } = echartsOptions || {}
  const { dimension, compareDimension, valueList, echartsSeries, xAxisData, ...restSettings } =
    props

  const _dimension = dimension && dimension.slice(0, 1)
  const _chartOption = chartOption || {}

  if (_chartOption) {
    let _xAxis = []
    const _preProcessData: any[] = []
    let _processData = []
    let compareDimensionValues = []
    if (compareDimension && compareDimension.length > 0) {
      // 对比维度全量值
      compareDimensionValues = [
        ...new Set(
          data?.map((d) => {
            return compareDimension
              .map((dim) => {
                return d[dim.fieldKey]
              })
              .join('~')
          })
        )
      ]
      compareDimensionValues = compareDimensionValues.filter((cdv) => {
        return !(cdv.startsWith('~') || cdv.endsWith('~'))
      })

      // 按维度分组
      data?.forEach((d) => {
        const _index = _preProcessData.findIndex(
          (item) => item.name == (_dimension && d[_dimension?.[0].fieldKey])
        )
        if (_index != -1) {
          _preProcessData[_index].data.push(d)
        } else {
          _preProcessData.push({
            name: _dimension && d[_dimension?.[0].fieldKey],
            data: [d]
          })
        }
      })

      // 在维度分组基础上，分组对比维度
      _processData = compareDimensionValues.map((item) => {
        return {
          name: item,
          data: _preProcessData.map((pd) => {
            const v = pd.data.find(
              (d: any) =>
                compareDimension
                  .map((dim) => {
                    return d[dim.fieldKey]
                  })
                  .join('~') == item
            )

            if (v) {
              return v
            } else {
              const _v: { [key: string]: any } = {}
              if (_dimension && _dimension[0]) {
                _v[_dimension[0].fieldKey] = pd.name
              }
              return _v
            }
          })
        }
      })

      // X轴数据
      let _data = [
        ...new Set(
          data?.map((d) => {
            return _dimension && d[_dimension[0].fieldKey]
          })
        )
      ]

      _xAxis = [
        {
          type: 'category',
          splitLine: {
            show: false,
            lineStyle: {}
          },
          axisLine: {
            show: true,
            lineStyle: {}
          },
          axisTick: {
            show: true,
            lineStyle: {}
          },
          axisLabel: {
            padding: [0, 0, 0, 0],
            rotate: 30
          },
          data: _data
        }
      ]

      // Y轴数据
      let _seriesValueList: any[] = []
      for (let i = 0; i < _processData.length; i++) {
        let _data = cloneDeep(_processData[i].data) || []
        let compareDimensionName = `${_processData[i].name}`

        valueList?.forEach((v) => {
          _seriesValueList.push({
            name:
              valueList.length > 1
                ? `${compareDimensionName}~${v.fieldName}`
                : compareDimensionName,
            type: 'line',
            barGap: 0,
            barMaxWidth: 60,
            lineStyle: {
              shadowColor: 'rgba(0,0,0,0.15)',
              shadowBlur: 3,
              shadowOffsetX: 0,
              shadowOffsetY: 1
            },
            data: _data.map((d) => {
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
          })
        })
      }
      _chartOption.xAxis = _xAxis
      _chartOption.series = _seriesValueList
    } else {
      // 无对比维度
      _chartOption.xAxis.data =
        xAxisData ||
        (data &&
          data.map((d) => {
            const value = dimension && d[dimension?.[0]?.fieldKey]
            if (value != null) {
              return `${value}`
            }
          }))
      _chartOption.series =
        echartsSeries ||
        valueList?.map((v) => {
          return {
            name: v.fieldName,
            type: 'line',
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
    }
  }

  const builtOption = buildChartOption(_chartOption, restSettings, 'line')
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
