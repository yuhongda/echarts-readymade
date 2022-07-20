import React, { useContext, useState, useCallback, useImperativeHandle, forwardRef } from 'react'
import type { ECharts } from 'echarts'
import Big from 'big.js'
import cloneDeep from 'clone'
import type { ChartProps, LegendPosition } from '@echarts-readymade/core'
import { mergeOption, buildChartOption, Field } from '@echarts-readymade/core'
import ReactEcharts from 'echarts-for-react'

export interface LineChartProps extends ChartProps {
  xAxisData?: any[]
  legendPosition?: LegendPosition
}

export const Line = forwardRef<
  {
    getEchartsInstance: () => ECharts | undefined
  },
  LineChartProps
>((props, ref) => {
  const {
    context,
    dimension,
    compareDimension,
    valueList,
    echartsSeries,
    xAxisData,
    setOption,
    ...restSettings
  } = props
  const { data, echartsOptions, echartsOptionsBase: chartOption, userOptions } = useContext(context)
  const { option, ...resetOptions } = echartsOptions || {}

  if (!data) {
    return null
  }

  const _dimension = dimension && dimension.slice(0, 1)
  const _chartOption = cloneDeep(chartOption || {})

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
                  .map((dim: Field) => {
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

        valueList?.forEach((v: Field) => {
          _seriesValueList.push({
            name:
              valueList.length > 1
                ? `${compareDimensionName}~${v.fieldName}`
                : compareDimensionName,
            type: v.type || 'line',
            barGap: 0,
            barMaxWidth: 60,
            lineStyle: {
              shadowColor: 'rgba(0,0,0,0.15)',
              shadowBlur: 3,
              shadowOffsetX: 0,
              shadowOffsetY: 1
            },
            data: _data.map((d) => {
              if (d[v.fieldKey] !== null && typeof d[v.fieldKey] !== 'undefined') {
                let result = Big(d[v.fieldKey])
                if (v.isPercent) {
                  result = result.times(100)
                }
                return {
                  value: result.round(v.decimalLength || 0).toNumber(),
                  isPercent: v.isPercent,
                  decimalLength: v.decimalLength
                }
              }

              return {
                value: null,
                isPercent: v.isPercent,
                decimalLength: v.decimalLength
              }
            }),
            yAxisIndex: v.yAxisIndex || 0
          })
        })
      }
      _chartOption.xAxis.data = xAxisData || _data
      _chartOption.series = echartsSeries || _seriesValueList
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
            type: v.type || 'line',
            lineStyle: {
              shadowColor: 'rgba(0,0,0,0.15)',
              shadowBlur: 3,
              shadowOffsetX: 0,
              shadowOffsetY: 1
            },
            data:
              data &&
              data.map((d) => {
                if (d[v.fieldKey] !== null && typeof d[v.fieldKey] !== 'undefined') {
                  let result = Big(d[v.fieldKey])
                  if (v.isPercent) {
                    result = result.times(100)
                  }
                  return {
                    value: result.round(v.decimalLength || 0).toNumber(),
                    isPercent: v.isPercent,
                    decimalLength: v.decimalLength
                  }
                }
                return {
                  value: null,
                  isPercent: v.isPercent,
                  decimalLength: v.decimalLength
                }
              }),
            yAxisIndex: v.yAxisIndex || 0
          }
        })
    }
  }

  const builtOption = buildChartOption(_chartOption, restSettings, 'line')
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
    <ReactEcharts
      ref={reactEchartsRef}
      option={{ ...cloneDeep(options) }}
      notMerge={true}
      opts={{ renderer: 'svg' }}
      style={{ height: '100%', width: '100%' }}
      {...resetOptions}
    />
  )
})
