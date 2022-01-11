import React, { useContext } from 'react'
import { multiply, round, divide, fix } from 'mathjs/number'
import { cloneDeep } from 'lodash'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import type { ChartProps, LegendPosition } from '@echarts-readymade/core'
import { mergeOption, buildChartOption } from '../../../packages/core/src'
import { ChartContext } from '../../../packages/core/src/ChartProvider'
import { PieChart } from 'echarts/charts'
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
  PieChart,
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

export interface PieChartProps extends ChartProps {
  showInRing?: boolean
  legendPosition?: LegendPosition
}

export const Pie: React.FC<PieChartProps> = (props) => {
  const {
    data,
    echartsOptions,
    echartsOptionsBase: chartOption,
    userOptions
  } = useContext(ChartContext)
  const { option, ...resetOptions } = echartsOptions || {}
  const { dimension, valueList, echartsSeries, showInRing, ...restSettings } = props

  const getCenter = () => {
    let _centerLeft = '50%'
    let _centerTop = '50%'
    if (props.legendPosition === 'left') {
      _centerLeft = '55%'
    } else if (props.legendPosition === 'right') {
      _centerLeft = '45%'
    } else if (props.legendPosition === 'top') {
      _centerTop = '55%'
    } else if (props.legendPosition === 'bottom') {
      _centerTop = '45%'
    }

    return {
      top: _centerTop,
      left: _centerLeft
    }
  }

  const _chartOption = Object.assign({}, chartOption || {}, {})

  _chartOption.xAxis = { show: false }
  _chartOption.yAxis = { show: false }
  let _series: any[] = []

  if (_chartOption) {
    if (dimension && dimension.length > 0) {
      // 有维度
      _series =
        (valueList &&
          valueList.slice(0, 1).map((item, i) => {
            const _sum = data?.reduce((s, c) => {
              s = s + (c[item.fieldKey] || 0)
              return s
            }, 0)

            return {
              name: dimension?.[0].fieldName,
              type: 'pie',
              minAngle: 5,
              radius: showInRing ? ['30%', '50%'] : '50%',
              center: [getCenter().left, getCenter().top],
              data: data?.map((d) => {
                let text = d[dimension?.[0].fieldKey]

                return {
                  name: text,
                  value: d[item.fieldKey]
                    ? d[item.fieldKey] != null && !isNaN(d[item.fieldKey])
                      ? d[item.fieldKey].toFixed(Math.abs(d[item.fieldKey]) > 1 ? 2 : 4)
                      : d[item.fieldKey]
                    : 0
                }
              }),
              label: {
                show: true,
                position: 'outside',
                formatter: (params: any) => {
                  const _percent = round(
                    multiply(divide(round(Number(params.value), 4), _sum), 100),
                    2
                  )

                  let res = ''
                  try {
                    res += `${_percent}%`
                  } catch {
                    res += '--%'
                  }
                  return res
                },
                fontSize: 12
              }
            }
          })) ||
        []
    } else {
      // 无维度
      const d = (data && cloneDeep(data)[0]) || {}
      const _valueListClone = cloneDeep(valueList)

      const _sum = _valueListClone?.reduce((s, c) => {
        s = s + (d[c.fieldKey] || 0)
        return s
      }, 0)

      _series = [
        {
          name: '',
          type: 'pie',
          minAngle: 5,
          radius: showInRing ? ['30%', '50%'] : '50%',
          center: [getCenter().left, getCenter().top],
          data: _valueListClone?.map((item) => {
            return {
              name: item.fieldName,
              value: d[item.fieldKey]
                ? d[item.fieldKey] != null && !isNaN(d[item.fieldKey])
                  ? parseFloat(d[item.fieldKey]).toFixed(Math.abs(d[item.fieldKey]) > 1 ? 2 : 4)
                  : d[item.fieldKey]
                : 0,
              emphasis: {
                label: {
                  show: true
                }
              },
              label: {
                show: true,
                position: 'outside',
                formatter: (params: any) => {
                  try {
                    const _percent = round(
                      multiply(divide(round(Number(params.value), 4), _sum), 100),
                      2
                    )

                    let res = ''
                    try {
                      res += `${_percent}%`
                    } catch {
                      res += '--%'
                    }
                    return res
                  } catch (e) {
                    return '--'
                  }
                },
                fontSize: 12
              }
            }
          })
        }
      ]
    }
  }

  _chartOption.series = echartsSeries || _series
  const builtOption = buildChartOption(_chartOption, restSettings, 'pie')
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
