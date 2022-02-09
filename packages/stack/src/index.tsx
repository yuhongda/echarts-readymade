import React, { useContext, useState, useCallback, useImperativeHandle, forwardRef } from 'react'
import type { ECharts } from 'echarts'
import Big from 'big.js'
import cloneDeep from 'lodash/cloneDeep'
import type { ChartProps, LegendPosition } from '@echarts-readymade/core'
import { mergeOption, buildChartOption, numberWithCommas } from '@echarts-readymade/core'
import ReactEcharts from 'echarts-for-react'

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

export const Stack = forwardRef<
  {
    getEchartsInstance: () => ECharts | undefined
  },
  StackChartProps
>((props, ref) => {
  const {
    context,
    dimension,
    compareDimension,
    valueList,
    echartsSeries,
    setOption,
    xAxisData,
    isPercentMode,
    isLineStack,
    ...restSettings
  } = props
  const { data, echartsOptions, echartsOptionsBase: chartOption, userOptions } = useContext(context)
  const { option, ...resetOptions } = echartsOptions || {}

  if (!data) {
    return null
  }

  if (valueList?.length === 0) {
    return null
  }

  const _dimension = dimension && dimension.slice(0, 1)
  const _valueItem = valueList && valueList[0]
  const _chartOption = cloneDeep(chartOption || {})

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

      _chartOption.xAxis.data = xAxisData || _dataXAxis
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

      _chartOption.series =
        echartsSeries ||
        _processData.map((item) => {
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
                        ? `${numberWithCommas(Big(data.value).round(2).toNumber())}%`
                        : '--%'
                    }

                    try {
                      return data.value != null && !isNaN(data.value)
                        ? numberWithCommas(Big(data.value).round(2).toNumber())
                        : '--'
                    } catch {
                      return data.value || '--'
                    }
                  }
                },
                decimalLength: _valueItem.decimalLength || 0,
                isPercent: _valueItem.isPercent
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

      _chartOption.xAxis.data = xAxisData || _dataXAxis
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

      _chartOption.series =
        echartsSeries ||
        valueList.map((item, i) => {
          return {
            name: item.fieldName,
            type: isLineStack ? 'line' : 'bar',
            stack: '总量',
            areaStyle: {},
            data: data?.map((d, j) => {
              return {
                value: Big(isPercentMode ? (d[item.fieldKey] / sumData[j]) * 100 : d[item.fieldKey])
                  .round(item.decimalLength || 0)
                  .toNumber(),
                label: {
                  show: false,
                  position: 'inside',
                  fontSize: 10,
                  formatter: function (params: any) {
                    if (isPercentMode) {
                      return params.value != null && !isNaN(params.value)
                        ? `${numberWithCommas(
                            Big(params.value)
                              .round(item.decimalLength || 0)
                              .toNumber()
                          )}%`
                        : '--%'
                    }

                    try {
                      return params.value != null && !isNaN(params.value)
                        ? numberWithCommas(
                            Big(params.value)
                              .round(item.decimalLength || 0)
                              .toNumber()
                          )
                        : '--'
                    } catch {
                      return params.value || '--'
                    }
                  }
                },
                decimalLength: item.decimalLength || 0,
                isPercent: item.isPercent
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
  let options = mergeOption(builtOption, userOptions)

  if (setOption) {
    options = setOption(cloneDeep(options))
  }

  /**
   * forward the ref for getEchartsInstance()
   */
  const [reactEchartsNode, setReactEchartsNode] = useState<ReactEcharts | null>(null)
  const reactEchartsRef = useCallback((node) => {
    if (node !== null) {
      setReactEchartsNode(node)
    }
  }, [])
  useImperativeHandle(
    ref,
    () => ({
      getEchartsInstance: () => {
        return reactEchartsNode?.getEchartsInstance()
      }
    }),
    [reactEchartsNode]
  )

  return (
    <>
      <ReactEcharts
        ref={reactEchartsRef}
        option={{ ...cloneDeep(options) }}
        notMerge={true}
        opts={{ renderer: 'svg' }}
        style={{ height: '100%', width: '100%' }}
        {...resetOptions}
      />
    </>
  )
})
