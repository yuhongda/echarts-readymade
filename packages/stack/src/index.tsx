import React, { useContext } from 'react'
import { multiply, round } from 'mathjs/number'
import { cloneDeep } from 'lodash'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import type { ChartProps, LegendPosition } from '@echarts-readymade/core'
import { mergeOption, buildChartOption, numberWithCommas } from '../../../packages/core/src'
import { ChartContext } from '../../../packages/core/src/ChartProvider'
import { BarChart, LineChart } from 'echarts/charts'
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

export interface StackChartProps extends ChartProps {
  /**
   * 自定义x轴
   */
  xAxisData?: any[]
  /**
   * 图例位置
   */
  legendPosition?: LegendPosition
  /**
   * 百分比模式
   */
  isPercentMode?: boolean
  /**
   * 是否是折线堆积图
   */
  isLineStack?: boolean
}

export const Stack: React.FC<StackChartProps> = (props) => {
  const {
    data,
    echartsOptions,
    echartsOptionsBase: chartOption,
    userOptions
  } = useContext(ChartContext)
  const { option, ...resetOptions } = echartsOptions || {}
  const {
    dimension,
    compareDimension,
    valueList,
    echartsSeries,
    xAxisData,
    isPercentMode,
    isLineStack,
    ...restSettings
  } = props

  if (valueList?.length === 0) {
    return null
  }

  const _dimension = dimension && dimension.slice(0, 1)
  const _valueItem = valueList && valueList[0]
  const _chartOption = Object.assign({}, chartOption || {}, {})

  if (!(_dimension && _valueItem && _dimension.length === 1)) {
    return null
  }

  if (_chartOption) {
    let _dataXAxis = [
      ...new Set(
        data?.map((d) => {
          return _dimension && d[_dimension[0].fieldKey]
        })
      )
    ]

    let _preProcessData: any[] = []
    let _processData = []
    let sumData: any[] = []
    let compareDimensionValues = []
    if (compareDimension && compareDimension.length > 0) {
      // 对比维度全量值
      compareDimensionValues = [...new Set(data?.map((d) => d[compareDimension[0].fieldKey]))]

      // 按维度分组
      data?.forEach((d) => {
        const _index = _preProcessData.findIndex(
          (item) => item.name == (_dimension && d[_dimension[0].fieldKey])
        )
        if (_index != -1) {
          const _indexCompareDimensionData = _preProcessData[_index].data.findIndex(
            (item: any) =>
              item[compareDimension[0] && compareDimension[0].fieldKey] ==
              d[compareDimension[0] && compareDimension[0].fieldKey]
          )
          if (_indexCompareDimensionData != -1) {
            _preProcessData[_index].data[_indexCompareDimensionData][_valueItem.fieldKey] +=
              d[_valueItem.fieldKey]
          } else {
            _preProcessData[_index].data.push(d)
          }
        } else {
          _preProcessData.push({
            name: d[_dimension[0] && _dimension[0].fieldKey],
            data: [d]
          })
        }
      })

      // 对比维度 汇总 排序

      try {
        _preProcessData = _preProcessData.sort((a, b) => {
          const sumA = a.data.reduce((s: any, c: any) => {
            s = s + (c[_valueItem.fieldKey] || 0)
            return s
          }, 0)
          const sumB = b.data.reduce((s: any, c: any) => {
            s = s + (c[_valueItem.fieldKey] || 0)
            return s
          }, 0)

          return sumB - sumA
        })
        _dataXAxis = _preProcessData.map((item) => {
          return item.name
        })
      } catch (e) {}

      // 在维度分组基础上，分组对比维度
      _processData = compareDimensionValues.map((item) => {
        return {
          name: `${item}`,
          data: _preProcessData.map((pd) => {
            const v = pd.data.find(
              (d: any) => d[compareDimension[0] && compareDimension[0].fieldKey] == item
            )
            if (v) {
              return v
            } else {
              const _v: { [key: string]: any } = {}
              if (_dimension && _dimension.length > 0) {
                _v[_dimension[0] && _dimension[0].fieldKey] = pd.name
              }
              return _v
            }
          })
        }
      })

      // 按维度分组求和
      sumData = _preProcessData.map((item, i) => {
        return {
          name: item.name,
          value: item.data.reduce((s: any, c: any) => s + c[_valueItem.fieldKey], 0)
        }
      })

      _chartOption.xAxis.data = _dataXAxis
      _chartOption.yAxis = [
        {
          show: true,
          type: 'value',
          name: '',
          scale: true,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#E7EAEF'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {}
          },
          axisLabel: {},
          axisTick: {
            lineStyle: {}
          },
          min: 0,
          max: isPercentMode ? 100 : null
        },
        {
          show: false,
          type: 'value',
          name: '',
          scale: true,
          splitLine: {
            show: false,
            lineStyle: {}
          },
          axisLine: {
            show: true,
            lineStyle: {}
          },
          axisLabel: {},
          axisTick: {
            lineStyle: {}
          },
          min: 0
        }
      ]

      _chartOption.series = _processData.map((item) => {
        let _dataClone = cloneDeep(item.data) || []

        let text = item.name

        return {
          name: text,
          type: isLineStack ? 'line' : 'bar',
          stack: '总量',
          areaStyle: {},
          data: _dataClone.map((d, i) => {
            return {
              value: isPercentMode
                ? (((d && d[_valueItem.fieldKey]) || 0) / sumData[i].value) * 100
                : (d && d[_valueItem.fieldKey]) || 0,
              label: {
                show: false,
                position: 'inside',
                fontSize: 10,
                formatter: function (data: any) {
                  if (isPercentMode) {
                    return data.value != null && !isNaN(data.value)
                      ? `${numberWithCommas(round(data.value, 2))}%`
                      : '--%'
                  }

                  try {
                    return data.value != null && !isNaN(data.value)
                      ? numberWithCommas(round(data.value, 2))
                      : '--'
                  } catch {
                    return data.value || '--'
                  }
                }
              }
            }
          })
        }
      })
    } else {
      // 无对比维度
      const dataMatrix = valueList.map((item, i) => {
        return data?.map((d: any) => d[item.fieldKey])
      })
      dataMatrix.forEach((list) => {
        list?.forEach((d, i) => {
          sumData[i] = (sumData[i] || 0) + d
        })
      })

      _chartOption.xAxis.data = _dataXAxis
      _chartOption.yAxis = [
        {
          show: true,
          type: 'value',
          name: '',
          scale: true,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#E7EAEF'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {}
          },
          axisLabel: {},
          axisTick: {
            lineStyle: {}
          },
          min: 0,
          max: isPercentMode ? 100 : null
        },
        {
          show: false,
          type: 'value',
          name: '',
          scale: true,
          splitLine: {
            show: false,
            lineStyle: {}
          },
          axisLine: {
            show: true,
            lineStyle: {}
          },
          axisLabel: {},
          axisTick: {
            lineStyle: {}
          },
          min: 0
        }
      ]

      _chartOption.series = valueList.map((item, i) => {
        return {
          name: item.fieldName,
          type: isLineStack ? 'line' : 'bar',
          stack: '总量',
          areaStyle: {},
          data: data?.map((d, j) => {
            return {
              value: isPercentMode ? (d[item.fieldKey] / sumData[j]) * 100 : d[item.fieldKey],
              label: {
                show: false,
                position: 'inside',
                fontSize: 10,
                formatter: function (params: any) {
                  if (isPercentMode) {
                    return params.value != null && !isNaN(params.value)
                      ? `${numberWithCommas(round(params.value, 2))}%`
                      : '--%'
                  }

                  try {
                    return params.value != null && !isNaN(params.value)
                      ? numberWithCommas(round(params.value, 2))
                      : '--'
                  } catch {
                    return params.value || '--'
                  }
                }
              }
            }
          })
        }
      })
    }
  }

  const builtOption = buildChartOption(
    _chartOption,
    restSettings,
    isLineStack ? 'line-stack' : 'stack'
  )
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
